"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { AssessmentTypeKey } from "@/interfaces/assessment.interface";
import jobServices from "@/services/job/job.service";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";

import PipelineStages from "./PipelineStages";
import PipelineConfigAssessment from "./PipelineConfigAssessment";

const PipelineConfig = () => {
    const [selectedStage, setSelectedStage] = React.useState<AssessmentTypeKey>(
        "CV_SCREENING_ASSESSMENT"
    );

    return (
        <div className="flex gap-10">
            <PipelineStages
                selectedId={selectedStage}
                onSelect={(id: AssessmentTypeKey) => setSelectedStage(id)}
            />
            <div className="flex-1">
                <PipelineConfigAssessment />
            </div>
        </div>
    );
};

export default PipelineConfig;
