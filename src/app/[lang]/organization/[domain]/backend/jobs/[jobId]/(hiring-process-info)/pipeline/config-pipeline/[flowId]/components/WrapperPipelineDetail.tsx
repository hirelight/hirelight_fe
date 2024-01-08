"use client";

import React, { useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { fetchAssessmentFlowById } from "@/redux/thunks/assessment-flow.thunk";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import { setAssessmentFlow } from "@/redux/slices/assessment-flow.slice";

import { defaultStage } from "./PipelineStages";

const WrapperPipelineDetail = ({ children }: { children: React.ReactNode }) => {
    const { flowId, assessmentId, jobId, lang } = useParams();
    const path = usePathname();
    const router = useRouter();

    const dispatch = useAppDispatch();
    const { data } = useAppSelector(state => state.assessmentFlow);
    const {
        data: flowRes,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: [`assessmentFlow`, flowId],
        queryFn: () => assessmentFlowsServices.getByIdAsync(flowId as string),
    });

    useEffect(() => {
        if (flowRes) {
            dispatch(
                setAssessmentFlow({
                    ...flowRes.data,
                    startTime: moment.utc(flowRes.data.startTime).toDate(),
                    endTime: moment.utc(flowRes.data.endTime).toDate(),
                })
            );
            if (
                path.split("/")[path.split("/").length - 2] ===
                "config-pipeline"
            ) {
                const getAssessment = flowRes.data.assessments.find(
                    item => !defaultStage.includes(item.assessmentTypeName)
                );
                if (getAssessment)
                    router.push(
                        `${flowId}/config-assessment/${getAssessment.id}`
                    );
            }
        }
    }, [flowRes, dispatch, assessmentId, router, flowId, path]);

    if (isLoading)
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );

    if (isError) {
        return (
            <div className="flex flex-col items-center justify-center p-52">
                <h3 className="text-2xl whitespace-nowrap mb-4">
                    You are not allowed to access this recruitment process
                </h3>
                <button
                    type="button"
                    className="text-lg text-blue_primary_600 hover:text-blue_primary_800 hover:underline"
                    onClick={() => {
                        router.back();
                    }}
                >
                    Back
                </button>
            </div>
        );
    }
    return <React.Fragment>{children}</React.Fragment>;
};

export default WrapperPipelineDetail;
