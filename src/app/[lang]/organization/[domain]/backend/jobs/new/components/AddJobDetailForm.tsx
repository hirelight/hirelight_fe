"use client";

import React, { createContext, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

import {
    Button,
    CustomInput,
    DatePicker,
    LocationAutocomplete,
} from "@/components";
import { SpinLoading } from "@/icons";
import jobServices from "@/services/job/job.service";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { ICreateJobDto, JobContentJson } from "@/services";
import { debounce } from "@/helpers";

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
        throw new Error("Please use ThemeProvider in your parent component!");

    return context;
};

type AddJobDetailFormProps = {};

const AddJobDetailForm: React.FC<AddJobDetailFormProps> = ({}) => {
    const router = useRouter();
    const queryClient = useQueryClient();

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
        startTime: new Date(),
        endTime: new Date(),
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
            errors.titleErr = "Job title required";
        }

        if (area.length === 0) {
            errors.areaArr = "Area required";
        }

        if (contentLength.description === 0) {
            errors.contentErr.descriptionErr = "Description required";
        }

        if (contentLength.requirements === 0) {
            errors.contentErr.requirementsErr = "Requirements required";
        }

        if (
            Object.values(contentLength).reduce((prev, cur) => prev + cur) < 700
        ) {
            errors.contentErr.contentErr =
                "Description content must minimum 700 characters";
        }

        if (minSalary > 0 && maxSalary > 0 && minSalary >= maxSalary) {
            errors.salaryErr = "Min salary must be lower than max salary";
        }

        if (moment(startTime).isAfter(endTime)) {
            errors.jobPublishTimeErr =
                "Start time must be earlier than end time";
        }

        if (moment().isAfter(endTime)) {
            errors.jobPublishTimeErr = "End time must be in the future";
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
                    <p>Invalid input</p>
                    <p>Check issue in red!</p>
                </div>,
                {
                    position: "top-center",
                    autoClose: 1500,
                }
            );
        }

        return statusErr;
    };

    const handleSubmitJobDetail = async () => {
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
            console.error(error);
            toast.error(error.message ? error.message : "Create job failure");
        }

        setLoading(false);
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
            <div className="flex-1 flex">
                <div className="flex-1 max-w-screen-xl mx-auto pb-20">
                    <div className={styles.form__container}>
                        {/* ***********************Job Title Section*********************************** */}
                        <section className="relative">
                            <h2 className={`${styles.form__section__title}`}>
                                Job title
                            </h2>
                            <div className={`${styles.form__section__wrapper}`}>
                                <div className="mb-4 md:mb-6">
                                    <CustomInput
                                        title="Job title"
                                        id="job-title"
                                        name="job-title"
                                        type="text"
                                        placeholder="Example: Fullstack Developer"
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
                            <div className="hidden md:block absolute -right-8 top-1/2 translate-x-full -translate-y-1/2 w-screen">
                                <div className={styles.instruction__text}>
                                    <span className="text-sm text-neutral-500">
                                        Sử dụng chức danh công việc phổ biến cho
                                        khả năng tìm kiếm Chỉ quảng cáo cho một
                                        công việc, ví dụ: &apos;Y tá&apos;,
                                        không phải &apos;y tá&apos; Không có cơ
                                        hội hoặc sự kiện chung
                                    </span>
                                </div>
                            </div>
                        </section>

                        {/* ***********************Location Section*********************************** */}
                        <section className="relative">
                            <h2 className={`${styles.form__section__title}`}>
                                Location
                            </h2>
                            <div className={`${styles.form__section__wrapper}`}>
                                <div className="mb-4 md:mb-6">
                                    <LocationAutocomplete
                                        title="Job area"
                                        id="job-area"
                                        name="job-area"
                                        type="text"
                                        placeholder="Example: District 7, Ho Chi Minh"
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
                            <div className="hidden md:block absolute -right-8 top-1/2 translate-x-full -translate-y-1/2 w-screen">
                                <div className={styles.instruction__text}>
                                    <span className="text-sm text-neutral-500">
                                        Sử dụng vị trí để thu hút các ứng viên
                                        phù hợp nhất Nếu bạn chọn hộp &quot;hoàn
                                        toàn từ xa&quot;, hãy thêm ít nhất một
                                        quốc gia. Một số bảng công việc yêu cầu
                                        một vị trí
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
                                Job post available time range
                            </h2>
                            <div className={`${styles.form__section__wrapper}`}>
                                <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8">
                                    <div>
                                        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Start time
                                        </h3>
                                        <DatePicker
                                            value={formState.startTime}
                                            pos={"top"}
                                            maxDate={
                                                new Date(formState.endTime)
                                            }
                                            minDate={new Date()}
                                            onChange={date => {
                                                setFormState({
                                                    ...formState,
                                                    startTime: date,
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
                                            End time
                                        </h3>
                                        <DatePicker
                                            value={formState.endTime}
                                            pos={"top"}
                                            maxDate={moment()
                                                .add(1, "year")
                                                .toDate()}
                                            minDate={
                                                moment(
                                                    formState.startTime
                                                ).toDate() ?? new Date()
                                            }
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
                                type="button"
                                onClick={handleSubmitJobDetail}
                                className="flex items-center"
                                disabled={loading}
                            >
                                {loading && <SpinLoading className="mr-2" />}
                                Save & continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AddJobDetailFormContext.Provider>
    );
};

export default AddJobDetailForm;
