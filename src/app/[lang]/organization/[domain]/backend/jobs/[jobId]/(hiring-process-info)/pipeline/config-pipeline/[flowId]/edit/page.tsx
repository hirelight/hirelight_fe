"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";

import AssessmentFlowForm from "./components/AssessmentFlowForm";

type EditFlowPageProps = {};

const EditFlowPage: React.FC<EditFlowPageProps> = ({ params }: any) => {
    const { flowId, lang, jobId } = params;
    const { data: flowRes } = useQuery({
        queryKey: ["assessmentFlow", flowId],
        queryFn: () => assessmentFlowsServices.getByIdAsync(flowId),
    });
    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <h3 className="flex-1 text-lg font-medium text-neutral-700 mb-4 px-6">
                    {flowRes?.data.name ?? ""}
                </h3>
            </div>
            <div className="bg-white py-6 drop-shadow-md rounded-md">
                <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                    {flowRes?.data.name ?? ""}
                </h2>

                {flowRes && (
                    <AssessmentFlowForm
                        data={{
                            id: flowRes.data.id,
                            name: flowRes.data.name,
                            startTime: flowRes.data.startTime,
                            endTime: flowRes.data.endTime,
                            assessments: flowRes.data.assessments.map(item => ({
                                name: item.name,
                                id: item.id,
                                assessmentType: item.assessmentTypeName,
                            })),
                        }}
                    />
                )}
            </div>
        </React.Fragment>
    );
};

export default EditFlowPage;
