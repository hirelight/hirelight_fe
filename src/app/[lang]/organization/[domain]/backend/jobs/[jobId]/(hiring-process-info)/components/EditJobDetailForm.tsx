"use client";

import React, { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

import {
    currencyList,
    experienceLevels,
    workModalities,
} from "@/utils/shared/initialDatas";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob, setJobError } from "@/redux/slices/job.slice";
import { delayFunc } from "@/helpers/shareHelpers";
import { DatePicker, LocationAutocomplete, Selection } from "@/components";
import { SpinLoading } from "@/icons";
import {
    ICreateJobDto,
    IJobDto,
    JobContentJson,
} from "@/services/job/job.interface";
import jobServices from "@/services/job/job.service";
import { IAppFormSection } from "@/interfaces";

import FormInput from "../../../components/FormInput";

import styles from "./EditJobDetailForm.module.scss";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const industries = [
    "Accounting",
    "Airlines/Aviation",
    "Alternative Dispute Resolution",
    "Business Analyst",
    "Financial Analyst",
    "Data Analyst",
    "Art/Creative",
    "Business Development",
    "Consulting",
    "Customer Service",
    "Distribution",
    "Design",
];

type EditJobDetailFormProps = {
    data: Omit<IJobDto, "content" | "applicationForm"> & {
        content: JobContentJson;
        applicationForm: IAppFormSection[];
    };
};

const EditJobDetailForm: React.FC<EditJobDetailFormProps> = ({ data }) => {
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = React.useState(false);

    const [descriptionLength, setDescriptionLength] = React.useState({
        description: 0,
        requirements: 0,
        benefits: 0,
    });

    const dispatch = useAppDispatch();
    const job = useAppSelector(state => state.job.data);
    const jobErr = useAppSelector(state => state.job.error);

    const validateFormInput = (): boolean => {
        if (job.maxSalary && job.minSalary && job.minSalary > job.maxSalary) {
            dispatch(
                setJobError({
                    status: true,
                    content: {
                        ...jobErr.content,
                        maxSalaryErr:
                            "Make sure that 'To' has larger amount than 'From'",
                    },
                })
            );
            return false;
        }

        return true;
    };

    const handleSubmitJobDetail = async (e: any) => {
        e.preventDefault();

        if (!validateFormInput()) {
            return;
        }

        try {
            const res = await jobServices.editAsync({
                ...job,
                id: data.id,
                content: JSON.stringify(job.content),
                applicationForm: JSON.stringify(job.applicationForm),
            });
            toast.success(res.message);
        } catch (error) {
            console.error(error);
            toast.error("Create job failure");
        }
    };

    useEffect(() => {
        dispatch(setJob(data));
    }, [data, dispatch]);

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
                                <FormInput
                                    title="Job title"
                                    required={true}
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
                                    }}
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
                                    required={true}
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
                                    }}
                                />
                                {/* <div className="w-full">
                                    <label
                                        htmlFor={"job-location"}
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        <span className="text-red-500 mr-1">
                                            *
                                        </span>
                                        Job location
                                    </label>
                                    <input
                                        type="text"
                                        ref={locationInputRef}
                                        placeholder="Example: District 7, Ho Chi Minh"
                                        value={
                                            job?.location ? job.location : ""
                                        }
                                        className={[
                                            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                                        ].join(" ")}
                                        onChange={e => {
                                            dispatch(
                                                setJob({
                                                    ...job,
                                                    location: e.target.value,
                                                })
                                            );
                                        }}
                                    />
                                </div> */}
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
                    <section className="relative">
                        <h2 className={`${styles.form__section__title}`}>
                            Description
                        </h2>
                        <div className={`${styles.form__section__wrapper}`}>
                            <div className="mb-4 md:mb-6">
                                <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                    <span className="text-red-500 mr-1">*</span>
                                    About this role
                                </h3>
                                <div className="border border-slate-600 rounded-lg min-h-[600px] p-3 md:p-6 relative overflow-hidden">
                                    <div className="mb-6 flex flex-col min-h-[220px]">
                                        <h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Description
                                        </h4>
                                        <QuillEditorNoSSR
                                            theme="bubble"
                                            value={job.content.description}
                                            placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                                            onChange={(value: string) => {
                                                dispatch(
                                                    setJob({
                                                        ...job,
                                                        content: {
                                                            ...job.content,
                                                            description: value,
                                                        },
                                                    })
                                                );
                                            }}
                                            className="flex-1"
                                        />
                                    </div>
                                    <div className="mb-6 flex flex-col min-h-[220px]">
                                        <h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Requirements
                                        </h4>
                                        <QuillEditorNoSSR
                                            theme="bubble"
                                            value={job.content.requirements}
                                            placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                                            onChange={(value: string) => {
                                                dispatch(
                                                    setJob({
                                                        ...job,
                                                        content: {
                                                            ...job.content,
                                                            requirements: value,
                                                        },
                                                    })
                                                );
                                            }}
                                            className="flex-1"
                                        />
                                    </div>
                                    <div className="mb-6 flex flex-col min-h-[220px]">
                                        <h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Benefits
                                        </h4>
                                        <QuillEditorNoSSR
                                            theme="bubble"
                                            value={job.content.benefits}
                                            placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                                            onChange={(value: string) => {
                                                dispatch(
                                                    setJob({
                                                        ...job,
                                                        content: {
                                                            ...job.content,
                                                            benefits: value,
                                                        },
                                                    })
                                                );
                                            }}
                                            className="flex-1"
                                        />
                                    </div>

                                    <div className="absolute bottom-0 right-0 left-0 p-1 bg-gray-200">
                                        <span className="text-xs text-gray-500">
                                            Minimum 700 characters.{" "}
                                            {(job.content.description?.length ||
                                                0) +
                                                (job.content.benefits?.length ||
                                                    0) +
                                                (job.content.requirements
                                                    ?.length || 0)}{" "}
                                            characters used.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block absolute -right-8 top-1/2 translate-x-full -translate-y-1/2 w-screen">
                            <div className={styles.instruction__text}>
                                <span className="text-sm text-neutral-500">
                                    Định dạng thành các phần và danh sách để cải
                                    thiện khả năng đọc Tránh nhắm mục tiêu nhân
                                    khẩu học cụ thể, ví dụ: giới tính, quốc tịch
                                    và độ tuổi Không cần thêm liên kết để đăng
                                    ký (một liên kết được thêm tự động)
                                </span>
                            </div>
                        </div>
                    </section>

                    {/* ***********************Employment Details*********************************** */}
                    <section className="relative">
                        <h2 className={`${styles.form__section__title}`}>
                            Employment details
                        </h2>
                        <div className={`${styles.form__section__wrapper}`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                <Selection
                                    title="Employment type"
                                    items={workModalities.map(item => ({
                                        label: item.name,
                                        value: item.name,
                                    }))}
                                    value={job.workModality}
                                    onChange={(value: string) => {
                                        dispatch(
                                            setJob({
                                                ...job,
                                                workModality: value,
                                            })
                                        );
                                    }}
                                />
                                <Selection
                                    title="Experience"
                                    items={experienceLevels.map(item => ({
                                        label: item.name,
                                        value: item.name,
                                    }))}
                                    value={job.experience}
                                    onChange={(value: string) => {
                                        dispatch(
                                            setJob({
                                                ...job,
                                                experience: value,
                                            })
                                        );
                                    }}
                                />
                            </div>
                        </div>
                    </section>

                    {/* ***********************Annual salary*********************************** */}
                    <section className="relative">
                        <h2 className={`${styles.form__section__title}`}>
                            Annual salary
                        </h2>
                        <div className={`${styles.form__section__wrapper}`}>
                            <div className="grid grid-cols-4 gap-x-8">
                                <div>
                                    <FormInput
                                        title="From"
                                        id="min-salary"
                                        type="number"
                                        min={0}
                                        step={1000}
                                        value={
                                            job.minSalary ? job.minSalary : ""
                                        }
                                        onChange={e => {
                                            dispatch(
                                                setJob({
                                                    ...job,
                                                    minSalary: parseInt(
                                                        e.target.value
                                                    ),
                                                })
                                            );
                                        }}
                                    />
                                </div>
                                <div>
                                    <FormInput
                                        title="To"
                                        id="max-salary"
                                        type="number"
                                        step={1000}
                                        min={0}
                                        value={
                                            job.maxSalary ? job.maxSalary : ""
                                        }
                                        onChange={e => {
                                            {
                                                dispatch(
                                                    setJob({
                                                        ...job,
                                                        maxSalary: parseInt(
                                                            e.target.value
                                                        ),
                                                    })
                                                );
                                                dispatch(
                                                    setJobError({
                                                        ...jobErr,
                                                        content: {
                                                            ...jobErr.content,
                                                            maxSalaryErr: "",
                                                        },
                                                    })
                                                );
                                            }
                                        }}
                                        errorText={jobErr.content.maxSalaryErr}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Selection
                                        title="Currency"
                                        items={currencyList.map(item => ({
                                            label: `${item.name} (${item.code})`,
                                            value: `${item.name} (${item.code})`,
                                        }))}
                                        value={job.currency ? job.currency : ""}
                                        onChange={
                                            (value: string) => {
                                                dispatch(
                                                    setJob({
                                                        ...job,
                                                        currency: value,
                                                    })
                                                );
                                            }
                                            // setFormState({
                                            //     ...formState,
                                            //     annualSalary: {
                                            //         ...formState.annualSalary,
                                            //         currency: value,
                                            //     },
                                            // })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ***********************Job Post Publishcation duration*********************************** */}
                    <section className="relative">
                        <h2 className={`${styles.form__section__title}`}>
                            Job post available time range
                        </h2>
                        <div className={`${styles.form__section__wrapper}`}>
                            <div className="grid grid-cols-2 gap-x-8">
                                <div>
                                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Start time
                                    </h3>
                                    <DatePicker
                                        value={new Date(job.startTime)}
                                        onChange={date =>
                                            dispatch(
                                                setJob({
                                                    ...job,
                                                    startTime: date,
                                                })
                                            )
                                        }
                                    />
                                </div>
                                <div>
                                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        End time
                                    </h3>
                                    <DatePicker
                                        value={new Date(job.endTime)}
                                        onChange={date =>
                                            dispatch(
                                                setJob({
                                                    ...job,
                                                    endTime: date,
                                                })
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="w-full h-8"></div>

                    {/* ****************Bottom Button********************* */}
                    <div className="p-5 border-t border-t-slate-300">
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-1 text-white bg-blue_primary_700 hover:bg-blue_primary_800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            {loading && <SpinLoading />}
                            Save & continue
                        </button>
                        <button
                            type="button"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                            Save draft
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditJobDetailForm;
