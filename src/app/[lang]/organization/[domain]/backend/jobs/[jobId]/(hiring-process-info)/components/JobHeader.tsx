"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import jwtDecode from "jwt-decode";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob } from "@/redux/slices/job.slice";
import jobServices from "@/services/job/job.service";
import { updateJob } from "@/redux/thunks/job.thunk";
import { SpinLoading } from "@/icons";
import { JobPostStatus } from "@/interfaces/job-post.interface";
import { Button, ButtonOutline } from "@/components";
import { Roles } from "@/services";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./JobHeader.module.scss";

interface IJobHeader {}

const JobHeader = ({}: IJobHeader) => {
    const pathname = usePathname();
    const { lang, jobId } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "edit-job");

    const dispatch = useAppDispatch();

    const job = useAppSelector(state => state.job.data);
    const { authUser } = useAppSelector(state => state.auth);
    const jobLoading = useAppSelector(state => state.job.loading);

    const [isLoading, setIsLoading] = useState(false);
    const queryClient = useQueryClient();
    const requestPublishMutation = useMutation({
        mutationKey: [`request-publish`, jobId],
        mutationFn: (id: string) => jobServices.requestPublishJob(id),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["jobs", authUser!!.organizationId],
            });

            await queryClient.invalidateQueries({
                queryKey: ["job", jobId],
            });
            toast.success(res.message, {
                position: "bottom-right",
                autoClose: 1000,
            });
        },
        onError: error => {
            toast.error(error.message ? error.message : "Publish failure", {
                position: "bottom-right",
                autoClose: 1000,
            });

            setIsLoading(false);
        },
    });
    const publishJobMutations = useMutation({
        mutationKey: [`publish-job`, jobId],
        mutationFn: (id: string) => jobServices.publishJobAsync(id),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["jobs", authUser!!.organizationId],
            });

            await queryClient.invalidateQueries({
                queryKey: ["job", jobId],
            });
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
            setIsLoading(false);
        },
    });

    const unpublishJobMutations = useMutation({
        mutationKey: [`unpublish-job`, jobId],
        mutationFn: (id: string) => jobServices.unpublishJobAsync(id),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["jobs", authUser!!.organizationId],
            });
            toast.success(res.message, {
                position: "bottom-right",
                autoClose: 1000,
            });

            setIsLoading(false);
        },
        onError: error => {
            console.error(error);
            toast.error("Publish failure", {
                position: "bottom-right",
                autoClose: 1000,
            });
            setIsLoading(false);
        },
    });

    const requestUnpublish = useMutation({
        mutationKey: [`req-unpublish-job`, jobId],
        mutationFn: (id: string) => jobServices.requestUnpublishJob(id),
        onSuccess: async res => {
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
            setIsLoading(false);
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

        if (job.status === JobPostStatus.ACTIVE)
            return toast.error(t("common:error.jobpost_is_publishing"));

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

    const handleRequestPublish = (id: string) => {
        requestPublishMutation.mutate(id);
    };
    const handlePublish = (id: string) => {
        publishJobMutations.mutate(id);
    };
    const handleUnpublishJob = (id: string) => {
        unpublishJobMutations.mutate(id);
    };
    const handleRequestUnpublish = (id: string) => {
        requestUnpublish.mutate(id);
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
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 disabled:cursor-not-allowed disabled:opacity-80"
                            onClick={handleSaveAndContinue}
                            disabled={
                                jobLoading || requestPublishMutation.isPending
                            }
                        >
                            {jobLoading && <SpinLoading className="mr-2" />}
                            {t("common:save_draft")}
                        </button>
                        {job.assessmentFlowId &&
                            authUser &&
                            authUser.userId === job.creatorId &&
                            job.status === JobPostStatus.DRAFT && (
                                <Button
                                    type="button"
                                    onClick={handleRequestPublish.bind(
                                        null,
                                        job.id
                                    )}
                                    disabled={
                                        requestPublishMutation.isPending ||
                                        jobLoading
                                    }
                                    isLoading={requestPublishMutation.isPending}
                                >
                                    {t("common:request_publish")}
                                </Button>
                            )}

                        {authUser &&
                            authUser.role === Roles.ORGANIZATION_ADMIN &&
                            job.status === JobPostStatus.PENDING_APPROVAL && (
                                <Button
                                    type="button"
                                    onClick={handlePublish.bind(null, job.id)}
                                    disabled={
                                        publishJobMutations.isPending ||
                                        jobLoading
                                    }
                                    isLoading={publishJobMutations.isPending}
                                >
                                    {t("common:publish")}
                                </Button>
                            )}

                        {authUser &&
                            authUser.role === Roles.ORGANIZATION_ADMIN &&
                            job.status === JobPostStatus.ACTIVE && (
                                <ButtonOutline
                                    type="button"
                                    onClick={handleUnpublishJob.bind(
                                        null,
                                        job.id
                                    )}
                                    disabled={
                                        unpublishJobMutations.isPending ||
                                        jobLoading
                                    }
                                    isLoading={unpublishJobMutations.isPending}
                                >
                                    {t("common:unpublish")}
                                </ButtonOutline>
                            )}

                        {authUser &&
                            authUser.userId === job.creatorId &&
                            authUser.role !== Roles.ORGANIZATION_ADMIN &&
                            job.status === JobPostStatus.ACTIVE && (
                                <ButtonOutline
                                    type="button"
                                    onClick={handleRequestUnpublish.bind(
                                        null,
                                        job.id
                                    )}
                                    disabled={
                                        requestUnpublish.isPending || jobLoading
                                    }
                                    isLoading={requestUnpublish.isPending}
                                >
                                    {t("common:request_editing")}
                                </ButtonOutline>
                            )}
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
                                {t("job_details")}
                            </h3>
                            <p className={`${styles.section__description}`}>
                                {t("tell_applicant_about_this_role")}
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
                                    {t("application_form")}
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    {t("design_app_form")}
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
                                    {t("team_members")}
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    {t("invite_or_add")}
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
                                        : "create-flow"
                                }`}
                                tabIndex={-1}
                                className={`h-full`}
                            >
                                <h3 className={styles.section__title}>
                                    {t("common:assessment_flow")}
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    {t("create_a_kit")}
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
