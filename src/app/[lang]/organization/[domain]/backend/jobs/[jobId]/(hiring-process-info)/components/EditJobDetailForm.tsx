"use client";

import React, { FormEvent } from "react";
import { toast } from "react-toastify";
import moment from "moment";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob, setJobError } from "@/redux/slices/job.slice";
import {
    Button,
    CustomInput,
    DatePicker,
    LocationAutocomplete,
} from "@/components";
import { updateJob } from "@/redux/thunks/job.thunk";
import { extractTextFromHtml, isInvalidForm } from "@/helpers";
import { JobPostStatus } from "@/interfaces/job-post.interface";

import styles from "./EditJobDetailForm.module.scss";
import DescriptionSection from "./DescriptionSection";
import AnnualSalarySection from "./AnnualSalarySection";
import EmploymentDetailsSection from "./EmploymentDetailsSection";

type EditJobDetailFormProps = {};

const EditJobDetailForm: React.FC<EditJobDetailFormProps> = () => {
    const [loading, setLoading] = React.useState(false);

    const dispatch = useAppDispatch();
    const {
        data: job,
        error: jobErr,
        contentLength,
    } = useAppSelector(state => state.job);

    const isInvalidInput = (): boolean => {
        const { title, area, maxSalary, minSalary, startTime, endTime } = job;

        let errors = Object.assign({}, jobErr);

        if (title.length === 0) errors.titleErr = "Job title required";

        if (area.length === 0) errors.areaArr = "Area required";

        if (minSalary > 0 && maxSalary > 0 && minSalary >= maxSalary)
            errors.salaryErr = "Min salary must be lower than max salary";

        if (!contentLength.description) {
            errors.contentErr = {
                ...errors.contentErr,
                descriptionErr: "Description field required",
            };
        }

        if (!contentLength.requirements) {
            errors.contentErr = {
                ...errors.contentErr,
                requirementsErr: "Requirment field required",
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
                contentErr: "Description required",
            };
        }

        if (moment(startTime).isAfter(endTime))
            errors.jobPublishTimeErr =
                "Start time must be earlier than end time";

        if (moment(endTime).isBefore(moment()))
            errors.jobPublishTimeErr = "End time must be in the future";

        if (isInvalidForm(errors)) {
            dispatch(setJobError({ ...errors }));
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

            return true;
        }

        return false;
    };

    const handleSubmitJobDetail = async (e: FormEvent) => {
        e.preventDefault();

        if (job.status === JobPostStatus.ACTIVE)
            return toast.error(
                "Job post is publishing! Please unpublish before perform any changes!"
            );

        if (isInvalidInput()) {
            return;
        }

        setLoading(true);
        try {
            await dispatch(
                updateJob({
                    ...job,
                    id: job.id,
                    content: JSON.stringify(job.content),
                    startTime: moment.parseZone(job.startTime).utc().format(),
                    endTime: moment.parseZone(job.endTime).utc().format(),
                    applicationForm: JSON.stringify(job.applicationForm),
                })
            );
        } catch (error: any) {
            console.error(error);
            toast.error(error.message ? error.message : "Edit job failure");
        }
        setLoading(false);
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
                                    Sử dụng chức danh công việc phổ biến cho khả
                                    năng tìm kiếm Chỉ quảng cáo cho một công
                                    việc, ví dụ: &apos;Y tá&apos;, không phải
                                    &apos;y tá&apos; Không có cơ hội hoặc sự
                                    kiện chung
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
                                    Sử dụng vị trí để thu hút các ứng viên phù
                                    hợp nhất Nếu bạn chọn hộp &quot;hoàn toàn từ
                                    xa&quot;, hãy thêm ít nhất một quốc gia. Một
                                    số bảng công việc yêu cầu một vị trí
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
                            Job post available time range
                        </h2>
                        <div className={`${styles.form__section__wrapper}`}>
                            <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-8">
                                <div>
                                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Start time
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
                                        End time
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
                            Save changes
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditJobDetailForm;
