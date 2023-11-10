"use client";

import React from "react";
import { useParams } from "next/navigation";

import { AssessmentTypeKey } from "@/interfaces/assessment.interface";
import { IAssessmentDto } from "@/services";
import { getIconBaseOnAssessmentType } from "@/helpers/getIconBaseType";

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
                                    ? "cursor-not-allowed opacity-70"
                                    : "hover:bg-gray-400 hover:text-neutral-700"
                            } ${
                                selectedStage.id === stage.id
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
