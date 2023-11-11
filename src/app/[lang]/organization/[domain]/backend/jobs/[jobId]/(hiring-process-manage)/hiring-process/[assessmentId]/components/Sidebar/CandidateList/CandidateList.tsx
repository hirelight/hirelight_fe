"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import applicantProfileServices from "@/services/applicant-profile/applicant-profile.service";

import CandidateCard from "../CandidateCard/CandidateCard";

const CandidateList = ({}: any) => {
    const { jobId } = useParams();
    const { data: profileRes } = useQuery({
        queryKey: [`job-${jobId}-profiles`],
        queryFn: () =>
            applicantProfileServices.getJobPostProfiles(jobId as string),
    });

    return (
        <ul className="bg-white min-h-[200px]">
            {profileRes?.data?.map(profile => (
                <li
                    key={profile.candidateId}
                    className="bg-white border-b border-gray-300 last:border-none hover:bg-blue_primary_100"
                >
                    <CandidateCard profile={profile} />
                </li>
            ))}
        </ul>
    );
};

export default CandidateList;
