"use client";

import React from "react";
import { useParams } from "next/navigation";

import { BadgeInput, Selection } from "@/components";
import { experienceLevels, workModalities } from "@/utils/shared/initialDatas";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./AddJobDetailForm.module.scss";
import { useAddJobDetailForm } from "./AddJobDetailForm";

const EmployementDetailsSection = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "new-job");

    const { formState, setFormState } = useAddJobDetailForm();

    return (
        <section className="relative">
            <h2 className={`${styles.form__section__title}`}>
                {t("employment_details")}
            </h2>
            <div className={`${styles.form__section__wrapper}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <Selection
                        title={t("employment_type")}
                        items={workModalities.map(item => ({
                            label: item.name,
                            value: item.name,
                        }))}
                        value={formState.workModality}
                        onChange={(value: string) => {
                            setFormState({
                                ...formState,
                                workModality: value,
                            });
                        }}
                    />
                    <Selection
                        title={t("experience")}
                        items={experienceLevels.map(item => ({
                            label: item.name,
                            value: item.name,
                        }))}
                        value={formState.experience}
                        onChange={(value: string) => {
                            setFormState({
                                ...formState,
                                experience: value,
                            });
                        }}
                    />
                    <BadgeInput
                        title={t("keywords")}
                        type="text"
                        id="search-keywords"
                        values={
                            formState.keywords
                                ? formState.keywords.split(",")
                                : []
                        }
                        onChange={(badges: string[]) =>
                            setFormState({
                                ...formState,
                                keywords: badges.join(","),
                            })
                        }
                    />

                    <BadgeInput
                        title={t("cv_keywords")}
                        type="text"
                        id="scan-keywords"
                        values={
                            formState.scanKeywords
                                ? formState.scanKeywords.split(",")
                                : []
                        }
                        onChange={(badges: string[]) =>
                            setFormState({
                                ...formState,
                                scanKeywords: badges.join(","),
                            })
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default EmployementDetailsSection;
