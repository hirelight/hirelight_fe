"use client";

import React, { FormEvent, createContext, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

import {
    Button,
    CustomInput,
    DatePicker,
    LocationAutocomplete,
} from "@/components";
import jobServices from "@/services/job/job.service";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { ICreateJobDto, JobContentJson } from "@/services";
import { handleError } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./AddJobDetailForm.module.scss";
import NewJobHeader from "./NewJobHeader";
import DescriptionSection from "./DescriptionSection";
import AnnualSalarySection from "./AnnualSalarySection";
import EmployementDetailsSection from "./EmployementDetailsSection";

type IFormErr = {
    titleErr: string;
    areaArr: string;
    contentErr: {
        descriptionErr: string;
        requirementsErr: string;
        benefitsErr: string;
        contentErr: string;
    };
    salaryErr: string;
    jobPublishTimeErr: string;
};

type FormState = Omit<ICreateJobDto, "content"> & {
    content: JobContentJson;
};

type AddJobDetailFormState = {
    formState: FormState;
    setFormState: React.Dispatch<React.SetStateAction<FormState>>;
    formErr: IFormErr;
    setFormErr: React.Dispatch<React.SetStateAction<IFormErr>>;
    contentLength: {
        description: number;
        requirements: number;
        benefits: number;
    };
    setContentLength: React.Dispatch<
        React.SetStateAction<{
            description: number;
            requirements: number;
            benefits: number;
        }>
    >;
};

const AddJobDetailFormContext = createContext<AddJobDetailFormState | null>(
    null
);

export const useAddJobDetailForm = (): AddJobDetailFormState => {
    const context = React.useContext(AddJobDetailFormContext);

    if (!context)
        throw new Error("Please use AddJObProvider in your parent component!");

    return context;
};

type AddJobDetailFormProps = {};

const AddJobDetailForm: React.FC<AddJobDetailFormProps> = ({}) => {
    const router = useRouter();
    const { lang } = useParams();
    const queryClient = useQueryClient();

    const { t } = useI18NextTranslation(lang as I18Locale, ["new-job"]);

    const [loading, setLoading] = React.useState(false);

    const [contentLength, setContentLength] = useState({
        description: 0,
        requirements: 0,
        benefits: 0,
    });
    const [formState, setFormState] = useState<FormState>({
        title: "",
        content: {
            description: "",
            requirements: "",
            benefits: "",
        },
        applicationForm: "",
        minSalary: 0,
        maxSalary: 0,
        currency: "",
        startTime: moment.utc().toDate(),
        endTime: moment.utc().add(7, "days").toDate(),
        area: "",
        experience: "",
        workModality: "",
    });

    const [formErr, setFormErr] = useState<IFormErr>({
        titleErr: "",
        areaArr: "",
        contentErr: {
            descriptionErr: "",
            requirementsErr: "",
            benefitsErr: "",
            contentErr: "",
        },
        salaryErr: "",
        jobPublishTimeErr: "",
    });

    const isInvalidFormInput = (): boolean => {
        let statusErr = false;
        const { title, area, maxSalary, minSalary, startTime, endTime } =
            formState;

        let errors = formErr;

        if (title.length === 0) {
            errors.titleErr = t("error.job_required");
        }

        if (area.length === 0) {
            errors.areaArr = t("error.area_required");
        }

        if (contentLength.description === 0) {
            errors.contentErr.descriptionErr = t("error.description_required");
        }

        if (contentLength.requirements === 0) {
            errors.contentErr.requirementsErr = t(
                "error.requirements_required"
            );
        }

        if (
            Object.values(contentLength).reduce((prev, cur) => prev + cur) < 700
        ) {
            errors.contentErr.contentErr = t("error.description_must_700");
        }

        if (minSalary > 0 && maxSalary > 0 && minSalary >= maxSalary) {
            errors.salaryErr = t("error.min_lower_max");
        }

        if (moment(startTime).isAfter(endTime)) {
            errors.jobPublishTimeErr = t("error.start_earlier_end");
        }

        if (moment().isAfter(endTime)) {
            errors.jobPublishTimeErr = t("error.end_must_be_future");
        }

        const checkError = (errs: any) => {
            for (let key of Object.keys(errs)) {
                if (typeof errs[key as any] === "object") {
                    checkError(errs[key as any]);
                } else {
                    if (errs[key as any] !== "") {
                        statusErr = true;
                        break;
                    }
                }
            }
        };
        checkError(errors);

        if (statusErr) {
            setFormErr({ ...errors });
            toast.error(
                <div>
                    <p>{t("common:error.invalid_input")}</p>
                    <p>{t("common:error.check_red_places")}</p>
                </div>,
                {
                    position: "top-center",
                    autoClose: 1500,
                }
            );
        }

        return statusErr;
    };

    const handleSubmitJobDetail = async (e: FormEvent) => {
        e.preventDefault();

        if (isInvalidFormInput()) return;

        setLoading(true);
        try {
            const appFormTemplateRes =
                await appFormTemplateServices.getDefaultAppFormTemplate();

            let parsedAppForm = JSON.parse(
                appFormTemplateRes.data.content
            ).app_form;

            const res = await jobServices.createAsync({
                ...formState,
                content: JSON.stringify(formState.content),
                startTime: moment.parseZone(formState.startTime).utc().format(),
                endTime: moment.parseZone(formState.endTime).utc().format(),
                applicationForm: JSON.stringify({
                    form_structure: parsedAppForm,
                    questions: [],
                }),
            });
            toast.success(res.message, {
                position: "bottom-right",
                autoClose: 1000,
            });
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            router.push(`${res.data}/edit`);
        } catch (error: any) {
            handleError(error);
            setLoading(false);
        }
    };

    return (
        <AddJobDetailFormContext.Provider
            value={{
                formErr,
                setFormErr,
                formState,
                setFormState,
                contentLength,
                setContentLength,
            }}
        >
            <NewJobHeader />
            <form onSubmit={handleSubmitJobDetail} className="flex-1 flex">
                <div className="flex-1 max-w-screen-xl mx-auto pb-20">
                    <div className={styles.form__container}>
                        {/* ***********************Job Title Section*********************************** */}
                        <section className="relative">
                            <h2 className={`${styles.form__section__title}`}>
                                {t("job_title")}
                            </h2>
                            <div className={`${styles.form__section__wrapper}`}>
                                <div className="mb-4 md:mb-6">
                                    <CustomInput
                                        title={t("job_title")}
                                        id="job-title"
                                        name="job-title"
                                        type="text"
                                        placeholder={t("placeholder.job_title")}
                                        autoComplete="organization-title"
                                        // value={formState.title}
                                        onChange={e => {
                                            setFormState({
                                                ...formState,
                                                title: e.target.value,
                                            });
                                            setFormErr({
                                                ...formErr,
                                                titleErr: "",
                                            });
                                        }}
                                        required={true}
                                        errorText={formErr.titleErr}
                                    />
                                </div>
                            </div>
                            <div className={styles.instruction_wrapper}>
                                <div className={styles.instruction__text}>
                                    <span className="text-sm text-neutral-500">
                                        {t("intruction.title")}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* ***********************Location Section*********************************** */}
                        <section className="relative">
                            <h2 className={`${styles.form__section__title}`}>
                                {t("location")}
                            </h2>
                            <div className={`${styles.form__section__wrapper}`}>
                                <div className="mb-4 md:mb-6">
                                    <LocationAutocomplete
                                        title={t("job_area")}
                                        id="job-area"
                                        name="job-area"
                                        type="text"
                                        placeholder={t("placeholder.job_area")}
                                        autoComplete="street-address"
                                        value={formState.area}
                                        handlePlaceChange={(value: string) => {
                                            setFormState({
                                                ...formState,
                                                area: value,
                                            });
                                            setFormErr({
                                                ...formErr,
                                                areaArr: "",
                                            });
                                        }}
                                        required={true}
                                        errorText={formErr.areaArr}
                                    />
                                </div>
                            </div>
                            <div className={styles.instruction_wrapper}>
                                <div className={styles.instruction__text}>
                                    <span className="text-sm text-neutral-500">
                                        {t("intruction.area")}
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* ***********************Description Section*********************************** */}
                        <DescriptionSection />

                        {/* ***********************Employment Details*********************************** */}
                        <EmployementDetailsSection />

                        {/* ***********************Annual salary*********************************** */}
                        <AnnualSalarySection />

                        {/* ***********************Job Post Publishcation duration*********************************** */}
                        <section className="relative">
                            <h2 className={`${styles.form__section__title}`}>
                                {t("job_available_time")}
                            </h2>
                            <div className={`${styles.form__section__wrapper}`}>
                                <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8">
                                    <div>
                                        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            {t("common:start_time")}
                                        </h3>
                                        <DatePicker
                                            value={formState.startTime}
                                            pos={"top"}
                                            minDate={new Date()}
                                            onChange={date => {
                                                setFormState({
                                                    ...formState,
                                                    startTime: date,
                                                    endTime:
                                                        moment(
                                                            formState.endTime
                                                        ).diff(date, "days") < 7
                                                            ? moment(date)
                                                                  .add(
                                                                      7,
                                                                      "days"
                                                                  )
                                                                  .toDate()
                                                            : formState.endTime,
                                                });
                                                setFormErr({
                                                    ...formErr,
                                                    jobPublishTimeErr: "",
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            {t("common:end_time")}
                                        </h3>
                                        <DatePicker
                                            value={formState.endTime}
                                            pos={"top"}
                                            maxDate={moment()
                                                .add(1, "year")
                                                .toDate()}
                                            minDate={moment(formState.startTime)
                                                .add(7, "days")
                                                .toDate()}
                                            onChange={date => {
                                                setFormState({
                                                    ...formState,
                                                    endTime: date,
                                                });
                                                setFormErr({
                                                    ...formErr,
                                                    jobPublishTimeErr: "",
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                {formErr.jobPublishTimeErr && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            {formErr.jobPublishTimeErr}{" "}
                                        </span>
                                    </p>
                                )}
                            </div>
                        </section>

                        <div className="w-full h-8"></div>

                        {/* ****************Bottom Button********************* */}
                        <div className="p-5 border-t border-t-slate-300">
                            <Button
                                type="submit"
                                className="flex items-center"
                                disabled={loading}
                                isLoading={loading}
                            >
                                {t("common:save_and_continue")}
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </AddJobDetailFormContext.Provider>
    );
};

export default AddJobDetailForm;
