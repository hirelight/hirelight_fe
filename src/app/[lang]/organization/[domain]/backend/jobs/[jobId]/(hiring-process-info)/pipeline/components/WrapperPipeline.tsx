"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";

import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { fetchAssessmentFlowById } from "@/redux/thunks/assessment-flow.thunk";

const WrapperPipeline = ({ children }: { children: React.ReactNode }) => {
    const { flowId } = useParams();

    const dispatch = useAppDispatch();
    const { loading, data } = useAppSelector(state => state.assessmentFlow);
    useEffect(() => {
        if (flowId && !data.id)
            dispatch(fetchAssessmentFlowById(parseInt(flowId as string)));
    }, [flowId, dispatch, data.id]);
    if (loading)
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );
    return <React.Fragment>{children}</React.Fragment>;
};

export default WrapperPipeline;
