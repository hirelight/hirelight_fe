"use client";

import React from "react";

import { useAppSelector } from "@/redux/reduxHooks";
import { IAssessmentDto } from "@/services/assessments/assessments.interface";

import PipelineStages from "./PipelineStages";
import PipelineConfigAssessment from "./PipelineConfigAssessment";

type PipelineConfigProps = {};

const PipelineConfig: React.FC<PipelineConfigProps> = ({}) => {
    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);
    const [selectedStage, setSelectedStage] = React.useState<
        IAssessmentDto | undefined
    >(
        assessmentFlow.assessments.find(
            assessment =>
                !["SOURCED_ASSESSMENT", "HIRED_ASSESSMENT"].includes(
                    assessment.assessmentTypeName
                )
        )
    );

    return (
        <div className="flex flex-col gap-10">
            <PipelineStages
                stages={assessmentFlow.assessments}
                selectedStage={selectedStage}
                onSelect={(stage: IAssessmentDto) => setSelectedStage(stage)}
            />
            <div className="flex-1">
                <PipelineConfigAssessment selectedStage={selectedStage} />
            </div>
        </div>
    );
};

export default PipelineConfig;
