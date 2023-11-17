import React from "react";
import { cookies } from "next/headers";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import { checkResErr } from "@/helpers";
import getQueryClient from "@/utils/react-query/getQueryClient";

import NotificationList from "./components/NotificationList";

const fetchMyAssessments = async () => {
    const token = cookies().get("hirelight_access_token");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}/applicant-assessment-details/candidate/me`,
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

const InterviewNotificationsPage = async ({ params }: any) => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: [`my-assessments-${params.applicantId}`],
        queryFn: fetchMyAssessments,
    });

    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <NotificationList />
            </HydrationBoundary>
        </div>
    );
};

export default InterviewNotificationsPage;
