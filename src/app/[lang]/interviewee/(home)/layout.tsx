import React from "react";
import dynamic from "next/dynamic";

import { DoubleRingLoading } from "@/components";

import HeaderBar from "./components/HeaderBar";

const IntervieweeAuthWrapper = dynamic(
    () => import("../components/IntervieweeAuthWrapper"),
    {
        ssr: false,
        loading: () => (
            <div className="flex-1 flex justify-center items-center">
                <DoubleRingLoading className="w-32 h-32" />
            </div>
        ),
    }
);

const IntervieweeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <IntervieweeAuthWrapper>
                <HeaderBar />
                {children}
            </IntervieweeAuthWrapper>
        </div>
    );
};

export default IntervieweeLayout;
