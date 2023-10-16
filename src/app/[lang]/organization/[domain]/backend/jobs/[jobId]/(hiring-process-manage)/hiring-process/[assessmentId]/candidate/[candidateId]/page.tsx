import React from "react";
import { Metadata } from "next";

import ProfileHeader from "./components/ProfileHeader";
import CandidateActionTabs from "./components/CandidateActionTab/CandidateActionTabs";
import ProfileSection from "./components/ProfileSections";
import CanididateProfileLoadingSkeleton from "./components/CanididateProfileLoadingSkeleton";

export const metadata: Metadata = {
    title: "Hirelight - FPT",
};

const HiringProcessCandidate = () => {
    const isLoading = false;

    if (isLoading) return <CanididateProfileLoadingSkeleton />;
    return (
        <div className="w-full min-h-screen mb-10 relative">
            <CandidateActionTabs />
            <ProfileHeader />
            <ProfileSection />
        </div>
    );
};

export default HiringProcessCandidate;
