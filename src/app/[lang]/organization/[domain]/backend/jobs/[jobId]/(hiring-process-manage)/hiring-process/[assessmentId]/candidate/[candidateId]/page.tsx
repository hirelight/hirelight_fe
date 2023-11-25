import React from "react";
import { Metadata } from "next";

import ProfileHeader from "./components/ProfileHeader";
import CandidateActionTabs from "./components/CandidateActionTab/CandidateActionTabs";
import ProfileSection from "./components/ProfileSections";
import CandidateDetailWrapper from "./components/CandidateDetailWrapper";

export const metadata: Metadata = {
    title: "Hirelight - FPT",
};

const HiringProcessCandidate = async () => {
    return (
        <div className="w-full min-h-screen mb-10 relative">
            <CandidateDetailWrapper>
                <CandidateActionTabs />
                <ProfileHeader />
                <ProfileSection />
            </CandidateDetailWrapper>
        </div>
    );
};

export default HiringProcessCandidate;
