import React from "react";
import Image from "next/image";

import banner from "/public/images/interviewee_auth_bg.png";

import { Metadata } from "next";
import { cookies } from "next/headers";
import jwtDecode from "jwt-decode";

import endpoints from "@/utils/constants/service-endpoint";
import { IJobDto } from "@/services/job/job.interface";
import { checkResErr } from "@/helpers/resErrHelpers";
import { IResponse } from "@/interfaces/service.interface";

import JobList from "./components/JobList";

export const metadata: Metadata = {
    title: "Hirelight Backend",
};

const Backend = async () => {
    return (
        <main className="relative">
            <div className="w-full max-h-[160px] overflow-hidden opacity-60">
                <Image
                    alt="banner background"
                    src={banner}
                    className="h-auto w-full object-cover"
                    priority
                />
            </div>
            <div className="max-w-screen-xl mx-auto px-4 pb-10">
                <JobList />
            </div>
        </main>
    );
};

export default Backend;
