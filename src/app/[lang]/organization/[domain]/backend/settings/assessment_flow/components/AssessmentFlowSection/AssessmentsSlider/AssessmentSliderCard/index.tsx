"use client";

import {
    ChatBubbleLeftRightIcon,
    UserIcon,
    PhoneIcon,
    PencilSquareIcon,
    CheckCircleIcon,
} from "@heroicons/react/24/outline";
import { LockClosedIcon, RectangleStackIcon } from "@heroicons/react/24/solid";
import React from "react";

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
    const getIconBaseOnKind = (kind: string) => {
        switch (kind) {
            case "sourced":
                return <UserIcon className="w-6 h-6" />;
            case "applied":
                return <UserIcon className="w-6 h-6" />;
            case "phone-screen":
                return <PhoneIcon className="w-6 h-6" />;
            case "assessment":
                return <RectangleStackIcon className="w-6 h-6" />;
            case "interview":
                return <ChatBubbleLeftRightIcon className="w-6 h-6" />;
            case "offer":
                return <PencilSquareIcon className="w-6 h-6" />;
            case "hired":
                return <CheckCircleIcon className="w-6 h-6" />;
        }
    };

    return (
        <div className={styles.card__wrapper}>
            {getIconBaseOnKind(data.kind)}
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
