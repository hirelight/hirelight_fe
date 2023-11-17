"use client";

import React, { useRef, useState } from "react";
import moment from "moment";

import { PdfViewer } from "@/components";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import {
    IAppFormTemplateField,
    IAppFormTemplateProfileSection,
} from "@/interfaces/app-form-template.interface";
import { useAppSelector } from "@/redux/reduxHooks";
import { IAppFormField, IAppFormSection, ICustomField } from "@/interfaces";
import PDFViewer from "@/components/PdfViewer";
import { ApplicationFormJSON } from "@/services";

import { profileDatas, profileLayout, candidateSection } from "./data";
import styles from "./styles.module.scss";

const ProfileSection = () => {
    const [profileTab, setProfileTab] = React.useState(0);
    const [sections, setSections] = useState<IAppFormTemplateProfileSection[]>(
        []
    );
    const applicantAssessmentDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data
    );
    const formDetails = useRef<ApplicationFormJSON>(
        JSON.parse(applicantAssessmentDetail!!.applicantProfile.content!!)
    );

    const getDetailByField = (field: IAppFormTemplateField) => {
        const value = field.value
            ? field.type === "date"
                ? moment(field.value)
                : field.value
            : "No data";

        if (field.id === "resume")
            return (
                <PDFViewer
                    src={field.value!!.value as string}
                    fileName={field.value!!.name}
                />
            );
        else
            return (
                <div className="flex flex-col lg:flex-row">
                    <div className="lg:basis-40 mr-6 text-neutral-500 flex gap-2">
                        <span>{field.label}:</span>
                    </div>
                    <div className="w-full flex flex-col gap-2 items-start text-neutral-600">
                        <span>{value}</span>
                    </div>
                </div>
            );
    };

    console.log("Profile section render");

    React.useEffect(() => {
        const fetchLayout = async () => {
            try {
                const res = await appFormTemplateServices.getListAsync();
                let profileLayout = JSON.parse(res.data[0].content)
                    .profile as IAppFormTemplateProfileSection[];
                const fieldMap = new Map<string, any>();

                formDetails.current.form_structure
                    .map(section => section.fields)
                    .flat(1)
                    .forEach(fields => {
                        if (!fieldMap.has(fields.id))
                            fieldMap.set(fields.id, fields);
                    });

                profileLayout = profileLayout
                    .map(section => ({
                        ...section,
                        fields: section.fields
                            .map(item => {
                                const isHaving = fieldMap.get(item.id);
                                // if (isHaving) fieldMap.delete(isHaving.id);
                                return isHaving ? isHaving : item;
                            })
                            .filter(item => item.value !== undefined),
                    }))
                    .filter(
                        section => !section.fields.every(item => !item.value)
                    );

                setSections(profileLayout);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLayout();
    }, [formDetails.current.form_structure]);

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
                    <div key={index} className="mb-4">
                        <strong className="block text-sm text-neutral-600 uppercase mb-2">
                            {section.label}
                        </strong>
                        {section.fields.map((field, index) => {
                            return (
                                <div key={index} className="mb-4 text-sm">
                                    {getDetailByField(field)}
                                </div>
                            );
                        })}
                    </div>
                );
            })}

            <section>
                <strong className="block text-sm text-neutral-600 uppercase mb-6">
                    Answers
                </strong>
                {formDetails.current.questions?.map((answer, index) => {
                    return (
                        <div
                            key={index}
                            className="mb-4 text-sm border-b border-gray-300 pb-6 last:pb-0 last:border-none"
                        >
                            <div className="lg:basis-40 mr-6 text-neutral-500 flex gap-2 mb-2">
                                <span>{answer.label}</span>
                            </div>
                            <div className="border-l-2 border-gray-300 pl-4 text-neutral-600">
                                {answer.type === "file" ? (
                                    <a
                                        href={answer.value.value}
                                        download
                                        className="text-blue_primary_700 font-semibold hover:underline"
                                    >
                                        {answer.value.value}
                                    </a>
                                ) : answer.type === "date" ? (
                                    moment(answer.value, "DD/MM/YYYY")
                                        .toDate()
                                        .toISOString()
                                ) : Array.isArray(answer.value) ? (
                                    answer.value?.map(choice => (
                                        <div
                                            key={choice}
                                            className="mt-2 first:mt-0"
                                        >
                                            {choice}
                                        </div>
                                    ))
                                ) : (
                                    answer.value
                                )}
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default ProfileSection;
