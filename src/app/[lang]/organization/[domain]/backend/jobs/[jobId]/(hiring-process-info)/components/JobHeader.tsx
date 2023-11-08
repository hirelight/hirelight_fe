"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob } from "@/redux/slices/job.slice";
import jobServices from "@/services/job/job.service";
import { updateJob } from "@/redux/thunks/job.thunk";

import styles from "./JobHeader.module.scss";

interface IJobHeader {}

const JobHeader = ({}: IJobHeader) => {
    const pathname = usePathname();
    const { jobId, lang } = useParams();
    const job = useAppSelector(state => state.job.data);
    const dispatch = useAppDispatch();

    const handleSaveAndContinue = async (e: any) => {
        e.preventDefault();
        let redirectLink = "";
        const stage = pathname.split("/")[5];
        switch (stage.toLowerCase()) {
            case "edit":
                redirectLink = `/${lang}/backend/jobs/${jobId}/app-form`;
                break;
            case "app-form":
                redirectLink = `/${lang}/backend/jobs/${jobId}/members`;
                break;
            case "members":
                redirectLink = `/${lang}/backend/jobs/${jobId}/pipeline/config-pipeline`;
                break;
        }

        try {
            const stage = pathname.split("/")[5];
            switch (stage.toLowerCase()) {
                case "edit": {
                    if (jobId !== undefined) {
                        // const res = await jobServices.editAsync({
                        //     ...job,
                        //     id: parseInt(jobId as string),
                        //     content: JSON.stringify(job.content),
                        //     applicationForm: JSON.stringify(
                        //         job.applicationForm
                        //     ),
                        // });
                        dispatch(
                            updateJob({
                                ...job,
                                id: parseInt(jobId as string),
                                content: JSON.stringify(job.content),
                                applicationForm: JSON.stringify(
                                    job.applicationForm
                                ),
                            })
                        );
                    }
                    break;
                }
                case "app-form":
                    if (jobId !== undefined) {
                        // const res = await jobServices.editAsync({
                        //     ...job,
                        //     id: parseInt(jobId as string),
                        //     content: JSON.stringify(job.content),
                        //     applicationForm: JSON.stringify(
                        //         job.applicationForm
                        //     ),
                        // });
                        // toast.success(res.message);
                        dispatch(
                            updateJob({
                                ...job,
                                id: parseInt(jobId as string),
                                content: JSON.stringify(job.content),
                                applicationForm: JSON.stringify(
                                    job.applicationForm
                                ),
                            })
                        );
                    }
                    break;
                case "members":
                    redirectLink = `/backend/jobs/${jobId}/pipeline/config-pipeline`;
                    break;
            }
        } catch (error) {}
    };

    return (
        <div
            className={[
                "bg-white rounded-md drop-shadow-md mt-8 mb-6",
                styles.header__wrapper,
            ].join(" ")}
        >
            <div className="max-w-screen-xl mx-auto py-5 px-4 xl:px-6 flex-shrink-0">
                <div className="w-full flex items-center justify-between mb-4">
                    <h4 className="text-2xl text-neutral-700 font-medium">
                        {job.title}
                    </h4>
                    <div className="hidden md:block">
                        <button
                            type="button"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                            Save draft
                        </button>
                        <button
                            type="button"
                            className="text-white bg-blue_primary_700 hover:bg-blue_primary_800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={handleSaveAndContinue}
                        >
                            Save & continue
                        </button>
                    </div>
                </div>
                <div className={styles.stage__wrapper}>
                    <div className={styles.section__wrapper}>
                        <Link
                            href={`/${lang}/backend/jobs/${jobId}/edit`}
                            className={`${styles.section__container} ${
                                pathname.includes("edit") ||
                                pathname.includes("jobs/new")
                                    ? styles.active
                                    : ""
                            }`}
                            tabIndex={-1}
                        >
                            <h3 className={styles.section__title}>
                                Job details
                            </h3>
                            <p className={`${styles.section__description}`}>
                                Tells applicants about this role, including job
                                title, location and requirements.
                            </p>
                        </Link>
                    </div>
                    <div className={styles.section__wrapper}>
                        <div
                            className={`${styles.section__container} ${
                                pathname.includes("app-form")
                                    ? styles.active
                                    : ""
                            }`}
                        >
                            <Link
                                href={`/${lang}/backend/jobs/${jobId}/app-form`}
                                tabIndex={-1}
                                className={`h-full ${
                                    pathname.includes("app-form")
                                        ? "pointer-events-none"
                                        : ""
                                }`}
                            >
                                <h3 className={styles.section__title}>
                                    Application Form
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    Design the application form for this role.
                                </p>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.section__wrapper}>
                        <div
                            className={`${styles.section__container} ${
                                pathname.includes("members")
                                    ? styles.active
                                    : ""
                            }`}
                        >
                            <Link
                                href={`/${lang}/backend/jobs/${jobId}/members`}
                                tabIndex={-1}
                                className={`h-full ${
                                    pathname.includes("members")
                                        ? "pointer-events-none"
                                        : ""
                                }`}
                            >
                                <h3 className={styles.section__title}>
                                    Team Members
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    Invite or add co-workers to collaborate on
                                    this job.
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`${styles.section__container} ${
                                pathname.includes("pipeline")
                                    ? styles.active
                                    : ""
                            }`}
                        >
                            <Link
                                href={`/${lang}/backend/jobs/${jobId}/pipeline/config-pipeline`}
                                tabIndex={-1}
                                className={`h-full ${
                                    pathname.includes("pipeline")
                                        ? "pointer-events-none"
                                        : ""
                                }`}
                            >
                                <h3 className={styles.section__title}>
                                    Workflow
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    Create a kit or assessment test for a
                                    structured interview process.
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobHeader;
