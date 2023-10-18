import React from "react";
import { Metadata } from "next";

import styles from "./styles.module.scss";
import ProfileSection from "./components/ProfileSection";
import IdentitySection from "./components/IdentitySection";

export const metadata: Metadata = {
    title: "Hirelight - Edit Account - Hirelight",
};

const OrganizationProfile = () => {
    return (
        <div className="w-full flex flex-col gap-8">
            <ProfileSection />

            <IdentitySection />
        </div>
    );
};

export default OrganizationProfile;
