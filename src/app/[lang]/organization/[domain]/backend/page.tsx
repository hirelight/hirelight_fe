import React from "react";
import Image from "next/image";

import banner from "/public/images/interviewee_auth_bg.png";

import { Metadata } from "next";
import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";

import endpoints from "@/utils/constants/service-endpoint";
import { IJobDto } from "@/services/job/job.interface";
import { checkResErr } from "@/helpers/resErrHelpers";

import JobCard from "./components/JobCard";
import HiringStageBar from "./components/HiringStageBar";

export const metadata: Metadata = {
    title: "Hirelight Backend",
};

const getJobList = async (): Promise<IJobDto[]> => {
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

    return jsonRes.data;
};

const Backend = async () => {
    const datas = await getJobList();

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
                <HiringStageBar />
                <ul className="space-y-6">
                    {datas.map(job => (
                        <li key={job.id}>
                            <JobCard data={job} />
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
};

export default Backend;
