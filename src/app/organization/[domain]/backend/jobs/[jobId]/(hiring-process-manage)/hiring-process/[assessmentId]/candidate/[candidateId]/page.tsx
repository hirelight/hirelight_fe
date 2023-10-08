import React from "react";
import { Metadata } from "next";

import { delayFunc } from "@/helpers/shareHelpers";

import ProfileHeader from "./components/ProfileHeader";
import CandidateActionTabs from "./components/CandidateActionTab/CandidateActionTabs";
import ProfileSection from "./components/ProfileSections";

export const metadata: Metadata = {
    title: "Hirelight - FPT",
};

const HiringProcessCandidate = () => {
    return (
        <div className="w-full min-h-screen mb-10 relative">
            <CandidateActionTabs />
            <ProfileHeader />
            <ProfileSection />
        </div>
    );
};

export default HiringProcessCandidate;
