import React from "react";
import Link from "next/link";
import { Metadata } from "next";

import { getI18NextTranslation } from "@/utils/i18n";

import AssessmentFlowForm from "./components/AssessmentFlowForm";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Create New Flow",
};

type CreateAssessmentFlowProps = {};

const CreateAssessmentFlow: React.FC<CreateAssessmentFlowProps> = async ({
    params,
}: any) => {
    const { t } = await getI18NextTranslation(params.lang, "create-flow");
    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <h3 className="flex-1 text-lg font-medium text-neutral-700 mb-4 px-6">
                    {t("custom_flow")}
                </h3>
                <Link
                    href={"select-pipeline"}
                    className="text-sm font-medium text-blue_primary_800 hover:underline mr-4 xl:mr-6"
                >
                    {t("apply_template")}
                </Link>
            </div>
            <div className="bg-white py-6 drop-shadow-md rounded-md">
                <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                    {t("create_new_flow")}
                </h2>

                <AssessmentFlowForm />
            </div>
        </React.Fragment>
    );
};

export default CreateAssessmentFlow;
