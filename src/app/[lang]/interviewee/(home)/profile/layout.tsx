import Image from "next/image";
import React from "react";

import background from "/public/images/interviewee_auth_bg.png";

import dynamic from "next/dynamic";

import { DoubleRingLoading } from "@/components";

import Sidebar from "./components/Sidebar";
import MenuFloat from "./components/MenuFloat";

const IntervieweeAuthWrapper = dynamic(
    () => import("../../components/IntervieweeAuthWrapper"),
    {
        ssr: false,
        loading: () => (
            <div className="flex-1 flex justify-center items-center">
                <DoubleRingLoading className="w-32 h-32" />
            </div>
        ),
    }
);

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <IntervieweeAuthWrapper>
            <div className="relative">
                <div className="w-full max-h-[240px] overflow-hidden opacity-40 absolute top-0 left-0 right-0">
                    <Image
                        alt="background"
                        src={background}
                        className="w-full h-auto object-cover"
                    />
                </div>
                <main className="relative max-w-screen-xl mx-auto flex gap-8 py-20">
                    <MenuFloat />
                    <Sidebar />
                    <div className="flex-1">{children}</div>
                </main>
            </div>
        </IntervieweeAuthWrapper>
    );
};

export default ProfileLayout;
