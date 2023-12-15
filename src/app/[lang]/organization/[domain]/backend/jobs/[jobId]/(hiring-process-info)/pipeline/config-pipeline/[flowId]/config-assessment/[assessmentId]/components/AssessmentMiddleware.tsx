"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { t } from "i18next";

import { useAppSelector } from "@/redux/reduxHooks";
import { ButtonOutline } from "@/components";
import { FileCircleMinus } from "@/icons";
import { defaulAssessmentStages } from "@/utils/shared/initialDatas";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import PipelineConfigAssessment from "../../../components/PipelineConfigAssessment";
import PipelineStages from "../../../components/PipelineStages";

import MCQAssessmentConfig from "./MCQAssessment";
import AsyncAssessmentConfig from "./AsyncAssessment";
import IntegrationAssessmentConfig from "./IntegrationAssessment";

const AssessmentMiddleware = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "flow");

    const { loading, data } = useAppSelector(state => state.assessment);
    const [show, setShow] = useState(
        data.assessmentQuestionAnswerSetId ? true : false
    );

    if (defaulAssessmentStages.includes(data.assessmentTypeName))
        return (
            <div className="bg-white p-6 rounded-md drop-shadow-md flex flex-col items-center justify-center">
                <div className="">
                    <FileCircleMinus className="text-neutral-700 w-24 h-24 mb-4" />
                </div>
                <p className="max-w-[50%] text-center">
                    {t("this_assessment_no_need_furthur")}
                </p>
            </div>
        );

    if (!show)
        return (
            <div className="bg-white p-6 rounded-md drop-shadow-md flex flex-col items-center justify-center">
                <div className="">
                    <FileCircleMinus className="text-neutral-700 w-24 h-24 mb-4" />
                </div>
                <p className="max-w-[50%] text-center">
                    {t("you_have_not_define_assessment")}
                </p>
                <ButtonOutline
                    type="button"
                    className="mt-8"
                    onClick={() => setShow(true)}
                >
                    {t("common:fill_details")}
                </ButtonOutline>
            </div>
        );

    switch (data.assessmentTypeName) {
        case "MULTIPLE_CHOICE_QUESTION_ASSESSMENT":
            return <MCQAssessmentConfig />;
        case "ASYNC_VIDEO_INTERVIEW_ASSESSMENT":
            return <AsyncAssessmentConfig />;
        case "THIRD_PARTY_ASSESSMENT":
            return <IntegrationAssessmentConfig />;
        default:
            return <PipelineConfigAssessment />;
    }
};

export default AssessmentMiddleware;
