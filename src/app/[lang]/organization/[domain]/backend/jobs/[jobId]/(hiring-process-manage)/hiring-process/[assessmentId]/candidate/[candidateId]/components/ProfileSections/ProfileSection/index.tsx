"use client";

import React, { useState } from "react";

import { PdfViewer } from "@/components";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { IAppFormTemplateProfileSection } from "@/interfaces/app-form-template.interface";
import { useAppSelector } from "@/redux/reduxHooks";
import { IAppFormSection } from "@/interfaces";

import { profileDatas, profileLayout, candidateSection } from "./data";
import styles from "./styles.module.scss";

const ProfileSection = () => {
    const [profileTab, setProfileTab] = React.useState(0);
    const [sections, setSections] = useState<IAppFormTemplateProfileSection[]>(
        []
    );
    const formDetails = useAppSelector(
        state => state.applicantProfile.data.content
    );

    React.useEffect(() => {
        const fetchLayout = async () => {
            try {
                const res = await appFormTemplateServices.getListAsync();
                let profileLayout = JSON.parse(res.data[0].content)
                    .profile as IAppFormTemplateProfileSection[];
                const fieldMap = new Map<string, any>();

                console.log(
                    "Data",
                    profileLayout,
                    formDetails.map(section => section.fields).flat(1)
                );
                formDetails
                    .map(section => section.fields)
                    .flat(1)
                    .forEach(section => {
                        if (!fieldMap.has(section.id))
                            fieldMap.set(section.id, section);
                    });

                profileLayout = profileLayout.map(section => ({
                    ...section,
                    fields: section.fields.map(item => {
                        const isHaving = fieldMap.get(item.id);
                        return isHaving ? isHaving : item;
                    }),
                }));

                console.log(profileLayout);

                setSections(profileLayout);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLayout();
    }, [formDetails]);

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

            {sections?.map((section, index) => {
                return (
                    <div key={index}>
                        <strong className="text-sm text-neutral-600 uppercase mb-4">
                            {section.label}
                        </strong>
                        {section.fields.map((field, index) => {
                            return (
                                <div key={index} className="mb-4 text-sm">
                                    <div className="flex flex-col lg:flex-row">
                                        <div className="lg:basis-40 mr-6 text-neutral-500 flex gap-2">
                                            <span>{field.label}</span>
                                        </div>
                                        <div className="w-full flex flex-col gap-2 items-start text-neutral-600">
                                            <span>
                                                {field.custom}:{" "}
                                                {field.value
                                                    ? field.value
                                                    : "No data"}
                                            </span>
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
