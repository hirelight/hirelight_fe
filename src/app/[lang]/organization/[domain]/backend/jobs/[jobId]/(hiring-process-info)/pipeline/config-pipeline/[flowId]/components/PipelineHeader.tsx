"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/reduxHooks";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

const PipelineHeader = () => {
    const { lang, jobId } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "flow");

    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);
    const router = useRouter();

    const handleNavigate = () => {
        router.push(
            `/${lang}/backend/jobs/${jobId}/pipeline/config-pipeline/${assessmentFlow.id}/edit`
        );
    };

    return (
        <div className="flex justify-between items-center mb-4 px-4 xl:px-6">
            <h3 className="flex-1 text-lg font-medium text-neutral-700">
                {assessmentFlow.name}
            </h3>
            <button
                type="button"
                className="text-sm font-medium hover:underline"
                onClick={handleNavigate}
            >
                {t("edit_flow")}
            </button>
        </div>
    );
};

export default PipelineHeader;
