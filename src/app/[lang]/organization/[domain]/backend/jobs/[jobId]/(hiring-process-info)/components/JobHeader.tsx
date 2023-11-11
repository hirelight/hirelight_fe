"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob } from "@/redux/slices/job.slice";
import jobServices from "@/services/job/job.service";
import { updateJob } from "@/redux/thunks/job.thunk";
import { SpinLoading } from "@/icons";

import styles from "./JobHeader.module.scss";

interface IJobHeader {}

const JobHeader = ({}: IJobHeader) => {
    const pathname = usePathname();
    const { lang } = useParams();
    const job = useAppSelector(state => state.job.data);
    const jobLoading = useAppSelector(state => state.job.loading);
    const dispatch = useAppDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const requestPublishMutation = useMutation({
        mutationKey: [`publish-job-${job.id}`],
        mutationFn: (id: number) => jobServices.requestPublishJob(id),
        onSuccess: res => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            toast.success(res.message, {
                position: "bottom-right",
                autoClose: 1000,
            });
        },
        onError: error => {
            console.error(error);
            toast.error("Publish failure", {
                position: "bottom-right",
                autoClose: 1000,
            });
        },
    });

    const handleSaveAndContinue = async (e: any) => {
        e.preventDefault();
        let redirectLink = "";
        const stage = pathname.split("/")[5];
        switch (stage.toLowerCase()) {
            case "edit":
                redirectLink = `/${lang}/backend/jobs/${job.id}/app-form`;
                break;
            case "app-form":
                redirectLink = `/${lang}/backend/jobs/${job.id}/members`;
                break;
            case "members":
                redirectLink = `/${lang}/backend/jobs/${job.id}/pipeline/config-pipeline`;
                break;
        }

        try {
            const stage = pathname.split("/")[5];
            switch (stage.toLowerCase()) {
                case "edit": {
                    dispatch(
                        updateJob({
                            ...job,
                            id: job.id,
                            content: JSON.stringify(job.content),
                            applicationForm: JSON.stringify(
                                job.applicationForm
                            ),
                        })
                    );
                    break;
                }
                case "app-form":
                    dispatch(
                        updateJob({
                            ...job,
                            id: job.id,
                            content: JSON.stringify(job.content),
                            applicationForm: JSON.stringify(
                                job.applicationForm
                            ),
                        })
                    );
                    break;
                case "members":
                    redirectLink = `/backend/jobs/${job.id}/pipeline/config-pipeline`;
                    break;
            }
        } catch (error) {}
    };

    const handleRequestPublish = async (id: number) => {
        setIsLoading(true);
        await requestPublishMutation.mutateAsync(id);

        setIsLoading(false);
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
                            onClick={handleSaveAndContinue}
                        >
                            {jobLoading && <SpinLoading className="mr-2" />}Save
                            draft
                        </button>
                        <button
                            type="button"
                            className="text-white bg-blue_primary_700 hover:bg-blue_primary_800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={handleRequestPublish.bind(null, job.id)}
                        >
                            {isLoading && <SpinLoading className="mr-2" />}
                            Request publish
                        </button>
                    </div>
                </div>
                <div className={styles.stage__wrapper}>
                    <div className={styles.section__wrapper}>
                        <Link
                            href={`/${lang}/backend/jobs/${job.id}/edit`}
                            className={`${styles.section__container} ${
                                pathname.includes(`/${job.id}/edit`) ||
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
                                href={`/${lang}/backend/jobs/${job.id}/app-form`}
                                tabIndex={-1}
                                className={`h-full`}
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
                                href={`/${lang}/backend/jobs/${job.id}/members`}
                                tabIndex={-1}
                                className={`h-full`}
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
                                href={`/${lang}/backend/jobs/${
                                    job.id
                                }/pipeline/${
                                    job.assessmentFlowId
                                        ? `config-pipeline/${job.assessmentFlowId}`
                                        : "select-pipeline"
                                }`}
                                tabIndex={-1}
                                className={`h-full`}
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
