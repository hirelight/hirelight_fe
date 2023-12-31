"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import { setAssessmentFlow } from "@/redux/slices/assessment-flow.slice";

const WrapperPipeline = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();

    const { assessmentFlowId } = useAppSelector(state => state.job.data);
    const {
        data: queryRes,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: [`assessmentFlow`, assessmentFlowId],
        queryFn: async () =>
            assessmentFlowsServices.getByIdAsync(assessmentFlowId!!),
    });

    useEffect(() => {
        if (isSuccess)
            dispatch(
                setAssessmentFlow({
                    ...queryRes.data,
                    startTime: new Date(queryRes.data.startTime),
                    endTime: new Date(queryRes.data.endTime),
                })
            );
    }, [isSuccess, queryRes, dispatch]);

    if (isLoading)
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );

    return <React.Fragment>{children}</React.Fragment>;
};

export default WrapperPipeline;
