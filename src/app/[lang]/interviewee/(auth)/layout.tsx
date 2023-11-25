import React from "react";
import dynamic from "next/dynamic";

import { DoubleRingLoading } from "@/components";

import HeaderBar from "./components/HeaderBar";

const IntervieweeAuthWrapper = dynamic(
    () => import("../components/IntervieweeAuthWrapper"),
    {
        ssr: false,
        loading: () => (
            <div className="w-screen h-screen justify-center pt-[30%]">
                <DoubleRingLoading className="w-32 h-32" />
            </div>
        ),
    }
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-screen flex flex-col md:overflow-hidden">
            <HeaderBar />
            <IntervieweeAuthWrapper>{children}</IntervieweeAuthWrapper>
        </div>
    );
};

export default AuthLayout;
