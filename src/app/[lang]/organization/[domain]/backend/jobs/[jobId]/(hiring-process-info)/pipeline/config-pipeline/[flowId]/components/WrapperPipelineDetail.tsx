"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { fetchAssessmentFlowById } from "@/redux/thunks/assessment-flow.thunk";

const WrapperPipelineDetail = ({ children }: { children: React.ReactNode }) => {
    const { flowId } = useParams();

    const dispatch = useAppDispatch();
    const { data, loading } = useAppSelector(state => state.assessmentFlow);

    useEffect(() => {
        if (flowId && !data.id)
            dispatch(fetchAssessmentFlowById(parseInt(flowId as string)));
    }, [flowId, dispatch, data.id]);

    if (loading || !data.id)
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );
    return <React.Fragment>{children}</React.Fragment>;
};

export default WrapperPipelineDetail;
