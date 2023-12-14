"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { Trans } from "react-i18next";

import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./AddJobDetailForm.module.scss";
import { useAddJobDetailForm } from "./AddJobDetailForm";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const DescriptionSection = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "new-job");

    const {
        formErr,
        setFormErr,
        formState,
        setFormState,
        contentLength,
        setContentLength,
    } = useAddJobDetailForm();

    return (
        <section className="relative">
            <h2 className={`${styles.form__section__title}`}>
                {t("description")}
            </h2>
            <div className={`${styles.form__section__wrapper}`}>
                <div className="mb-4 md:mb-6">
                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <span className="text-red-500 mr-1">*</span>
                        {t("about_this_role")}
                    </h3>
                    <div className="border border-slate-600 rounded-lg min-h-[600px] p-3 md:p-6 relative overflow-hidden">
                        <div className="mb-6 flex flex-col min-h-[220px]">
                            <QuillEditorNoSSR
                                label={t("description")}
                                theme="bubble"
                                required={true}
                                value={formState.content.description}
                                placeholder={t("placeholder.description")}
                                onChange={(value: string, text) => {
                                    setContentLength(prev => ({
                                        ...prev,
                                        description: text.length,
                                    }));
                                    setFormState({
                                        ...formState,
                                        content: {
                                            ...formState.content,
                                            description: value,
                                        },
                                    });
                                    setFormErr({
                                        ...formErr,
                                        contentErr: {
                                            ...formErr.contentErr,
                                            descriptionErr: "",
                                            contentErr: "",
                                        },
                                    });
                                }}
                                className="flex-1"
                                errorText={formErr.contentErr.descriptionErr}
                            />
                        </div>

                        <div className="mb-6 flex flex-col min-h-[220px]">
                            <QuillEditorNoSSR
                                label={t("requirements")}
                                theme="bubble"
                                value={formState.content.requirements}
                                placeholder={t("placeholder.requirements")}
                                onChange={(value, text) => {
                                    setContentLength(prev => ({
                                        ...prev,
                                        requirements: text.length,
                                    }));
                                    setFormState({
                                        ...formState,
                                        content: {
                                            ...formState.content,
                                            requirements: value,
                                        },
                                    });
                                    setFormErr({
                                        ...formErr,
                                        contentErr: {
                                            ...formErr.contentErr,
                                            requirementsErr: "",
                                            contentErr: "",
                                        },
                                    });
                                }}
                                className="flex-1"
                                required={true}
                                errorText={formErr.contentErr.requirementsErr}
                            />
                        </div>
                        <div className="mb-6 flex flex-col min-h-[220px]">
                            <QuillEditorNoSSR
                                label={t("benefits")}
                                theme="bubble"
                                value={formState.content.benefits}
                                placeholder={t("placeholder.benefits")}
                                onChange={(value, text) => {
                                    setContentLength(prev => ({
                                        ...prev,
                                        benefits: text.length,
                                    }));
                                    setFormState({
                                        ...formState,
                                        content: {
                                            ...formState.content,
                                            benefits: value,
                                        },
                                    });
                                    setFormErr({
                                        ...formErr,
                                        contentErr: {
                                            ...formErr.contentErr,
                                            contentErr: "",
                                        },
                                    });
                                }}
                                className="flex-1"
                            />
                        </div>

                        <div
                            className={`absolute bottom-0 right-0 left-0 p-1 text-xs ${
                                formErr.contentErr.contentErr
                                    ? "bg-red-400 text-red-700 font-medium"
                                    : "text-gray-500 bg-gray-200"
                            }`}
                        >
                            <span>
                                <Trans t={t} i18nKey={"minimum_charaters_used"}>
                                    Minimum 700 characters.
                                    {{
                                        characterLength: Object.values(
                                            contentLength
                                        ).reduce((prev, cur) => prev + cur),
                                    }}{" "}
                                    characters used.
                                </Trans>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.instruction_wrapper}>
                <div className={styles.instruction__text}>
                    <span className="text-sm text-neutral-500">
                        {t("intruction.description")}
                    </span>
                </div>
            </div>
        </section>
    );
};

export default DescriptionSection;
