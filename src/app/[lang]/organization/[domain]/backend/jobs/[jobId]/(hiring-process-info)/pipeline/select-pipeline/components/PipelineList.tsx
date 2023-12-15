"use client";

import React from "react";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { ButtonOutline } from "@/components";
import assessmentFlowTemplatesServices from "@/services/assessment-flow-templates/assessment-flow-templates.service";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import ChangePipeline from "./ChangePipeline";

const PipelineList = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "select-pipeline");

    const { data: flowTemplateRes } = useQuery({
        queryKey: ["flow-templates"],
        queryFn: assessmentFlowTemplatesServices.getListAsync,
    });
    return (
        <div className="p-6">
            {flowTemplateRes &&
                (flowTemplateRes.data.length > 0 ? (
                    <ChangePipeline
                        datas={flowTemplateRes.data.map(item => ({
                            ...item,
                            assessments: JSON.parse(item.content),
                        }))}
                    />
                ) : (
                    <div className="w-full flex flex-col items-center py-6">
                        <Square3Stack3DIcon className="text-gray-600 w-14 h-14 mb-6" />
                        <h2 className="text-2xl text-neutral-700 font-semibold mb-2">
                            {t("no_templates_available")}
                        </h2>
                        <p className="text-sm text-center text-neutral-700 mb-6">
                            {t("there_no_assessment_flow")} <br />{" "}
                            {t("you_can_create_new_one")}
                        </p>
                        <Link
                            href={`/${lang}/backend/settings/assessment_flow`}
                        >
                            <ButtonOutline>
                                {t("create_new_template")}
                            </ButtonOutline>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default PipelineList;
