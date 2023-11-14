"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { EllipsisVertical, SpinLoading } from "@/icons";
import { IJobDto } from "@/services/job/job.interface";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import { IAssessmentFlowDto } from "@/services";
import jobServices from "@/services/job/job.service";

interface IStage {
    name: string;
    numOfCandidate: number;
}

const arrs: IStage[] = [
    {
        numOfCandidate: 0,
        name: "Inbox",
    },
    {
        numOfCandidate: 0,
        name: "Review CV",
    },
    {
        numOfCandidate: 0,
        name: "Phone Screen",
    },
    {
        numOfCandidate: 0,
        name: "Assessment",
    },
    {
        numOfCandidate: 0,
        name: "Interview",
    },
    {
        numOfCandidate: 0,
        name: "Offer",
    },
];

interface JobCardProps {
    data: IJobDto;
}

const JobCard: React.FC<JobCardProps> = ({
    data: { title, area, status, id, assessmentFlowId },
}) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const { data: flowRes } = useQuery({
        queryKey: ["getOneAssessmentFlow", assessmentFlowId],
        queryFn: () => {
            return assessmentFlowId
                ? assessmentFlowsServices.getByIdAsync(assessmentFlowId)
                : null;
        },
    });
    const publishJobMutations = useMutation({
        mutationKey: [`publish-job-${id}`],
        mutationFn: (id: string) => jobServices.publishJobAsync(id),
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

    const handlePublishJob = async (id: string) => {
        setIsLoading(true);
        await publishJobMutations.mutateAsync(id);
        setIsLoading(false);
    };

    return (
        <div className="w-full p-6 bg-white shadow-md rounded-lg">
            <div className="w-full flex  items-center justify-between mb-6">
                <div className="flex  flex-wrap sm:flex-nowrap items-start sm:items-center sm:flex-row gap-3">
                    <Link
                        href={`backend/jobs/${id}/hiring-process/applied`}
                        className="text-blue_primary_700 text-xl font-medium whitespace-nowrap hover:underline"
                    >
                        {title}
                    </Link>
                    <span className="text-sm text-neutral-500 whitespace-nowrap">
                        {area}
                    </span>
                </div>
                <div className="flex gap-4 items-center">
                    <button
                        type="button"
                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-4 py-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 hidden md:block"
                        onClick={handlePublishJob.bind(null, id)}
                    >
                        {isLoading && <SpinLoading className="mr-2" />}Publish
                    </button>
                    <button
                        type="button"
                        className="group"
                        onClick={() => router.push(`backend/jobs/${id}/edit`)}
                    >
                        <EllipsisVertical className="w-5 h-5 group-hover:w-6 group-hover:h-6 transition-all" />
                    </button>
                </div>
            </div>
            <ul className="hidden w-full md:flex items-center justify-around mt-2 mb-6">
                {flowRes &&
                    flowRes.data.assessments?.map((assessment, index) => (
                        <li
                            key={assessment.id}
                            className="w-full flex flex-col items-center border-r border-gray-300 last:border-none p-4"
                        >
                            <h4 className="text-xl font-medium text-neutral-700 mb-2">
                                0
                            </h4>
                            <p className="text-neutral-500">
                                {assessment.name}
                            </p>
                        </li>
                    ))}
            </ul>
            <div className="w-full flex justify-between">
                <div className="hidden sm:block">
                    <span className="text-neutral-500 text-sm">{status}</span>
                </div>
                <div className="flex gap-5">
                    <span className="text-blue_primary_700 text-sm">
                        Candidates:{" "}
                        {arrs
                            .map(item => item.numOfCandidate)
                            .reduce(
                                (accumulator, currentValue) =>
                                    accumulator + currentValue
                            )}
                    </span>
                    <span className="text-green-500 text-sm">
                        In progress:{" "}
                        {arrs
                            .filter(item => item.name !== "Inbox")
                            .map(item => item.numOfCandidate)
                            .reduce(
                                (accumulator, currentValue) =>
                                    accumulator + currentValue
                            )}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default JobCard;
