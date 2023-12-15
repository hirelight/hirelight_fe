"use client";

import React, { useRef, useState } from "react";
import moment from "moment";
import { useParams } from "next/navigation";

import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import {
    IAppFormTemplateField,
    IAppFormTemplateProfileSection,
} from "@/interfaces/app-form-template.interface";
import { useAppSelector } from "@/redux/reduxHooks";
import { ICustomField } from "@/interfaces";
import PDFViewer from "@/components/PdfViewer";
import { ApplicationFormJSON } from "@/services";
import { EducationFormState } from "@/components/EducationSection";
import { ExperienceType } from "@/components/ExperienceSection";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./styles.module.scss";

const ProfileSection = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "candidate");

    const [sections, setSections] = useState<IAppFormTemplateProfileSection[]>(
        []
    );
    const applicantAssessmentDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data
    );
    const formDetails = useRef<ApplicationFormJSON | null>(
        applicantAssessmentDetail &&
            applicantAssessmentDetail.applicantProfile.content
            ? JSON.parse(applicantAssessmentDetail.applicantProfile.content)
            : null
    );

    const getDetailByField = (field: IAppFormTemplateField) => {
        let value = field.value;
        switch (field.type) {
            case "date":
                value = moment
                    .utc(field.value)
                    .locale(lang)
                    .format("DD/MM/YYYY");
                break;
            case "boolean":
                value = field.value ? "Yes" : "No";
                break;
            default:
                value = field.value ? field.value : "";
        }

        if (field.id === "resume")
            return field.value ? (
                <PDFViewer
                    src={field.value.value as string}
                    fileName={field.value.name}
                />
            ) : null;
        else if (field.type === "group") {
            return field.id === "education" ? (
                <EducationSectionList datas={field.value} />
            ) : (
                <ExperienceSectionList datas={field.value} />
            );
        } else
            return (
                <div className="flex flex-col lg:flex-row">
                    {field.type !== "paragraph" && (
                        <div className="lg:basis-40 mr-6 text-neutral-500 flex gap-2">
                            <span>{field.label}:</span>
                        </div>
                    )}
                    <div
                        className={`w-full flex flex-col gap-2 items-start text-neutral-600 ${
                            field.type === "paragraph"
                                ? "ql-editor !p-0 mt-2"
                                : ""
                        }`}
                    >
                        {value}
                    </div>
                </div>
            );
    };

    const getCustomQuesVal = (field: ICustomField) => {
        switch (field.type) {
            case "file":
                return (
                    <a
                        href={field.value.value}
                        download
                        className="text-blue_primary_700 font-semibold hover:underline"
                    >
                        {field.value.value}
                    </a>
                );
            case "date":
                return moment
                    .utc(field.value)
                    .locale(lang)
                    .format("DD/MM/YYYY");
            case "multiple_choice":
                if (Array.isArray(field.value)) {
                    return (
                        <>
                            {field.value?.map(choice => (
                                <div key={choice} className="mt-2 first:mt-0">
                                    {choice}
                                </div>
                            ))}
                        </>
                    );
                } else return field.value;
            case "boolean":
                return field.value ? "Yes" : "No";
            default:
                return field.value;
        }
    };

    React.useEffect(() => {
        const fetchLayout = async () => {
            try {
                const res =
                    await appFormTemplateServices.getDefaultAppFormTemplate();
                let profileLayout = JSON.parse(res.data.content)
                    .profile as IAppFormTemplateProfileSection[];
                const fieldMap = new Map<string, any>();
                if (formDetails.current)
                    formDetails.current.form_structure
                        .map(section => section.fields)
                        .flat(1)
                        .forEach(field => {
                            if (!fieldMap.has(field.id))
                                fieldMap.set(field.id, field);
                        });

                profileLayout = profileLayout
                    .map(section => ({
                        ...section,
                        fields: section.fields
                            .map(item => {
                                const isHaving = fieldMap.get(item.id);

                                return isHaving ? isHaving : item;
                            })
                            .filter(item => item.value),
                    }))
                    .filter(
                        section =>
                            !section.fields.every(
                                item =>
                                    item.value === undefined ||
                                    (Array.isArray(item.value) &&
                                        !item.value.length)
                            )
                    );
                setSections(profileLayout);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLayout();
    }, []);
    return (
        <div className="">
            <section>
                <div className="w-full border-b border-gray-300 mb-6">
                    <h3
                        className={`inline-block ${styles.profile__tab__btn} ${styles.active}`}
                    >
                        <span>{t("common:details")}</span>
                    </h3>
                </div>

                {sections?.map((section, index) => {
                    return (
                        <div
                            key={index}
                            className="py-6 border-b border-gray-200 last:border-b-0"
                        >
                            <strong className="block text-sm text-neutral-600 uppercase mb-2">
                                {section.label}
                            </strong>
                            <div className="space-y-4">
                                {section.fields.map((field, index) => {
                                    return (
                                        <div key={index} className="text-sm">
                                            {getDetailByField(field)}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </section>

            {formDetails.current &&
                formDetails.current.questions.length > 0 && (
                    <section>
                        <div className="w-full border-b border-gray-300 mb-6">
                            <h3
                                className={`inline-block ${styles.profile__tab__btn} ${styles.active}`}
                            >
                                <span>{t("common:answers")}</span>
                            </h3>
                        </div>
                        {formDetails.current?.questions.map((answer, index) => {
                            return (
                                <div
                                    key={index}
                                    className="mb-4 text-sm border-b border-gray-300 pb-6 last:pb-0 last:border-none"
                                >
                                    <div className="lg:basis-40 mr-6 text-neutral-500 flex gap-2 mb-2">
                                        <span>{answer.label}</span>
                                    </div>
                                    <div className="border-l-2 border-gray-300 pl-4 text-neutral-600">
                                        {getCustomQuesVal(answer)}
                                    </div>
                                </div>
                            );
                        })}
                    </section>
                )}
        </div>
    );
};

export default ProfileSection;

const EducationSectionList = ({ datas }: { datas: EducationFormState[] }) => {
    const { lang } = useParams();
    return (
        <ul className="w-full space-y-3">
            {datas.map((item, index: number) => (
                <li key={index} className="w-full flex flex-col lg:flex-row">
                    <span className="inline-block text-neutral-600 whitespace-nowrap mr-6 lg:basis-40 lg:flex-shrink-0">
                        {moment
                            .utc(item.startDate)
                            .locale(lang)
                            .format("MM/yyyy  -  ") ?? ""}
                        {moment
                            .utc(item.endDate)
                            .locale(lang)
                            .format("MM/yyyy") ?? ""}
                    </span>
                    <div>
                        <p>
                            {item.degree && (
                                <>
                                    <strong>{item.degree}</strong>
                                    <span> in </span>
                                </>
                            )}
                            {item.fieldOfStudy && (
                                <>
                                    <strong>{item.fieldOfStudy}</strong>
                                    <span> at </span>
                                </>
                            )}
                            <strong>{item.school}</strong>
                        </p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

const ExperienceSectionList = ({ datas }: { datas: ExperienceType[] }) => {
    const { lang } = useParams();
    return (
        <ul className="w-full space-y-3">
            {datas.map((item, index: number) => (
                <li key={index} className="w-full flex flex-col lg:flex-row">
                    <span className="inline-block text-neutral-600 whitespace-nowrap mr-6 lg:basis-40 lg:flex-shrink-0">
                        {moment
                            .utc(item.startDate)
                            .locale(lang)
                            .format("MM/yyyy  -  ") ?? ""}
                        {moment
                            .utc(item.endDate)
                            .locale(lang)
                            .format("MM/yyyy") ?? ""}
                    </span>
                    <div>
                        <p>
                            <strong>{item.title}</strong>
                            {item.company && (
                                <>
                                    <span> at </span>
                                    <strong>{item.company}</strong>
                                </>
                            )}
                        </p>
                        {item.summary && (
                            <p className="ql-editor !p-0 !text-neutral-600">
                                {item.summary}
                            </p>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};
