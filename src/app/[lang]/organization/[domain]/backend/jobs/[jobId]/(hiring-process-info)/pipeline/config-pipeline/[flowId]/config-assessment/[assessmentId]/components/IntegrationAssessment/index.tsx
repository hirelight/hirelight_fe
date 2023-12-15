import React from "react";
import { Metadata } from "next";

import { getI18NextTranslation } from "@/utils/i18n";

import IntegrationForm from "./IntegrationForm";

export const metadata: Metadata = {
    title: "Hirelight - Third Party Assessment",
};

const IntegrationAssessmentConfig = async ({ params }: any) => {
    const { t } = await getI18NextTranslation(params.lang, "assessment");
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
