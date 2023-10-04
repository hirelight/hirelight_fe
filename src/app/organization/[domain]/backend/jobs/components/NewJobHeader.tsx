"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { createNewJob, updateJobDetail } from "@/services/job/job.service";
import { setJob } from "@/redux/slices/job.slice";

import styles from "./NewJobHeader.module.scss";

interface INewJobHeader {}

const NewJobHeader = ({}: INewJobHeader) => {
    const router = useRouter();
    const pathname = usePathname();
    const { jobId } = useParams();
    const title = useAppSelector(state => state.job.data.title);
    const dispatch = useAppDispatch();
    const job = useAppSelector(state => state.job.data);

    const stage = pathname.split("/")[4];

    const handleSaveAndContinue = async (e: any) => {
        e.preventDefault();
        let redirectLink = "";
        if (pathname.includes("jobs/new")) {
            redirectLink = `/backend/jobs/${123}/edit`;
        } else {
            const stage = pathname.split("/")[4];
            switch (stage.toLowerCase()) {
                case "edit":
                    redirectLink = `/backend/jobs/${jobId}/app-form`;
                    break;
                case "app-form":
                    redirectLink = `/backend/jobs/${jobId}/members`;
                    break;
                case "members":
                    redirectLink = `/backend/jobs/${jobId}/pipeline/config-pipeline`;
                    break;
            }
        }

        try {
            if (pathname.includes("jobs/new")) {
                const res = await createNewJob(job);
                if (res.data.status === 200) {
                    dispatch(setJob(job));
                    router.push(redirectLink);
                }
            } else {
                if (job.id !== undefined) {
                    const res = await updateJobDetail({ id: job.id, ...job });
                    if (res.data.status === 200) {
                        toast.success("Update successfully!");
                        dispatch(setJob(res.data.data));
                    }

                    router.push(redirectLink);
                }
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
                            onClick={
                                jobId
                                    ? () =>
                                          router.push(
                                              `/backend/jobs/${jobId}/edit`
                                          )
                                    : () => {}
                            }
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
                        </button>
                    </div>
                    <div className={styles.section__wrapper}>
                        <div
                            className={`${styles.section__container} ${
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

                    <div className={styles.section__wrapper}>
                        <div
                            className={`${styles.section__container} ${
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
                            className={`${styles.section__container} ${
                                pathname.includes("pipeline")
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
