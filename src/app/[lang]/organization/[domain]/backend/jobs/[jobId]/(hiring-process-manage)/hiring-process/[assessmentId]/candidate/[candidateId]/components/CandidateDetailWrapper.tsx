"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { setApplicantDetail } from "@/redux/slices/applicant-assessment-detail.slice";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import CanididateProfileLoadingSkeleton from "./CanididateProfileLoadingSkeleton";

const CandidateDetailWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { candidateId, lang, jobId, assessmentId } = useParams();
    const router = useRouter();

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
        if (appProfileDetailRes) {
            if (
                appProfileDetailRes.data.status ===
                ApplicantAssessmentDetailStatus.MOVED
            ) {
                router.push(
                    `/${lang}/backend/jobs/${jobId}/hiring-process/${assessmentId}`
                );
            } else {
                dispatch(setApplicantDetail(appProfileDetailRes.data));
            }
        }
    }, [appProfileDetailRes, assessmentId, dispatch, jobId, lang, router]);

    if (isLoading || !isSuccess || !data)
        return <CanididateProfileLoadingSkeleton />;

    return <>{children}</>;
};

export default CandidateDetailWrapper;
