"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";

import { EllipsisVertical, SpinLoading } from "@/icons";
import { IJobDto } from "@/services/job/job.interface";
import jobServices from "@/services/job/job.service";
import { getIconBaseOnAssessmentType } from "@/helpers/getIconBaseType";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { JobPostStatus } from "@/interfaces/job-post.interface";
import { useAppSelector } from "@/redux/reduxHooks";
import { Roles } from "@/services";
import { handleError } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";

import { Locale } from "../../../../../../../i18n.config";

const TooltipNoSSR = dynamic(
    () => import("flowbite-react").then(mod => mod.Tooltip),
    {
        ssr: false,
        loading: () => (
            <button type="button" className="block">
                <EllipsisVertical className="w-5 h-5" />
            </button>
        ),
    }
);

interface JobCardProps {
    data: IJobDto;
}

const JobCard: React.FC<JobCardProps> = ({
    data: { title, area, status, id, assessmentFlowId, assessmentFlow },
}) => {
    const router = useRouter();
    const { lang } = useParams();
    const queryClient = useQueryClient();
    const { t } = useI18NextTranslation(lang as Locale, "backend", {
        keyPrefix: "components.job_card",
    });

    const { authUser } = useAppSelector(state => state.auth);

    const [isLoading, setIsLoading] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const actionsDropDown = useOutsideClick<HTMLDivElement>(() =>
        setShowActions(false)
    );

    const publishJobMutations = useMutation({
        mutationKey: [`publish-job`, id],
        mutationFn: (id: string) => jobServices.publishJobAsync(id),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["jobs", authUser?.organizationId],
            });
            toast.success(res.message, {
                position: "bottom-right",
                autoClose: 1000,
            });

            setIsLoading(false);
        },
        onError: error => {
            handleError(error);
            setIsLoading(false);
        },
    });

    const unpublishJobMutations = useMutation({
        mutationKey: [`unpublish-job`, id],
        mutationFn: (id: string) => jobServices.unpublishJobAsync(id),
        onSuccess: async res => {
            await queryClient.invalidateQueries({
                queryKey: ["jobs", authUser?.organizationId],
            });
            toast.success(res.message, {
                position: "bottom-right",
                autoClose: 1000,
            });

            setIsLoading(false);
        },
        onError: error => {
            handleError(error);
            setIsLoading(false);
        },
    });

    const handlePublishJob = (id: string) => {
        publishJobMutations.mutate(id);
    };

    const handleUnpublishJob = (id: string) => {
        unpublishJobMutations.mutate(id);
    };

    const handleRedirect = () => {
        if (assessmentFlowId)
            router.push(
                `backend/jobs/${id}/hiring-process/${
                    assessmentFlow?.assessments[0].id ?? ""
                }`
            );
        else toast.error("Please define assessment flow for this job first!");
    };

    return (
        <div className="w-full p-6 bg-white shadow-md rounded-lg">
            <div className="w-full flex  items-center justify-between mb-6">
                <div className="flex flex-wrap sm:flex-nowrap items-start sm:items-center sm:flex-row gap-3">
                    <div
                        role="button"
                        className="text-blue_primary_700 text-xl font-medium whitespace-nowrap hover:underline"
                        onClick={handleRedirect}
                    >
                        {title}
                    </div>
                    <span className="text-sm text-neutral-500 whitespace-nowrap">
                        {area}
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    {status === JobPostStatus.PENDING_APPROVAL &&
                        authUser &&
                        authUser.role === Roles.ORGANIZATION_ADMIN && (
                            <button
                                type="button"
                                className="focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-green-600 dark:hover:bg-green-800 dark:focus:ring-green-700 hidden md:block disabled:cursor-not-allowed disabled:opacity-80"
                                onClick={handlePublishJob.bind(null, id)}
                                disabled={publishJobMutations.isPending}
                            >
                                {publishJobMutations.isPending && (
                                    <SpinLoading className="mr-2" />
                                )}
                                {t("button.publish")}
                            </button>
                        )}
                    {status === JobPostStatus.ACTIVE &&
                        authUser &&
                        authUser.role === Roles.ORGANIZATION_ADMIN && (
                            <button
                                type="button"
                                className="focus:outline-none text-neutral-700 font-semibold bg-slate-300 hover:bg-slate-400 focus:ring-4 rounded-lg text-sm px-4 py-1 hidden md:block disabled:cursor-not-allowed disabled:opacity-80"
                                onClick={handleUnpublishJob.bind(null, id)}
                                disabled={unpublishJobMutations.isPending}
                            >
                                {unpublishJobMutations.isPending && (
                                    <SpinLoading className="mr-2" />
                                )}
                                {t("button.unpublish")}
                            </button>
                        )}
                    <div ref={actionsDropDown} className="relative">
                        <TooltipNoSSR
                            content={
                                <span className="whitespace-nowrap">
                                    More actions
                                </span>
                            }
                        >
                            <button
                                type="button"
                                onClick={() => setShowActions(!showActions)}
                                className="block w-6 h-6"
                            >
                                <EllipsisVertical />
                            </button>
                        </TooltipNoSSR>
                        {showActions && (
                            <ul className="py-4 min-w-[180px] rounded-md absolute mt-2 top-full right-0 z-50 bg-white drop-shadow-lg text-sm text-gray-500">
                                {assessmentFlowId && (
                                    <li>
                                        <Link
                                            href={`backend/jobs/${id}/hiring-process/${
                                                assessmentFlow?.assessments[0]
                                                    .id ?? ""
                                            }`}
                                            className="w-full px-4 py-2 block hover:bg-orange-100"
                                            onClick={() =>
                                                setShowActions(false)
                                            }
                                        >
                                            {t("action_list.view_job")}
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link
                                        href={`backend/jobs/${id}/edit`}
                                        className="w-full px-4 py-2 block hover:bg-orange-100"
                                        onClick={() => setShowActions(false)}
                                    >
                                        {t("action_list.edit_job")}
                                    </Link>
                                </li>

                                <li className="list-item lg:hidden">
                                    <button
                                        type="button"
                                        className="w-full px-4 py-2 block text-left hover:bg-orange-100"
                                        onClick={handlePublishJob.bind(
                                            null,
                                            id
                                        )}
                                    >
                                        {t("action_list.publish_job")}
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <ul className="hidden w-full md:flex items-center justify-between mt-2 mb-6 overflow-hidden">
                {assessmentFlow &&
                    assessmentFlow.assessments?.map(assessment => (
                        <li
                            key={assessment.id}
                            className="min-w-[160px] flex-shrink-0 flex flex-col items-center p-4"
                        >
                            <h4 className="w-8 h-8 mb-2 text-neutral-700">
                                {getIconBaseOnAssessmentType(
                                    assessment.assessmentTypeName
                                )}
                            </h4>
                            <p className="text-neutral-500">
                                {assessment.name}
                            </p>
                        </li>
                    ))}
            </ul>
            <div className="w-full flex justify-between">
                <div className="hidden sm:block">
                    <span className="text-neutral-500 text-sm">
                        {status === "ACTIVE" ? (
                            <span>
                                <CheckIcon className="w-5 h-5 text-green-500 inline mr-2" />{" "}
                                {t("span.already_posted")}
                            </span>
                        ) : (
                            status
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
