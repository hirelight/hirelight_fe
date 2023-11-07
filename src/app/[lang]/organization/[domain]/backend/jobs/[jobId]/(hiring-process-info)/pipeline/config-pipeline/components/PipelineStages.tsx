"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { pipelineStages } from "@/utils/shared/initialDatas";
import {
    AssessmentTypeKey,
    AssessmentTypes,
} from "@/interfaces/assessment.interface";
import jobServices from "@/services/job/job.service";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import {
    IAssessmentDto,
    IAssessmentFlowDto,
} from "@/services/assessment-flows/assessment-flows.interface";

import styles from "./PipelineStages.module.scss";

const defaultStage: AssessmentTypeKey[] = ["SOURCED", "HIRED"];
interface IPipelineStages {
    selectedId: AssessmentTypeKey;
    onSelect: (id: AssessmentTypeKey) => void;
}

const PipelineStages = ({ selectedId, onSelect }: IPipelineStages) => {
    const { jobId } = useParams();
    const [stages, setStages] = useState<IAssessmentDto[]>([]);

    useEffect(() => {
        const fetchWorkflow = async () => {
            try {
                const jobRes = await jobServices.getByIdAsync(
                    parseInt(jobId as string)
                );
                const flow = await assessmentFlowsServices.getByIdAsync(
                    jobRes.data.assessmentFlowId
                );
                setStages(flow.data.assessments);
            } catch (error) {
                toast.error("Fialure");
            }
        };

        fetchWorkflow();
    }, [jobId]);

    return (
        <aside>
            <ul className="flex flex-col gap-3">
                {stages?.map(stage => (
                    <li key={stage.id}>
                        <button
                            type="button"
                            disabled={defaultStage.includes(
                                stage.assessmentTypeName
                            )}
                            className={`${styles.stage__btn} ${
                                defaultStage.includes(stage.assessmentTypeName)
                                    ? "cursor-not-allowed opacity-70"
                                    : "hover:bg-gray-400 hover:text-neutral-700"
                            } ${
                                selectedId === stage.assessmentTypeName
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={onSelect.bind(
                                null,
                                stage.assessmentTypeName
                            )}
                        >
                            <span>
                                {AssessmentTypes[stage.assessmentTypeName]}
                            </span>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default PipelineStages;
