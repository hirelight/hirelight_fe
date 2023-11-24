import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Metadata } from "next";
import { cookies } from "next/headers";
import React from "react";

import getQueryClient from "@/utils/react-query/getQueryClient";
import { checkResErr } from "@/helpers";

import ReviewMediation from "./components/ReviewMediation";

export const metadata: Metadata = {
    title: "Review Assessment Answer",
};
const fetchMyAssessmentById = async (id: string) => {
    const token = cookies().get("hirelight_access_token");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/applicant-assessment-details/canidate/${id}`,
        {
            method: "GET",
            cache: "no-store",
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

    checkResErr(jsonRes);

    return jsonRes;
};

const ReviewPage = async ({ params }: any) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: [`my-assessment-${params.assessmentId}`],
        queryFn: () => fetchMyAssessmentById(params.assessmentId),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ReviewMediation />
        </HydrationBoundary>
    );
};

export default ReviewPage;
