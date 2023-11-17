"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import applicantProfileServices from "@/services/applicant-profile/applicant-profile.service";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setCandidates } from "@/redux/slices/candidates.slice";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";

import CandidateCard from "../CandidateCard/CandidateCard";

const CandidateList = ({}: any) => {
    const { jobId, assessmentId } = useParams();
    const dispatch = useAppDispatch();
    const { data: applicantDetail, isSuccess } = useQuery({
        queryKey: [`job-${jobId}-profiles`, assessmentId],
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
        }
    }, [isSuccess, dispatch, applicantDetail]);

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
