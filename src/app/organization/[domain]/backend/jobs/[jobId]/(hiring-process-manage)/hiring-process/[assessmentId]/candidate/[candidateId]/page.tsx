"use client";

import { useParams } from "next/navigation";
import React from "react";

import ProfileHeader from "./components/ProfileHeader";
import CandidateActionTabs from "./components/CandidateActionTab/CandidateActionTabs";
import ProfileSection from "./components/ProfileSections";

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
