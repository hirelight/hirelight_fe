import { Metadata } from "next";
import { cookies } from "next/headers";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { checkResErr } from "@/helpers";
import getQueryClient from "@/utils/react-query/getQueryClient";

import AssessmentMediation from "./components/AssessmentMediation";

export const metadata: Metadata = {
    title: "Assessment",
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

const AssessmentPage = async ({ params }: any) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: [`my-assessment`, params.assessmentId],
        queryFn: () => fetchMyAssessmentById(params.assessmentId),
    });
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <AssessmentMediation />
        </HydrationBoundary>
    );
};

export default AssessmentPage;
