"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { getProfileById } from "@/redux/thunks/applicant-profile.thunk";
import { getAppDetailByProfileId } from "@/redux/thunks/applicant-assessment-detail.slice.thunk";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { setApplicantDetail } from "@/redux/slices/applicant-assessment-detail.slice";

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
    const {
        data: appProfileDetailRes,
        isSuccess,
        isLoading,
    } = useQuery({
        queryKey: ["applicant-assessment-detail", candidateId],
        queryFn: () =>
            applicantAssessmentDetailServices.getAppAssDetailByProfileId(
                candidateId as string
            ),
    });

    useEffect(() => {
        if (appProfileDetailRes)
            dispatch(setApplicantDetail(appProfileDetailRes.data));
    }, [appProfileDetailRes, dispatch]);

    if (isLoading || !isSuccess || !data)
        return <CanididateProfileLoadingSkeleton />;

    return <>{children}</>;
};

export default CandidateDetailWrapper;
