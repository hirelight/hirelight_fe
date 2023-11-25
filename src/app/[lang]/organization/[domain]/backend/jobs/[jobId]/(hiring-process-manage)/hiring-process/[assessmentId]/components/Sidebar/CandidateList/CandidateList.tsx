"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

import { useAppDispatch } from "@/redux/reduxHooks";
import { setCandidates } from "@/redux/slices/candidates.slice";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";

import CandidateCard from "../CandidateCard/CandidateCard";

const CandidateList = ({}: any) => {
    const { jobId, assessmentId, candidateId } = useParams();
    const router = useRouter();

    const dispatch = useAppDispatch();
    const { data: applicantDetail, isSuccess } = useQuery({
        queryKey: [`job-profiles`, jobId, assessmentId],
        queryFn: () =>
            assessmentId === "all"
                ? applicantAssessmentDetailServices.employeeGetJobPostProfile(
                      jobId as string
                  )
                : applicantAssessmentDetailServices.employeeApplicantDetailByAssessmentId(
                      assessmentId as string
                  ),
    });

    useEffect(() => {
        if (isSuccess && applicantDetail) {
            dispatch(setCandidates(applicantDetail.data));
            if (!candidateId && applicantDetail.data.length) {
                router.push(
                    `${assessmentId}/candidate/${applicantDetail.data[0].applicantProfileId}`
                );
            }
        }
    }, [
        isSuccess,
        dispatch,
        applicantDetail,
        candidateId,
        router,
        assessmentId,
    ]);

    return (
        <ul className="bg-white">
            {applicantDetail?.data?.map(profile => (
                <li
                    key={profile.applicantProfile.candidateId}
                    className="bg-white border-b border-gray-300 last:border-none hover:bg-blue_primary_100"
                >
                    <CandidateCard profile={profile} />
                </li>
            ))}
        </ul>
    );
};

export default CandidateList;
