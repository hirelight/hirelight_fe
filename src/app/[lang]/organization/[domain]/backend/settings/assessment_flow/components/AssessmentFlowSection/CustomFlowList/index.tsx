"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import assessmentFlowTemplatesServices from "@/services/assessment-flow-templates/assessment-flow-templates.service";

import CustomFlowCard from "./CustomFlowCard";

const CustomFlowList = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["assessment-flow-templates"],
        queryFn: assessmentFlowTemplatesServices.getListAsync,
    });

    if (isLoading) return <CustomFlowListSkeleton />;

    return (
        <ul className="flex flex-col gap-4">
            {data?.data?.map(assessmentFlow => (
                <li key={assessmentFlow.name}>
                    <CustomFlowCard
                        data={{
                            ...assessmentFlow,
                            assessments: JSON.parse(assessmentFlow.content),
                        }}
                    />
                </li>
            ))}
        </ul>
    );
};

export default CustomFlowList;

const CustomFlowListSkeleton = () => {
    return (
        <ul className="space-y-4">
            {new Array(3).fill("").map((_, index) => (
                <li
                    key={index}
                    className="px-4 py-6 bg-gray-100 flex items-center"
                >
                    <div className="w-6 h-6 rounded bg-slate-200 mr-4"></div>
                    <div className="h-6 w-32 rounded bg-slate-300"></div>
                </li>
            ))}
        </ul>
    );
};
