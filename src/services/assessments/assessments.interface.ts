import { AssessmentTypeKey } from "@/interfaces/assessment.interface";

export interface IEditAsyncVideoInterviewDto {
    id: string;
    name: string;
    description: string;
    content: string;
    query: string;
    duration: number;
    index: number;
    assessmentQuestionAnswerSetContent: string;
}

export interface IEditAssessmentDto {
    id: string;
    name: string;
    description: string;
    content: string;
    query: string;
    duration: number;
    index: number;
    assessmentQuestionAnswerSetContent: string;
}

export interface IAssessmentDto {
    id: string;
    name: string;
    assessmentFlowId: string;
    assessmentTypeId: string;
    assessmentTypeName: AssessmentTypeKey;
    assessmentQuestionAnswerSetId: string | null;
    assessmentQuestionAnswerSetContent: string | null;
    creatorId: string;
    description: string | null;
    content: string | null;
    query: string | null;
    duration: number | null;
    index: number;
    createdTime: Date | string;
    updatedTime: Date | string;
    status: string;
}

export interface ThirdPartyAssessment {
    id: string;
    name: string;
}
