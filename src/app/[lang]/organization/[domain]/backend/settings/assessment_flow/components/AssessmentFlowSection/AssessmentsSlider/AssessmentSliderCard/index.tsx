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
import { IAssessmentFlow } from "@/services";

import mockData from "../../mock-data.json";

import styles from "./styles.module.scss";

interface IAssessmentSliderCard {
    data: IAssessmentFlow;
}

const AssessmentSliderCard: React.FC<IAssessmentSliderCard> = ({ data }) => {
    return (
        <div className={styles.card__wrapper}>
            <div className="w-6 h-6">
                {getIconBaseOnAssessmentType(data.assessmentType)}
            </div>
            <span className="mt-2 text-ellipsis text-sm whitespace-nowrap">
                {data.name}
            </span>
        </div>
    );
};

export default AssessmentSliderCard;
