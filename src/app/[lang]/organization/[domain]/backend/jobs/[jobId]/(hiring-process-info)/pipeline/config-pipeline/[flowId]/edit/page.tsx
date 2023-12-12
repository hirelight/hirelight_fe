"use client";

import React from "react";

import { useAppSelector } from "@/redux/reduxHooks";

import AssessmentFlowForm from "./components/AssessmentFlowForm";

type EditFlowPageProps = {};

const EditFlowPage: React.FC<EditFlowPageProps> = ({ params }: any) => {
    const { flowId } = params;
    const { data: flowRes } = useAppSelector(state => state.assessmentFlow);

    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <h3 className="flex-1 text-lg font-medium text-neutral-700 mb-4 px-6">
                    {flowRes.name}
                </h3>
            </div>
            <div className="bg-white py-6 drop-shadow-md rounded-md">
                <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                    {flowRes.name}
                </h2>

                {flowRes && (
                    <AssessmentFlowForm
                        data={{
                            id: flowId as string,
                            name: flowRes.name,
                            startTime: flowRes.startTime,
                            endTime: flowRes.endTime,
                            assessments: flowRes.assessments.map(item => ({
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
