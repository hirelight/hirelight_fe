"use client";

import React from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob, setJobError } from "@/redux/slices/job.slice";
import {
    Button,
    CustomInput,
    DatePicker,
    LocationAutocomplete,
} from "@/components";
import { SpinLoading } from "@/icons";
import { updateJob } from "@/redux/thunks/job.thunk";

import styles from "./EditJobDetailForm.module.scss";
import DescriptionSection from "./DescriptionSection";
import AnnualSalarySection from "./AnnualSalarySection";
import EmploymentDetailsSection from "./EmploymentDetailsSection";

type EditJobDetailFormProps = {};

const EditJobDetailForm: React.FC<EditJobDetailFormProps> = () => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    const dispatch = useAppDispatch();
    const {
        data: job,
        contentLength,
        error: jobErr,
    } = useAppSelector(state => state.job);

    const isInvalidFormInput = (): boolean => {
        let statusErr = false;
        const { title, area, maxSalary, minSalary, startTime, endTime } = job;

        let errors = jobErr;

        if (title.length === 0) errors.titleErr = "Job title required";

        if (area.length === 0) errors.areaArr = "Area required";

        if (contentLength.description === 0)
            errors.contentErr.descriptionErr = "Description required";

        if (contentLength.requirements === 0)
            errors.contentErr.requirementsErr = "Requirements required";

        if (
            Object.values(contentLength).reduce((prev, cur) => prev + cur) < 700
        )
            errors.contentErr.contentErr =
                "Description content must minimum 700 characters";

        if (minSalary > 0 && maxSalary > 0 && minSalary >= maxSalary)
            errors.salaryErr = "Min salary must be lower than max salary";

        if (new Date(startTime).getTime() > new Date(endTime).getTime())
            errors.jobPublishTimeErr =
                "Start time must be earlier than end time";

        if (new Date(endTime).getTime() <= new Date().getTime())
            errors.jobPublishTimeErr = "End time must be in the future";

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
        }

        return statusErr;
    };

    const handleSubmitJobDetail = async (e: any) => {
        e.preventDefault();

        if (isInvalidFormInput()) {
            return;
        }

        setLoading(true);
        try {
            console.log(job.applicationForm);
            dispatch(
                updateJob({
                    ...job,
                    id: job.id,
                    content: JSON.stringify(job.content),
                    applicationForm: JSON.stringify(job.applicationForm),
                })
            );

            router.push("app-form");
        } catch (error) {
            console.error(error);
            toast.error("Edit job failure");
        }
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
                        <div className="hidden md:block absolute -right-8 top-1/2 translate-x-full -translate-y-1/2 w-screen">
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
                        <div className="hidden md:block absolute -right-8 top-1/2 translate-x-full -translate-y-1/2 w-screen">
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
                                        value={new Date(job.startTime)}
                                        pos={"top"}
                                        onChange={date => {
                                            dispatch(
                                                setJob({
                                                    ...job,
                                                    startTime: date,
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
                                        value={new Date(job.endTime)}
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
                    <div className="p-5 border-t border-t-slate-300">
                        <Button type="submit" className="flex items-center">
                            {loading && <SpinLoading className="mr-2" />}
                            Save & continue
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditJobDetailForm;
