import { AssessmentTypeKey } from "@/interfaces/assessment.interface";

export interface IEditAsyncVideoInterviewDto {
    id: number;
    name: string;
    description: string;
    content: string;
    query: string;
    duration: number;
    index: number;
    assessmentQuestionAnswerSetContent: string;
}

export interface IEditAssessmentDto {
    id: number;
    name: string;
    description: string;
    content: string;
    query: string;
    duration: number;
    index: number;
    assessmentQuestionAnswerSetContent: string;
}

export interface IAssessmentDto {
    id: number;
    name: string;
    assessmentFlowId: number;
    assessmentTypeId: number;
    assessmentTypeName: AssessmentTypeKey;
    assessmentQuestionAnswerSetId: number | null;
    assessmentQuestionAnswerSetContent: string | null;
    creatorId: number;
    description: string | null;
    content: string | null;
    query: string | null;
    duration: number | null;
    index: number;
    createdTime: Date;
    updatedTime: Date;
    status: string;
}
