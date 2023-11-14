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
    startTime: Date;
    endTime: Date;
    jobPostId: string;
    assessments: IAssessmentFlow[];
}

export interface IEditAssessmentFlowDto {
    id: string;
    name: string;
    startTime: Date;
    endTime: Date;
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
    startTime: Date;
    endTime: Date;
    createdTime: Date;
    updatedTime: Date;
    assessments: IAssessmentDto[];
}
