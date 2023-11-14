"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { fetchAssessmentById } from "@/redux/thunks/assessment.thunk";
import LoadingIndicator from "@/components/LoadingIndicator";
import assessmentsServices from "@/services/assessments/assessments.service";
import { setAssessment } from "@/redux/slices/assessment.slice";

const AssesmentDetailWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { assessmentId } = useParams();

    const dispatch = useAppDispatch();
    const { loading, data } = useAppSelector(state => state.assessment);
    const { data: queryData, isLoading } = useQuery({
        queryKey: [`assessment-${assessmentId}`],
        queryFn: () => assessmentsServices.getById(assessmentId as string),
    });

    useEffect(() => {
        if (queryData) dispatch(setAssessment(queryData.data));
    }, [queryData, dispatch]);

    if (isLoading || data.id === "")
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );

    return <>{children}</>;
};

export default AssesmentDetailWrapper;
