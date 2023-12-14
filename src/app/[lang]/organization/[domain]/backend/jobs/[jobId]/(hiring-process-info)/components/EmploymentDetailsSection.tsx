"use client";

import React from "react";
import { useParams } from "next/navigation";

import { BadgeInput, CustomInput, Selection } from "@/components";
import { experienceLevels, workModalities } from "@/utils/shared/initialDatas";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob } from "@/redux/slices/job.slice";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./EditJobDetailForm.module.scss";

const EmploymentDetailsSection = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "new-job");

    const dispatch = useAppDispatch();
    const { data: job } = useAppSelector(state => state.job);

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
                        value={job.workModality}
                        onChange={(value: string) => {
                            dispatch(
                                setJob({
                                    ...job,
                                    workModality: value,
                                })
                            );
                        }}
                    />
                    <Selection
                        title={t("experience")}
                        items={experienceLevels.map(item => ({
                            label: item.name,
                            value: item.name,
                        }))}
                        value={job.experience}
                        onChange={(value: string) => {
                            dispatch(
                                setJob({
                                    ...job,
                                    experience: value,
                                })
                            );
                        }}
                    />
                    <BadgeInput
                        title={t("keywords")}
                        type="text"
                        id="search-keywords"
                        values={job.keywords ? job.keywords.split(",") : []}
                        onChange={(badges: string[]) =>
                            dispatch(
                                setJob({
                                    ...job,
                                    keywords: badges.join(","),
                                })
                            )
                        }
                    />

                    <BadgeInput
                        title={t("cv_keywords")}
                        type="text"
                        id="scan-keywords"
                        values={
                            job.scanKeywords ? job.scanKeywords.split(",") : []
                        }
                        onChange={(badges: string[]) =>
                            dispatch(
                                setJob({
                                    ...job,
                                    scanKeywords: badges.join(","),
                                })
                            )
                        }
                    />
                </div>
            </div>
        </section>
    );
};

export default EmploymentDetailsSection;
