"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

import { experienceLevels, workModalities } from "@/utils/shared/initialDatas";
import currencies from "@/utils/shared/currencies.json";
import {
    CustomInput,
    DatePicker,
    LocationAutocomplete,
    Selection,
} from "@/components";
import { SpinLoading } from "@/icons";
import jobServices from "@/services/job/job.service";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { ICreateJobDto, JobContentJson } from "@/services";

import styles from "./AddJobDetailForm.module.scss";
import NewJobHeader from "./NewJobHeader";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

type AddJobDetailFormProps = {};

const AddJobDetailForm: React.FC<AddJobDetailFormProps> = ({}) => {
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);

    const [contentLength, setContentLength] = useState({
        description: 0,
        requirements: 0,
        benefits: 0,
    });
    const [formState, setFormState] = useState<
        Omit<ICreateJobDto, "content"> & {
            content: JobContentJson;
        }
    >({
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

    const [formErr, setFormErr] = useState({
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

        if (startTime.getTime() >= endTime.getTime()) {
            errors.jobPublishTimeErr =
                "Start time must be earlier than end time";
        }

        if (endTime.getTime() <= new Date().getTime()) {
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

            console.log(appFormTemplateRes);

            const res = await jobServices.createAsync({
                ...formState,
                content: JSON.stringify(formState.content),
                applicationForm: JSON.stringify(parsedAppForm),
            });
            toast.success(res.message);
            router.push(`${res.data}/edit`);
        } catch (error) {
            console.error(error);
            toast.error("Create job failure");
        }

        setLoading(false);
    };

    return (
        <>
            <NewJobHeader form={formState} />
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
                                        value={formState.title}
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
                        <section className="relative">
                            <h2 className={`${styles.form__section__title}`}>
                                Description
                            </h2>
                            <div className={`${styles.form__section__wrapper}`}>
                                <div className="mb-4 md:mb-6">
                                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        <span className="text-red-500 mr-1">
                                            *
                                        </span>
                                        About this role
                                    </h3>
                                    <div className="border border-slate-600 rounded-lg min-h-[600px] p-3 md:p-6 relative overflow-hidden">
                                        <div className="mb-6 flex flex-col min-h-[220px]">
                                            <QuillEditorNoSSR
                                                label="Description"
                                                theme="bubble"
                                                required={true}
                                                value={
                                                    formState.content
                                                        .description
                                                }
                                                placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                                                onChange={(
                                                    value: string,
                                                    text
                                                ) => {
                                                    setContentLength(prev => ({
                                                        ...prev,
                                                        description:
                                                            text.length,
                                                    }));
                                                    setFormState({
                                                        ...formState,
                                                        content: {
                                                            ...formState.content,
                                                            description: value,
                                                        },
                                                    });
                                                    setFormErr({
                                                        ...formErr,
                                                        contentErr: {
                                                            ...formErr.contentErr,
                                                            descriptionErr: "",
                                                            contentErr: "",
                                                        },
                                                    });
                                                }}
                                                className="flex-1"
                                            />
                                            {formErr.contentErr
                                                .descriptionErr !== "" && (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    <span className="font-medium">
                                                        {
                                                            formErr.contentErr
                                                                .descriptionErr
                                                        }
                                                    </span>
                                                </p>
                                            )}
                                        </div>

                                        <div className="mb-6 flex flex-col min-h-[220px]">
                                            <QuillEditorNoSSR
                                                label="Requirements"
                                                theme="bubble"
                                                value={
                                                    formState.content
                                                        .requirements
                                                }
                                                placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                                                onChange={(value, text) => {
                                                    setContentLength(prev => ({
                                                        ...prev,
                                                        requirements:
                                                            text.length,
                                                    }));
                                                    setFormState({
                                                        ...formState,
                                                        content: {
                                                            ...formState.content,
                                                            requirements: value,
                                                        },
                                                    });
                                                    setFormErr({
                                                        ...formErr,
                                                        contentErr: {
                                                            ...formErr.contentErr,
                                                            requirementsErr: "",
                                                            contentErr: "",
                                                        },
                                                    });
                                                }}
                                                className="flex-1"
                                                required={true}
                                            />
                                            {formErr.contentErr
                                                .requirementsErr && (
                                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                                    <span className="font-medium">
                                                        {
                                                            formErr.contentErr
                                                                .requirementsErr
                                                        }{" "}
                                                    </span>
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-6 flex flex-col min-h-[220px]">
                                            <QuillEditorNoSSR
                                                label="Benefits"
                                                theme="bubble"
                                                value={
                                                    formState.content.benefits
                                                }
                                                placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                                                onChange={(value, text) => {
                                                    setContentLength(prev => ({
                                                        ...prev,
                                                        benefits: text.length,
                                                    }));
                                                    setFormState({
                                                        ...formState,
                                                        content: {
                                                            ...formState.content,
                                                            benefits: value,
                                                        },
                                                    });
                                                    setFormErr({
                                                        ...formErr,
                                                        contentErr: {
                                                            ...formErr.contentErr,
                                                            contentErr: "",
                                                        },
                                                    });
                                                }}
                                                className="flex-1"
                                            />
                                        </div>

                                        <div
                                            className={`absolute bottom-0 right-0 left-0 p-1 text-xs ${
                                                formErr.contentErr.contentErr
                                                    ? "bg-red-400 text-red-700 font-medium"
                                                    : "text-gray-500 bg-gray-200"
                                            }`}
                                        >
                                            <span>
                                                Minimum 700 characters.{" "}
                                                {Object.values(
                                                    contentLength
                                                ).reduce(
                                                    (prev, cur) => prev + cur
                                                )}{" "}
                                                characters used.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block absolute -right-8 top-1/2 translate-x-full -translate-y-1/2 w-screen">
                                <div className={styles.instruction__text}>
                                    <span className="text-sm text-neutral-500">
                                        Định dạng thành các phần và danh sách để
                                        cải thiện khả năng đọc Tránh nhắm mục
                                        tiêu nhân khẩu học cụ thể, ví dụ: giới
                                        tính, quốc tịch và độ tuổi Không cần
                                        thêm liên kết để đăng ký (một liên kết
                                        được thêm tự động)
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
                                        value={formState.workModality}
                                        onChange={(value: string) => {
                                            setFormState({
                                                ...formState,
                                                workModality: value,
                                            });
                                        }}
                                    />
                                    <Selection
                                        title="Experience"
                                        items={experienceLevels.map(item => ({
                                            label: item.name,
                                            value: item.name,
                                        }))}
                                        value={formState.experience}
                                        onChange={(value: string) => {
                                            setFormState({
                                                ...formState,
                                                experience: value,
                                            });
                                        }}
                                    />
                                    <CustomInput
                                        title="Keywords"
                                        type="text"
                                        onChange={() => {}}
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
                                        <CustomInput
                                            title="From"
                                            id="min-salary"
                                            type="number"
                                            min={0}
                                            step={1000}
                                            value={formState.minSalary}
                                            onChange={e => {
                                                setFormState({
                                                    ...formState,
                                                    minSalary: parseInt(
                                                        e.target.value
                                                    ),
                                                });
                                                setFormErr({
                                                    ...formErr,
                                                    salaryErr: "",
                                                });
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <CustomInput
                                            title="To"
                                            id="max-salary"
                                            type="number"
                                            step={1000}
                                            min={0}
                                            value={formState.maxSalary}
                                            onChange={e => {
                                                {
                                                    setFormState({
                                                        ...formState,
                                                        maxSalary: parseInt(
                                                            e.target.value
                                                        ),
                                                    });
                                                    setFormErr({
                                                        ...formErr,
                                                        salaryErr: "",
                                                    });
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <Selection
                                            title="Currency"
                                            items={Object.values(
                                                currencies
                                            ).map(item => ({
                                                label: `${item.name} (${item.code})`,
                                                value: item,
                                            }))}
                                            value={
                                                formState.currency
                                                    ? currencies[
                                                          formState.currency as keyof typeof currencies
                                                      ].name
                                                    : ""
                                            }
                                            onChange={value => {
                                                setFormState({
                                                    ...formState,
                                                    currency: value.code,
                                                });
                                                setFormErr({
                                                    ...formErr,
                                                    salaryErr: "",
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                {formErr.salaryErr && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            {formErr.salaryErr}{" "}
                                        </span>
                                    </p>
                                )}
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
                                            value={formState.startTime}
                                            pos={"top"}
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
                            <button
                                type="button"
                                className="inline-flex items-center justify-center gap-1 text-white bg-blue_primary_700 hover:bg-blue_primary_800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={handleSubmitJobDetail}
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
                </div>
            </div>
        </>
    );
};

export default AddJobDetailForm;
