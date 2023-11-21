import {
    AssessmentTypeKey,
    AssessmentTypes,
} from "@/interfaces/assessment.interface";

import { IAssessmentDto } from "../assessments/assessments.interface";

export interface IAssessmentFlow {
    name: string;
    assessmentType: AssessmentTypeKey;
}

export interface ICreateAssessmentFlowDto {
    name: string;
    startTime: Date | string;
    endTime: Date | string;
    jobPostId: string;
    assessments: IAssessmentFlow[];
}

export interface IEditAssessmentFlowDto {
    id: string;
    name: string;
    startTime: Date | string;
    endTime: Date | string;
    assessments: {
        name: string;
        id: string;
        assessmentType: AssessmentTypeKey;
    }[];
}

export interface IAssessmentFlowDto {
    id: string;
    creatorId: string;
    name: string;
    startTime: Date | string;
    endTime: Date | string;
    createdTime: Date | string;
    updatedTime: Date | string;
    assessments: IAssessmentDto[];
}
