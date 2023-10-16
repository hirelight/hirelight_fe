import React from "react";

import styles from "./styles.module.scss";
import ProfileSection from "./components/ProfileSection";
import IdentitySection from "./components/IdentitySection";

const OrganizationProfile = () => {
    return (
        <div className="w-full flex flex-col gap-8">
            <ProfileSection />

            <IdentitySection />
        </div>
    );
};

export default OrganizationProfile;
