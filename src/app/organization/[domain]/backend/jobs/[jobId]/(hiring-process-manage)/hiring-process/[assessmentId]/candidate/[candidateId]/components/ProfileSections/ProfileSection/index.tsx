"use client";

import React from "react";

import { PdfViewer } from "@/components";

import { profileDatas } from "./data";
import styles from "./styles.module.scss";
import WorkExperienceSection from "./components/WorkExperienceSection";
import EducationSection from "./components/EducationSection";
import CoverLetterSection from "./components/CoverLetterSection";
import ContactSection from "./components/ContactSection";

const ProfileSection = () => {
    const [profileTab, setProfileTab] = React.useState(0);

    return (
        <div className="">
            {profileDatas.questions.length > 0 && (
                <div role="tablist" className="w-full border-b border-gray-300">
                    <button
                        type="button"
                        role="tab"
                        onClick={() => setProfileTab(0)}
                        className={`${styles.profile__tab__btn} ${
                            profileTab === 0 ? styles.active : ""
                        }`}
                    >
                        <span>Details</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        onClick={() => setProfileTab(1)}
                        className={`${styles.profile__tab__btn} ${
                            profileTab === 1 ? styles.active : ""
                        }`}
                    >
                        <span>Answers</span>
                    </button>
                </div>
            )}
            {profileTab === 0 && (
                <div>
                    <div className="py-6 border-b border-gray-300">
                        <CoverLetterSection
                            content={profileDatas.cover_letter}
                        />
                    </div>

                    <div className="py-6 border-b border-gray-300">
                        <div className="mb-6">
                            <strong className="text-sm text-neutral-600 uppercase">
                                Summary
                            </strong>
                        </div>
                        <div>
                            <p className="text-sm text-neutral-500">
                                {profileDatas.summary}
                            </p>
                        </div>
                    </div>
                    <div className="py-6 border-b border-gray-300">
                        <WorkExperienceSection
                            datas={profileDatas.experience}
                        />
                    </div>
                    <div className="py-6 border-b border-gray-300">
                        <EducationSection datas={profileDatas.education} />
                    </div>
                    <div className="py-6 border-b border-gray-300">
                        <div className="mb-6">
                            <strong className="text-sm text-neutral-600 uppercase">
                                Resume
                            </strong>
                        </div>
                        <div>
                            <PdfViewer />
                        </div>
                    </div>
                    <div className="py-6">
                        <ContactSection
                            email={profileDatas.email}
                            phone={profileDatas.phone}
                            address={profileDatas.address}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileSection;
