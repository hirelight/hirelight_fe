"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { useAppSelector } from "@/redux/reduxHooks";
import { IAssessmentDto } from "@/services/assessments/assessments.interface";
import { defaultAsessment } from "@/interfaces/assessment.interface";
import { defaulAssessmentStages } from "@/utils/shared/initialDatas";

import PipelineStages from "./PipelineStages";
import PipelineConfigAssessment from "./PipelineConfigAssessment";

type PipelineConfigProps = {};

const PipelineConfig: React.FC<PipelineConfigProps> = ({}) => {
    const { lang, jobId, flowId, assessmentId } = useParams();
    const router = useRouter();

    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);
    const [selectedStage, setSelectedStage] = React.useState<
        IAssessmentDto | undefined
    >();

    const handleSelectStage = (stage: IAssessmentDto) => {
        setSelectedStage(stage);
        router.push(
            `/${lang}/backend/jobs/${jobId}/pipeline/config-pipeline/${flowId}/config-assessment/${stage.id}`
        );
    };

    useEffect(() => {
        if (assessmentId) {
            setSelectedStage(
                assessmentFlow.assessments.find(
                    item =>
                        item.id === assessmentId &&
                        !defaulAssessmentStages.includes(
                            item.assessmentTypeName
                        )
                ) ?? assessmentFlow.assessments[0]
            );
        }
    }, [assessmentFlow.assessments, assessmentId]);

    return (
        <div className="bg-white shadow-lg rounded-md p-4 xl:px-6 flex flex-col gap-10">
            <PipelineStages
                stages={assessmentFlow.assessments}
                selectedStage={selectedStage}
                onSelect={handleSelectStage}
            />
        </div>
    );
};

export default PipelineConfig;
