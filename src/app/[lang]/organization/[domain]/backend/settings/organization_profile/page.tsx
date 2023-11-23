import React from "react";
import { Metadata } from "next";

import styles from "./styles.module.scss";
import ProfileSection from "./components/ProfileSection";
import IdentitySection from "./components/IdentitySection";
import OrgProfileForm from "./components/OrgProfileForm";

export const metadata: Metadata = {
    title: "Hirelight - Edit Account - Hirelight",
};

const OrganizationProfile = () => {
    return (
        <div className="w-full flex flex-col gap-8">
            <OrgProfileForm>
                <ProfileSection />

                <IdentitySection />
            </OrgProfileForm>
        </div>
    );
};

export default OrganizationProfile;
