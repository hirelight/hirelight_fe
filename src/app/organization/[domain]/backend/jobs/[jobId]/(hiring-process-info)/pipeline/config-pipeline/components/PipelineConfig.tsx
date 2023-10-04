"use client";

import React from "react";

import { pipelineStages } from "@/utils/shared/initialDatas";

import PipelineStages from "./PipelineStages";
import PipelineConfigAssessment from "./PipelineConfigAssessment";

const PipelineConfig = () => {
    const [selectedStage, setSelectedStage] = React.useState(
        pipelineStages[0].id
    );

    return (
        <div className="flex gap-10">
            <PipelineStages
                selectedId={selectedStage}
                onSelect={(id: number) => setSelectedStage(id)}
            />
            <div className="flex-1">
                <PipelineConfigAssessment />
            </div>
        </div>
    );
};

export default PipelineConfig;
