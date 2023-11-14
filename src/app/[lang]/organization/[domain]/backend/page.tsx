import React from "react";
import Image from "next/image";

import banner from "/public/images/interviewee_auth_bg.png";

import { Metadata } from "next";
import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

import endpoints from "@/utils/constants/service-endpoint";
import { IJobDto } from "@/services/job/job.interface";
import { checkResErr } from "@/helpers/resErrHelpers";
import getQueryClient from "@/utils/react-query/getQueryClient";
import { IResponse } from "@/interfaces/service.interface";

import JobList from "./components/JobList";

export const metadata: Metadata = {
    title: "Hirelight Backend",
};

const getJobList = async (): Promise<IResponse<IJobDto[]>> => {
    const token = cookies().get("hirelight_access_token")!!.value;
    const decoded: any = jwtDecode(token);
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}${endpoints.JOBPOSTS}/search?OrganizationId=${decoded.organizationId}`,
        {
            method: "GET",
            headers: {
                mode: "cors",
                credentials: "same-origin",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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

const Backend = async () => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["jobs"],
        queryFn: getJobList,
    });

    return (
        <main className="relative">
            <div className="w-full max-h-[160px] overflow-hidden opacity-60">
                <Image
                    alt="banner background"
                    src={banner}
                    className="h-auto w-full object-cover"
                />
            </div>
            <div className="max-w-screen-xl mx-auto px-4">
                <HydrationBoundary state={dehydrate(queryClient)}>
                    <JobList />
                </HydrationBoundary>
            </div>
        </main>
    );
};

export default Backend;
