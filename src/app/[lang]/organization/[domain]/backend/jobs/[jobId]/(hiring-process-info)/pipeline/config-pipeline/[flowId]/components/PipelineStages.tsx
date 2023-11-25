"use client";

import React from "react";
import { useParams } from "next/navigation";

import { AssessmentTypeKey } from "@/interfaces/assessment.interface";
import { IAssessmentDto } from "@/services";
import { getIconBaseOnAssessmentType } from "@/helpers/getIconBaseType";

import styles from "./PipelineStages.module.scss";

export const defaultStage: AssessmentTypeKey[] = [
    "SOURCED_ASSESSMENT",
    "HIRED_ASSESSMENT",
    "LIVE_VIDEO_INTERVIEW_ASSESSMENT",
    "CV_SCREENING_ASSESSMENT",
];
interface IPipelineStages {
    stages: IAssessmentDto[];
    selectedStage?: IAssessmentDto;
    onSelect: (selected: IAssessmentDto) => void;
}

const PipelineStages = ({
    selectedStage,
    onSelect,
    stages,
}: IPipelineStages) => {
    return (
        <aside>
            <ul className={styles.stage__list}>
                {stages?.map(stage => (
                    <li key={stage.id} className={styles.stage__item}>
                        <button
                            type="button"
                            disabled={defaultStage.includes(
                                stage.assessmentTypeName
                            )}
                            className={`${styles.stage__btn} ${
                                defaultStage.includes(stage.assessmentTypeName)
                                    ? styles.disabled
                                    : "hover:bg-gray-400 hover:text-neutral-700"
                            } ${
                                selectedStage && selectedStage.id === stage.id
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={onSelect.bind(null, stage)}
                        >
                            <div className="w-8 h-8">
                                {getIconBaseOnAssessmentType(
                                    stage.assessmentTypeName
                                )}
                            </div>
                            <strong>{stage.name}</strong>
                        </button>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default PipelineStages;
