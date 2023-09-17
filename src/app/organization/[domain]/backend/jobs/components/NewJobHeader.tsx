"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/reduxHooks";

import styles from "./NewJobHeader.module.scss";

interface INewJobHeader {}

const NewJobHeader = ({}: INewJobHeader) => {
    const router = useRouter();
    const pathname = usePathname();
    const { jobId } = useParams();
    const title = useAppSelector(state => state.job.data.title);

    const handleSaveAndContinue = () => {
        if (pathname.includes("jobs/new"))
            router.push("/backend/jobs/123/edit");
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
                    <h4 className="text-2xl">{title ? title : "New Job"}</h4>
                    <div>
                        <button
                            type="button"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                            Save draft
                        </button>
                        <button
                            type="button"
                            className="text-white bg-blue_primary_700 hover:bg-blue_primary_800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={handleSaveAndContinue}
                        >
                            Save & continue
                        </button>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-2">
                    <div className='flex items-start justify-between after:content-[""] after:h-4/5 after:w-[1px] after:bg-gray-400 after:ml-2 after:self-center'>
                        <button
                            type="button"
                            onClick={
                                jobId
                                    ? () =>
                                          router.push(
                                              `/backend/jobs/${jobId}/edit`
                                          )
                                    : () => {}
                            }
                            className={`${styles.section__wrapper} ${
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
                        </button>
                    </div>
                    <div className='flex items-start justify-between after:content-[""] after:h-4/5 after:w-[1px] after:bg-gray-400 after:ml-2 after:self-center'>
                        <div
                            className={`${styles.section__wrapper} ${
                                pathname.includes("app-form")
                                    ? styles.active
                                    : ""
                            } ${
                                pathname.includes("jobs/new")
                                    ? styles.disabled
                                    : ""
                            }`}
                        >
                            <Link
                                href={`/backend/jobs/${jobId}/app-form`}
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

                    <div className='flex items-start justify-between after:content-[""] after:h-4/5 after:w-[1px] after:bg-gray-400 after:ml-2 after:self-center'>
                        <div
                            className={`${styles.section__wrapper} ${
                                pathname.includes("members")
                                    ? styles.active
                                    : ""
                            } ${
                                pathname.includes("jobs/new")
                                    ? styles.disabled
                                    : ""
                            }`}
                        >
                            <Link
                                href={`/backend/jobs/${jobId}/members`}
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
                            className={`${styles.section__wrapper} ${
                                pathname.includes("workflow")
                                    ? styles.active
                                    : ""
                            } ${
                                pathname.includes("jobs/new")
                                    ? styles.disabled
                                    : ""
                            }`}
                        >
                            <Link
                                href={`/backend/jobs/${jobId}/pipeline/config-pipeline`}
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

export default NewJobHeader;
