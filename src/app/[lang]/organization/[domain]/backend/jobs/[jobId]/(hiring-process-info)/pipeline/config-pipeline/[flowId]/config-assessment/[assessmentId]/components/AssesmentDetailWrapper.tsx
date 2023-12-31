"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { fetchAssessmentById } from "@/redux/thunks/assessment.thunk";
import LoadingIndicator from "@/components/LoadingIndicator";

const AssesmentDetailWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { assessmentId } = useParams();

    const dispatch = useAppDispatch();
    const { loading, data } = useAppSelector(state => state.assessment);

    useEffect(() => {
        dispatch(fetchAssessmentById(assessmentId as string));
    }, [dispatch, assessmentId]);

    if (loading || !data.id)
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );

    return <>{children}</>;
};

export default AssesmentDetailWrapper;
