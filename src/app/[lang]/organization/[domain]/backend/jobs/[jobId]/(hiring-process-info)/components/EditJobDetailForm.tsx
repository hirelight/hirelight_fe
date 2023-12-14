"use client";

import React, { FormEvent } from "react";
import { toast } from "react-toastify";
import moment from "moment";
import { useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob, setJobError } from "@/redux/slices/job.slice";
import {
    Button,
    CustomInput,
    DatePicker,
    LocationAutocomplete,
} from "@/components";
import { updateJob } from "@/redux/thunks/job.thunk";
import { isInvalidForm } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./EditJobDetailForm.module.scss";
import DescriptionSection from "./DescriptionSection";
import AnnualSalarySection from "./AnnualSalarySection";
import EmploymentDetailsSection from "./EmploymentDetailsSection";

type EditJobDetailFormProps = {};

const EditJobDetailForm: React.FC<EditJobDetailFormProps> = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "edit-job");

    const dispatch = useAppDispatch();
    const {
        data: job,
        error: jobErr,
        loading,
        contentLength,
    } = useAppSelector(state => state.job);

    const isInvalidInput = (): boolean => {
        const { title, area, maxSalary, minSalary, startTime, endTime } = job;

        let errors = Object.assign({}, jobErr);

        if (title.length === 0) errors.titleErr = t("error.job_required");

        if (area.length === 0) errors.areaArr = t("error.area_required");

        if (minSalary > 0 && maxSalary > 0 && minSalary >= maxSalary)
            errors.salaryErr = t("error.min_lower_max");

        if (!contentLength.description) {
            errors.contentErr = {
                ...errors.contentErr,
                descriptionErr: t("error.description_required"),
            };
        }

        if (!contentLength.requirements) {
            errors.contentErr = {
                ...errors.contentErr,
                requirementsErr: t("error.requirements_required"),
            };
        }

        if (
            contentLength.description +
                contentLength.requirements +
                contentLength.benefits <
            700
        ) {
            errors.contentErr = {
                ...errors.contentErr,
                contentErr: t("error.description_must_700"),
            };
        }

        if (moment(startTime).isAfter(endTime))
            errors.jobPublishTimeErr = t("error.start_earlier_end");

        if (moment(endTime).isBefore(moment()))
            errors.jobPublishTimeErr = t("error.end_must_be_future");

        if (isInvalidForm(errors)) {
            dispatch(setJobError({ ...errors }));
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

            return true;
        }

        return false;
    };

    const handleSubmitJobDetail = async (e: FormEvent) => {
        e.preventDefault();

        // if (job.status === JobPostStatus.ACTIVE)
        //     return toast.error(
        //         "Job post is publishing! Please unpublish before perform any changes!"
        //     );

        if (isInvalidInput()) {
            return;
        }

        dispatch(
            updateJob({
                ...job,
                id: job.id,
                content: JSON.stringify(job.content),
                startTime: moment.parseZone(job.startTime).utc().format(),
                endTime: moment.parseZone(job.endTime).utc().format(),
                applicationForm: JSON.stringify(job.applicationForm),
            })
        );
    };

    return (
        <>
            <form
                className="flex"
                onSubmit={handleSubmitJobDetail}
                onKeyDown={e => {
                    if (e.key === "Enter") e.preventDefault();
                }}
            >
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
                                    value={job.title}
                                    onChange={e => {
                                        dispatch(
                                            setJob({
                                                ...job,
                                                title: e.target.value,
                                            })
                                        );
                                        dispatch(
                                            setJobError({
                                                ...jobErr,
                                                titleErr: "",
                                            })
                                        );
                                    }}
                                    required={true}
                                    errorText={jobErr.titleErr}
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
                                    value={job.area}
                                    handlePlaceChange={(value: string) => {
                                        dispatch(
                                            setJob({
                                                ...job,
                                                area: value,
                                            })
                                        );
                                        setJobError({
                                            ...jobErr,
                                            areaArr: "",
                                        });
                                    }}
                                    required={true}
                                    errorText={jobErr.areaArr}
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
                    <EmploymentDetailsSection />

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
                                        value={job.startTime}
                                        pos={"top"}
                                        minDate={new Date()}
                                        onChange={date => {
                                            dispatch(
                                                setJob({
                                                    ...job,
                                                    startTime: date,
                                                    endTime:
                                                        moment(
                                                            job.endTime
                                                        ).diff(date, "days") < 7
                                                            ? moment(date)
                                                                  .add(
                                                                      7,
                                                                      "days"
                                                                  )
                                                                  .toDate()
                                                            : job.endTime,
                                                })
                                            );
                                            dispatch(
                                                setJobError({
                                                    ...jobErr,
                                                    jobPublishTimeErr: "",
                                                })
                                            );
                                        }}
                                    />
                                </div>
                                <div>
                                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        {t("common:end_time")}
                                    </h3>
                                    <DatePicker
                                        pos={"top"}
                                        value={job.endTime}
                                        minDate={moment(job.startTime)
                                            .add(7, "days")
                                            .toDate()}
                                        maxDate={moment(job.endTime)
                                            .add(1, "year")
                                            .toDate()}
                                        onChange={date => {
                                            dispatch(
                                                setJob({
                                                    ...job,
                                                    endTime: date,
                                                })
                                            );
                                            dispatch(
                                                setJobError({
                                                    ...jobErr,
                                                    jobPublishTimeErr: "",
                                                })
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                            {jobErr.jobPublishTimeErr && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">
                                        {jobErr.jobPublishTimeErr}{" "}
                                    </span>
                                </p>
                            )}
                        </div>
                    </section>

                    <div className="w-full h-8"></div>

                    {/* ****************Bottom Button********************* */}
                    <div className="flex gap-4 p-5 border-t border-t-slate-300">
                        <Button
                            className="flex items-center"
                            disabled={loading}
                            isLoading={loading}
                            type="submit"
                        >
                            {t("common:save_changes")}
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditJobDetailForm;
