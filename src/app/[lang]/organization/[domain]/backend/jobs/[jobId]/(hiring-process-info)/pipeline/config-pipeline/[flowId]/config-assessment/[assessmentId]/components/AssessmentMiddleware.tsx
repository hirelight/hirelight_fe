"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/reduxHooks";

import PipelineConfigAssessment from "../../../components/PipelineConfigAssessment";
import PipelineStages from "../../../components/PipelineStages";

import MCQAssessmentConfig from "./MCQAssessment";
import AsyncAssessmentConfig from "./AsyncAssessment";

const AssessmentMiddleware = () => {
    const router = useRouter();
    const { loading, data } = useAppSelector(state => state.assessment);
    const [show, setShow] = useState(
        data.assessmentQuestionAnswerSetId ? true : false
    );

    if (!show)
        return (
            <button type="button" onClick={() => setShow(true)}>
                Create new form
            </button>
        );

    switch (data.assessmentTypeName) {
        case "MULTIPLE_CHOICE_QUESTION_ASSESSMENT":
            return <MCQAssessmentConfig />;
        case "ASYNC_VIDEO_INTERVIEW_ASSESSMENT":
            return <AsyncAssessmentConfig />;
        default:
            return <PipelineConfigAssessment />;
    }
};

export default AssessmentMiddleware;
