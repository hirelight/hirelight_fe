import React from "react";
import { useParams } from "next/navigation";

import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import IntegrationForm from "./IntegrationForm";

const IntegrationAssessmentConfig = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "assessment");
    return (
        <div className="bg-white py-6 drop-shadow-md rounded-md">
            <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                {t("create_integration_assessment")}
            </h2>
            <IntegrationForm />
        </div>
    );
};

export default IntegrationAssessmentConfig;
