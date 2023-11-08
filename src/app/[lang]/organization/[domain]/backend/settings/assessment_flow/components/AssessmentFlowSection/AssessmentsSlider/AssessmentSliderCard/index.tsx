"use client";

import {
    ChatBubbleLeftRightIcon,
    UserIcon,
    PencilSquareIcon,
    ClipboardDocumentListIcon,
    VideoCameraIcon,
} from "@heroicons/react/24/outline";
import { ListBulletIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import React from "react";

import { AssessmentTypeKey } from "@/interfaces/assessment.interface";
import { getIconBaseOnAssessmentType } from "@/helpers/getIconBaseType";

import mockData from "../../mock-data.json";

import styles from "./styles.module.scss";

interface IAssessmentSliderCard {
    data: (typeof mockData.stages)[0];
    stageVisibility: boolean;
    toggleStageVisibility: () => void;
    hoverVisibility: boolean;
    toggleHovervisiblity: (pos?: number) => void;
}

const AssessmentSliderCard: React.FC<IAssessmentSliderCard> = ({
    data,
    stageVisibility,
    toggleStageVisibility,
    hoverVisibility,
    toggleHovervisiblity,
}) => {
    return (
        <div className={styles.card__wrapper}>
            <div className="w-6 h-6">
                {getIconBaseOnAssessmentType(data.kind as AssessmentTypeKey)}
            </div>
            <span className="mt-2">{data.name}</span>
            <button
                type="button"
                className={`${styles.card__lock__btn}  ${
                    stageVisibility
                        ? styles.selecting
                        : hoverVisibility
                        ? styles.hovering
                        : ""
                } transition-all`}
                onMouseEnter={() => toggleHovervisiblity()}
                onMouseLeave={() => toggleHovervisiblity(9999)}
                onClick={toggleStageVisibility}
            >
                <LockClosedIcon className="w-4 h-4" />
            </button>
        </div>
    );
};

export default AssessmentSliderCard;
