"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob } from "@/redux/slices/job.slice";
import jobServices from "@/services/job/job.service";
import { intialAppForm } from "@/utils/shared/initialDatas";

import styles from "./NewJobHeader.module.scss";

interface INewJobHeader {}

const NewJobHeader = ({}: INewJobHeader) => {
    const router = useRouter();
    const pathname = usePathname();
    const title = useAppSelector(state => state.job.data.title);
    const job = useAppSelector(state => state.job.data);

    const handleSaveAndContinue = async (e: any) => {
        e.preventDefault();

        try {
            const res = await jobServices.createAsync({
                ...job,
                content: JSON.stringify(job),
                applicationForm: JSON.stringify(intialAppForm),
            });
            router.push(`${res.data}/edit`);
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
                        {title ? title : "New Job"}
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
                        <button
                            type="button"
                            className={`${styles.section__container} ${styles.active}`}
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
                    <div className={styles.section__wrapper}>
                        <div
                            className={`${styles.section__container} ${
                                pathname.includes("app-form")
                                    ? styles.active
                                    : ""
                            } ${styles.disabled}`}
                        >
                            <div
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
                            </div>
                        </div>
                    </div>

                    <div className={styles.section__wrapper}>
                        <div
                            className={`${styles.section__container} ${
                                pathname.includes("members")
                                    ? styles.active
                                    : ""
                            } ${styles.disabled}`}
                        >
                            <div
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
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`${styles.section__container} ${
                                pathname.includes("pipeline")
                                    ? styles.active
                                    : ""
                            } ${styles.disabled}`}
                        >
                            <div
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewJobHeader;