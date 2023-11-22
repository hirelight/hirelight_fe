"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { fetchAssessmentFlowById } from "@/redux/thunks/assessment-flow.thunk";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import { setAssessmentFlow } from "@/redux/slices/assessment-flow.slice";

import { defaultStage } from "./PipelineStages";

const WrapperPipelineDetail = ({ children }: { children: React.ReactNode }) => {
    const { flowId, assessmentId, jobId, lang } = useParams();
    const router = useRouter();

    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.assessmentFlow);
    const { data: flowRes, isLoading } = useQuery({
        queryKey: [`assessmentFlow`, flowId],
        queryFn: () => assessmentFlowsServices.getByIdAsync(flowId as string),
    });

    useEffect(() => {
        if (flowRes) {
            dispatch(
                setAssessmentFlow({
                    ...flowRes.data,
                    startTime: new Date(flowRes.data.startTime),
                    endTime: new Date(flowRes.data.endTime),
                })
            );
            if (!assessmentId) {
                router.push(
                    `${flowId}/config-assessment/${
                        flowRes.data.assessments.find(
                            item =>
                                !defaultStage.includes(item.assessmentTypeName)
                        )!!.id
                    }`
                );
            }
        }
    }, [flowRes, dispatch, assessmentId, router, flowId]);

    if (isLoading || !data.id)
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );
    return <React.Fragment>{children}</React.Fragment>;
};

export default WrapperPipelineDetail;
