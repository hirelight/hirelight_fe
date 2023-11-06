"use client";

import React from "react";

import { PdfViewer } from "@/components";

import { profileDatas, profileLayout, candidateSection } from "./data";
import styles from "./styles.module.scss";

const ProfileSection = () => {
    const [profileTab, setProfileTab] = React.useState(0);

    return (
        <div className="">
            {profileDatas.questions.length > 0 && (
                <div
                    role="tablist"
                    className="w-full border-b border-gray-300 mb-6"
                >
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

            {candidateSection.map((section, index) => {
                return (
                    <div key={index}>
                        <strong className="text-sm text-neutral-600 uppercase mb-4">
                            {section.name.replace("_", " ")}
                        </strong>
                        {section.subsections.map((field, index) => {
                            let label = "";
                            let value: string = "";
                            // if (field.custom) {
                            //     const isExist =
                            //         profileDatas.custom_attributes.find(
                            //             customField =>
                            //                 customField.id === field.ref_id
                            //         );
                            //     if (isExist) {
                            //         label = isExist.label;
                            //         value =
                            //             typeof isExist.value === "string"
                            //                 ? isExist.value
                            //                 : "Not a string";
                            //     } else {
                            //         return null;
                            //     }
                            // } else {
                            //     label = field.title;
                            //     value =
                            //         typeof profileDatas[field.name] === "string"
                            //             ? profileDatas[field.name]
                            //             : null;
                            // }

                            return (
                                <div key={index} className="mb-4 text-sm">
                                    <div className="flex flex-col lg:flex-row">
                                        <div className="lg:basis-40 mr-6 text-neutral-500 flex gap-2">
                                            <span>{label}</span>
                                        </div>
                                        <div className="w-full flex flex-col gap-2 items-start text-neutral-600">
                                            <span>{value}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default ProfileSection;
