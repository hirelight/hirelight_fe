"use client";

import React from "react";

import { useAppSelector } from "@/redux/reduxHooks";
import { IAssessmentDto } from "@/services/assessments/assessments.interface";

import PipelineStages from "./PipelineStages";
import PipelineConfigAssessment from "./PipelineConfigAssessment";

type PipelineConfigProps = {};

const PipelineConfig: React.FC<PipelineConfigProps> = ({}) => {
    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);
    console.log(assessmentFlow);
    const [selectedStage, setSelectedStage] = React.useState<IAssessmentDto>(
        assessmentFlow.assessments[1]
    );

    return (
        <div className="flex flex-col gap-10">
            <PipelineStages
                stages={assessmentFlow.assessments}
                selectedStage={selectedStage}
                onSelect={(stage: IAssessmentDto) => setSelectedStage(stage)}
            />
            <div className="flex-1">
                <PipelineConfigAssessment
                    selectedStage={selectedStage}
                    assessmentId={selectedStage.id}
                />
            </div>
        </div>
    );
};

export default PipelineConfig;
