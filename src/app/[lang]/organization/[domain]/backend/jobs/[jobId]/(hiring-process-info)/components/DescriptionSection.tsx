import React from "react";
import dynamic from "next/dynamic";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import {
    setContentLength,
    setJob,
    setJobError,
} from "@/redux/slices/job.slice";

import styles from "./EditJobDetailForm.module.scss";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const DescriptionSection = () => {
    const dispatch = useAppDispatch();
    const {
        data: job,
        contentLength,
        error: jobErr,
    } = useAppSelector(state => state.job);
    return (
        <section className="relative">
            <h2 className={`${styles.form__section__title}`}>Description</h2>
            <div className={`${styles.form__section__wrapper}`}>
                <div className="mb-4 md:mb-6">
                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <span className="text-red-500 mr-1">*</span>
                        About this role
                    </h3>
                    <div className="border border-slate-600 rounded-lg min-h-[600px] p-3 md:p-6 relative overflow-hidden">
                        <div className="mb-6 flex flex-col min-h-[220px]">
                            <QuillEditorNoSSR
                                label="Description"
                                theme="bubble"
                                value={job.content.description}
                                placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                                onChange={(value: string, text) => {
                                    dispatch(
                                        setContentLength({
                                            ...contentLength,
                                            description: text.length,
                                        })
                                    );
                                    dispatch(
                                        setJob({
                                            ...job,
                                            content: {
                                                ...job.content,
                                                description: value,
                                            },
                                        })
                                    );
                                    dispatch(
                                        setJobError({
                                            ...jobErr,
                                            contentErr: {
                                                ...jobErr.contentErr,
                                                descriptionErr: "",
                                                contentErr: "",
                                            },
                                        })
                                    );
                                }}
                                className="flex-1"
                            />
                            {jobErr.contentErr.descriptionErr !== "" && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">
                                        {jobErr.contentErr.descriptionErr}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className="mb-6 flex flex-col min-h-[220px]">
                            <QuillEditorNoSSR
                                label="Requirements"
                                theme="bubble"
                                value={job.content.requirements}
                                placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                                onChange={(value: string, text) => {
                                    dispatch(
                                        setContentLength({
                                            ...contentLength,
                                            requirements: text.length,
                                        })
                                    );
                                    dispatch(
                                        setJob({
                                            ...job,
                                            content: {
                                                ...job.content,
                                                requirements: value,
                                            },
                                        })
                                    );
                                    dispatch(
                                        setJobError({
                                            ...jobErr,
                                            contentErr: {
                                                ...jobErr.contentErr,
                                                requirementsErr: "",
                                                contentErr: "",
                                            },
                                        })
                                    );
                                }}
                                className="flex-1"
                            />
                            {jobErr.contentErr.requirementsErr && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">
                                        {jobErr.contentErr.requirementsErr}{" "}
                                    </span>
                                </p>
                            )}
                        </div>
                        <div className="mb-6 flex flex-col min-h-[220px]">
                            <QuillEditorNoSSR
                                label="Benefits"
                                theme="bubble"
                                value={job.content.benefits}
                                placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                                onChange={(value: string, text) => {
                                    dispatch(
                                        setContentLength({
                                            ...contentLength,
                                            benefits: text.length,
                                        })
                                    );
                                    dispatch(
                                        setJob({
                                            ...job,
                                            content: {
                                                ...job.content,
                                                benefits: value,
                                            },
                                        })
                                    );
                                    dispatch(
                                        setJobError({
                                            ...jobErr,
                                            contentErr: {
                                                ...jobErr.contentErr,
                                                contentErr: "",
                                            },
                                        })
                                    );
                                }}
                                className="flex-1"
                            />
                        </div>

                        <div
                            className={`absolute bottom-0 right-0 left-0 p-1 text-xs ${
                                jobErr.contentErr.contentErr
                                    ? "bg-red-400 text-red-700 font-medium"
                                    : "text-gray-500 bg-gray-200"
                            }`}
                        >
                            <span>
                                Minimum 700 characters.{" "}
                                {Object.values(contentLength).reduce(
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
                        Định dạng thành các phần và danh sách để cải thiện khả
                        năng đọc Tránh nhắm mục tiêu nhân khẩu học cụ thể, ví
                        dụ: giới tính, quốc tịch và độ tuổi Không cần thêm liên
                        kết để đăng ký (một liên kết được thêm tự động)
                    </span>
                </div>
            </div>
        </section>
    );
};

export default DescriptionSection;
