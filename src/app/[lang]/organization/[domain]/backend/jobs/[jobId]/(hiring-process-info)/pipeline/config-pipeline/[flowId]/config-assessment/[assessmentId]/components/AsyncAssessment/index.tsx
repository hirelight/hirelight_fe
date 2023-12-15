"use client";

import React from "react";
import { useParams } from "next/navigation";

import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import AsyncVideoForm from "./AsyncVideoForm";

const AsyncAssessmentConfig = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "assessment");
    return (
        <div className="bg-white py-6 drop-shadow-md rounded-md">
            <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                {t("create_async_assessment")}
            </h2>
            <AsyncVideoForm />
        </div>
    );
};

export default AsyncAssessmentConfig;
