"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { getProfileById } from "@/redux/thunks/applicant-profile.thunk";
import { getAppDetailByProfileId } from "@/redux/thunks/applicant-assessment-detail.slice.thunk";

import CanididateProfileLoadingSkeleton from "./CanididateProfileLoadingSkeleton";

const CandidateDetailWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { candidateId } = useParams();

    const dispatch = useAppDispatch();
    const { loading, data } = useAppSelector(
        state => state.applicantAssessmentDetail
    );

    useEffect(() => {
        if (candidateId)
            dispatch(getAppDetailByProfileId(candidateId as string));
    }, [candidateId, dispatch]);

    if (loading || !data) return <CanididateProfileLoadingSkeleton />;

    return <>{children}</>;
};

export default CandidateDetailWrapper;
