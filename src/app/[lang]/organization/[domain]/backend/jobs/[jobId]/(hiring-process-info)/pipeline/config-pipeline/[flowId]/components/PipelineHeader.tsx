"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { useAppSelector } from "@/redux/reduxHooks";
import { JobPostStatus } from "@/interfaces/job-post.interface";

const PipelineHeader = () => {
    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);
    const router = useRouter();
    const job = useAppSelector(state => state.job.data);

    const handleNavigate = () => {
        if (job.status === JobPostStatus.ACTIVE)
            return toast.error(
                "Job is publish! Please unpublish job before edit"
            );
        router.push(`${assessmentFlow.id}/edit`);
    };

    return (
        <div className="flex justify-between items-center mb-4 px-4 xl:px-6">
            <h3 className="flex-1 text-lg font-medium text-neutral-700">
                {assessmentFlow.name}
            </h3>
            <button
                type="button"
                className="text-sm font-medium hover:underline"
                onClick={handleNavigate}
            >
                Edit pipeline
            </button>
        </div>
    );
};

export default PipelineHeader;
