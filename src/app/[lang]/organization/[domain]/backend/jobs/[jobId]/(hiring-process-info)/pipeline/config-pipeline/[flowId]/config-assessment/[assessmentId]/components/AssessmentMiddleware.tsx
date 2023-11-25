"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/reduxHooks";
import { ButtonOutline } from "@/components";
import { FileCircleMinus } from "@/icons";
import { defaulAssessmentStages } from "@/utils/shared/initialDatas";

import PipelineConfigAssessment from "../../../components/PipelineConfigAssessment";
import PipelineStages from "../../../components/PipelineStages";

import MCQAssessmentConfig from "./MCQAssessment";
import AsyncAssessmentConfig from "./AsyncAssessment";
import IntegrationAssessmentConfig from "./IntegrationAssessment";

const AssessmentMiddleware = () => {
    const router = useRouter();
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
                    This assessment no need furthur detail definition. Please
                    click bellow button and fill neccessary information for
                    furthur actions.
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
                    You haven&apos;t define assessment in detail. Please click
                    bellow button and fill neccessary information for furthur
                    actions.
                </p>
                <ButtonOutline
                    type="button"
                    className="mt-8"
                    onClick={() => setShow(true)}
                >
                    Fill details
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
