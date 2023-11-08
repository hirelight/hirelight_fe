"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import {
    AssessmentTypeKey,
    AssessmentTypes,
} from "@/interfaces/assessment.interface";
import { IAssessmentDto } from "@/services";

import styles from "./PipelineStages.module.scss";

const defaultStage: AssessmentTypeKey[] = ["SOURCED", "HIRED"];
interface IPipelineStages {
    stages: IAssessmentDto[];
    selectedStage: IAssessmentDto;
    onSelect: (selected: IAssessmentDto) => void;
}

const PipelineStages = ({
    selectedStage,
    onSelect,
    stages,
}: IPipelineStages) => {
    const { jobId } = useParams();

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
                                selectedStage.assessmentTypeName ===
                                stage.assessmentTypeName
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={onSelect.bind(null, stage)}
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
