import {
    AssessmentTypeKey,
    AssessmentTypes,
} from "@/interfaces/assessment.interface";

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

export interface IAssessmentDto {
    id: number;
    assessmentFlowId: number;
    assessmentTypeId: number;
    assessmentTypeName: AssessmentTypeKey;
    assessmentQuestionAnswerSetId: null;
    assessmentQuestionAnswerSetContent: null;
    creatorId: number;
    description: string;
    content: string;
    query: string;
    duration: string;
    index: number;
    createdTime: Date;
    updatedTime: Date;
    status: string;
}
