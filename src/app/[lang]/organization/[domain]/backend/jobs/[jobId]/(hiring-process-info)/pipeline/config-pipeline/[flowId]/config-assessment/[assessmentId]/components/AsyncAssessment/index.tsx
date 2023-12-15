import React from "react";

import { getI18NextTranslation } from "@/utils/i18n";

import AsyncVideoForm from "./AsyncVideoForm";

const AsyncAssessmentConfig = async ({ params }: any) => {
    const { t } = await getI18NextTranslation(params.lang, "assessment");
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
