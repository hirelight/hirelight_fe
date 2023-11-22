"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";

import { EllipsisVertical, SpinLoading } from "@/icons";
import { IJobDto } from "@/services/job/job.interface";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import jobServices from "@/services/job/job.service";
import { getIconBaseOnAssessmentType } from "@/helpers/getIconBaseType";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { JobPostStatus } from "@/interfaces/job-post.interface";

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
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);
    const [showActions, setShowActions] = useState(false);
    const actionsDropDown = useOutsideClick<HTMLDivElement>(() =>
        setShowActions(false)
    );

    const publishJobMutations = useMutation({
        mutationKey: [`publish-job`, id],
        mutationFn: (id: string) => jobServices.publishJobAsync(id),
        onSuccess: res => {
            toast.success(res.message, {
                position: "bottom-right",
                autoClose: 1000,
            });

            queryClient.invalidateQueries({ queryKey: ["jobs"] });
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

    const handlePublishJob = async (id: string) => {
        setIsLoading(true);
        await publishJobMutations.mutateAsync(id);
    };

    return (
        <div className="w-full p-6 bg-white shadow-md rounded-lg">
            <div className="w-full flex  items-center justify-between mb-6">
                <div className="flex  flex-wrap sm:flex-nowrap items-start sm:items-center sm:flex-row gap-3">
                    <h3
                        // href={`backend/jobs/${id}/hiring-process/applied`}
                        className="text-blue_primary_700 text-xl font-medium whitespace-nowrap"
                    >
                        {title}
                    </h3>
                    <span className="text-sm text-neutral-500 whitespace-nowrap">
                        {area}
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    {status === JobPostStatus.PENDING_APPROVAL && (
                        <button
                            type="button"
                            className="focus:outline-none text-white bg-green-500 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-green-600 dark:hover:bg-green-800 dark:focus:ring-green-700 hidden md:block"
                            onClick={handlePublishJob.bind(null, id)}
                        >
                            {isLoading && <SpinLoading className="mr-2" />}
                            Publish
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
                                            href={`backend/jobs/${id}/hiring-process`}
                                            className="w-full px-4 py-2 block hover:bg-orange-100"
                                            onClick={() =>
                                                setShowActions(false)
                                            }
                                        >
                                            View job
                                        </Link>
                                    </li>
                                )}
                                <li>
                                    <Link
                                        href={`backend/jobs/${id}/edit`}
                                        className="w-full px-4 py-2 block hover:bg-orange-100"
                                        onClick={() => setShowActions(false)}
                                    >
                                        Edit job
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={"#"}
                                        className="w-full px-4 py-2 block hover:bg-orange-100"
                                        onClick={() => setShowActions(false)}
                                    >
                                        Leave job
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
                                        Publish job
                                    </button>
                                </li>
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <ul className="hidden w-full md:flex items-center justify-between mt-2 mb-6 overflow-hidden">
                {assessmentFlow &&
                    assessmentFlow.assessments?.map((assessment, index) => (
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
                                Already posted on Hirelight system
                            </span>
                        ) : (
                            status
                        )}
                    </span>
                </div>
                <div className="flex gap-5">
                    <span className="text-blue_primary_700 text-sm">
                        Candidates: 0
                    </span>
                    <span className="text-green-500 text-sm">
                        In progress: 0
                    </span>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
