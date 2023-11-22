import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import endpoints from "@/utils/constants/service-endpoint";
import getQueryClient from "@/utils/react-query/getQueryClient";

import ProfileHeader from "./components/ProfileHeader";
import CandidateActionTabs from "./components/CandidateActionTab/CandidateActionTabs";
import ProfileSection from "./components/ProfileSections";
import CandidateDetailWrapper from "./components/CandidateDetailWrapper";

export const metadata: Metadata = {
    title: "Hirelight - FPT",
};

const fetchApplicationAssessmentDetail = async (id: string) => {
    const token = cookies().get("hirelight_access_token");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}${endpoints.APPLICANT_ASSESSMENT_DETAILS}/employee/applicant-profile/${id}`,
        {
            method: "GET",
            headers: {
                mode: "cors",
                credentials: "same-origin",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token!!.value}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const jsonRes = await res.json();

    return jsonRes;
};

const HiringProcessCandidate = async ({ params }: any) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["applicant-assessment-detail", params.candidateId],
        queryFn: () => fetchApplicationAssessmentDetail(params.candidateId),
    });
    return (
        <div className="w-full min-h-screen mb-10 relative">
            <HydrationBoundary state={dehydrate(queryClient)}>
                <CandidateDetailWrapper>
                    <CandidateActionTabs />
                    <ProfileHeader />
                    <ProfileSection />
                </CandidateDetailWrapper>
            </HydrationBoundary>
        </div>
    );
};

export default HiringProcessCandidate;
