import {
    AssessmentTypeKey,
    AssessmentTypes,
} from "@/interfaces/assessment.interface";

import { IAssessmentDto } from "../assessments/assessments.interface";

export interface IAssessmentFlow {
    name: string;
    assessmentType: AssessmentTypeKey;
    index: number;
}

export interface ICreateAssessmentFlowDto {
    name: string;
    startTime: Date;
    endTime: Date;
    jobPostId: number;
    assessments: IAssessmentFlow[];
}

export interface IEditAssessmentFlowDto {
    id: number;
}

export interface IAssessmentFlowDto {
    id: number;
    creatorId: number;
    name: string;
    startTime: Date;
    endTime: Date;
    createdTime: Date;
    updatedTime: Date;
    assessments: IAssessmentDto[];
}
