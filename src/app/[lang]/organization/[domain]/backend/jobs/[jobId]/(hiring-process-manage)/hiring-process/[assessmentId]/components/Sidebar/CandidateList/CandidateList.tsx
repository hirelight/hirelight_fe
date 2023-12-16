"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { useAppDispatch } from "@/redux/reduxHooks";
import { setCandidates } from "@/redux/slices/candidates.slice";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";

import CandidateCard from "../CandidateCard/CandidateCard";

type CandidateListProps = {
    disqualify: boolean;
};

const CandidateList = ({ disqualify }: CandidateListProps) => {
    const { jobId, assessmentId } = useParams();

    const dispatch = useAppDispatch();

    const {
        data: applicantDetail,
        isLoading,
        isFetching,
        isSuccess,
    } = useQuery({
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
        }
    }, [applicantDetail, dispatch, isSuccess]);

    if (isLoading) {
        return (
            <div className="bg-white">
                {new Array(4).fill("").map((_, index) => (
                    <div
                        key={index}
                        className="animate-pulse p-4 xl:px-6 flex items-start gap-3 border-b border-gray-300 last:border-none"
                    >
                        <div className="w-5 h-5 rounded bg-slate-200 mr-4"></div>

                        <div className="w-12 h-12 rounded-full bg-slate-200 mr-4"></div>

                        <div className="flex flex-col justify-between gap-4">
                            <div className="h-8 w-44 bg-slate-300"></div>
                            <div className="h-6 w-32 bg-slate-200"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <ul className="bg-white max-h-full overflow-y-auto">
            {applicantDetail?.data
                ?.filter(profile =>
                    disqualify
                        ? profile.applicantProfile.status === "DISQUALIFIED"
                        : profile.applicantProfile.status !== "DISQUALIFIED"
                )
                .sort((a, b) =>
                    a.assessment.assessmentTypeName !== "SOURCED_ASSESSMENT"
                        ? a.applicantProfile.keywordsMatch &&
                          b.applicantProfile.keywordsMatch &&
                          a.applicantProfile.keywordsMatch.split(",").length >
                              b.applicantProfile.keywordsMatch.split(",").length
                            ? 1
                            : -1
                        : 1
                )
                .map(profile => (
                    <li
                        key={profile.applicantProfile.candidateId}
                        className="bg-white border-b border-gray-300 last:border-none hover:bg-blue_primary_100"
                    >
                        <CandidateCard profile={profile} />
                    </li>
                ))}
            {isFetching && (
                <>
                    {new Array(2).fill("").map((_, index) => (
                        <li
                            key={index}
                            className="animate-pulse p-4 xl:px-6 flex items-start gap-3 border-b border-gray-300 last:border-none"
                        >
                            <div className="w-5 h-5 rounded bg-slate-200 mr-4"></div>

                            <div className="w-12 h-12 rounded-full bg-slate-200 mr-4"></div>

                            <div className="flex flex-col justify-between gap-4">
                                <div className="h-8 w-44 bg-slate-300"></div>
                                <div className="h-6 w-32 bg-slate-200"></div>
                            </div>
                        </li>
                    ))}
                </>
            )}
        </ul>
    );
};

export default CandidateList;
