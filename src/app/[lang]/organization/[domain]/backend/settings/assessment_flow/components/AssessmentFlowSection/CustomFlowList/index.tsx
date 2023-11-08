"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import assessmentFlowTemplatesServices from "@/services/assessment-flow-templates/assessment-flow-templates.service";

import CustomFlowCard from "./CustomFlowCard";

const CustomFlowList = () => {
    const { data, error } = useQuery({
        queryKey: ["assessment-flow-templates"],
        queryFn: assessmentFlowTemplatesServices.getListAsync,
    });

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
