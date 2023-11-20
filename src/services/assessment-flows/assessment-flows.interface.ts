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
    startTime: string;
    endTime: string;
    jobPostId: string;
    assessments: IAssessmentFlow[];
}

export interface IEditAssessmentFlowDto {
    id: string;
    name: string;
    startTime: string;
    endTime: string;
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
    startTime: string;
    endTime: string;
    createdTime: string;
    updatedTime: string;
    assessments: IAssessmentDto[];
}
