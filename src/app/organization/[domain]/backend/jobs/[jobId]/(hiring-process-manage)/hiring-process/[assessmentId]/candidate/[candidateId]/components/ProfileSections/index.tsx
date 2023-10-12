"use client";

import { useParams } from "next/navigation";
import React from "react";

import styles from "./styles.module.scss";
import ProfileSection from "./ProfileSection";

enum ProfileTab {
    PROFILE = "Profile",
    TIMELINE = "Timeline",
    COMMUNICATION = "Communication",
}

const ProfileSections = () => {
    const { assessmentId, candidateId } = useParams();

    const [profileTab, setProfileTab] = React.useState<ProfileTab>(
        ProfileTab.PROFILE
    );

    return (
        <div className="rounded-md border border-gray-300 bg-white">
            <div
                role="tablist"
                className="p-4 xl:px-6 flex items-center gap-8 bg-slate-200"
            >
                {(Object.keys(ProfileTab) as (keyof typeof ProfileTab)[]).map(
                    key => (
                        <button
                            role="tab"
                            type="button"
                            key={key}
                            className={styles.profile__tab__btn}
                            onClick={() => setProfileTab(ProfileTab[key])}
                        >
                            <span
                                className={`${styles.profile__tab__text} ${
                                    profileTab === ProfileTab[key]
                                        ? styles.active
                                        : ""
                                }`}
                            >
                                {ProfileTab[key]}
                            </span>
                        </button>
                    )
                )}
            </div>
            <div className="p-4 xl:p-6">
                <ProfileSection />
            </div>
        </div>
    );
};

export default ProfileSections;
