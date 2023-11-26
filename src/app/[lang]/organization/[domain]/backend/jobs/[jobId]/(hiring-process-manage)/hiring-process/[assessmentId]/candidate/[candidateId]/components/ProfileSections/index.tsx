"use client";

import { useParams } from "next/navigation";
import React from "react";
import { Tab } from "@headlessui/react";

import styles from "./styles.module.scss";
import ProfileSection from "./ProfileSection";
import ReviewSection from "./ReviewSection";
import MeetingSection from "./MeetingSection";

enum ProfileTab {
    PROFILE = "Profile",
    REVIEW = "Review",
    MEETING = "Meetings",
}

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const ProfileSections = () => {
    const { assessmentId, candidateId } = useParams();

    const [profileTab, setProfileTab] = React.useState<ProfileTab>(
        ProfileTab.PROFILE
    );

    return (
        <div className="rounded-md border border-gray-300 bg-white">
            <Tab.Group>
                <Tab.List className="p-4 xl:px-6 flex items-center gap-8">
                    {(
                        Object.keys(ProfileTab) as (keyof typeof ProfileTab)[]
                    ).map(key => (
                        <Tab
                            key={key}
                            className={({ selected }) =>
                                classNames(
                                    styles.profile__tab__btn,
                                    selected ? styles.active : ""
                                )
                            }
                            onClick={() => setProfileTab(ProfileTab[key])}
                        >
                            {ProfileTab[key]}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="p-4 xl:p-6">
                    <Tab.Panel>
                        <ProfileSection />
                    </Tab.Panel>
                    <Tab.Panel>
                        <ReviewSection />
                    </Tab.Panel>
                    <Tab.Panel>
                        <MeetingSection />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ProfileSections;
