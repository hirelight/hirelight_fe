"use client";

import Link from "next/link";
import React from "react";

import { useAppSelector } from "@/redux/reduxHooks";

const PipelineHeader = () => {
    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);

    return (
        <div className="flex justify-between items-center mb-4 px-4 xl:px-6">
            <h3 className="flex-1 text-lg font-medium text-neutral-700">
                {assessmentFlow.name}
            </h3>
            <Link
                href={`${assessmentFlow.id}/edit`}
                className="text-sm font-medium hover:underline"
            >
                Edit pipeline
            </Link>
        </div>
    );
};

export default PipelineHeader;
