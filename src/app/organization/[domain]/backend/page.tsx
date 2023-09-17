import React from "react";
import Image from "next/image";

import banner from "/public/images/interviewee_auth_bg.png";

import { Metadata } from "next";

import JobCard from "./components/JobCard";
import HiringStageBar from "./components/HiringStageBar";

export const metadata: Metadata = {
    title: "Hirelight Backend",
};

const Backend = () => {
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
                <div>
                    <JobCard
                        title="Frontend Dev"
                        isPublished={true}
                        location="District 9, Ho Chi Minh city, Ho Chi Minh"
                    />
                </div>
            </div>
        </main>
    );
};

export default Backend;
