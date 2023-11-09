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

export interface IAssessmentDto {
    id: number;
    assessmentFlowId: number;
    assessmentTypeId: number;
    assessmentTypeName: AssessmentTypeKey;
    assessmentQuestionAnswerSetId: number | null;
    assessmentQuestionAnswerSetContent: string;
    creatorId: number;
    description: string;
    content: string;
    query: string;
    duration: number;
    index: number;
    createdTime: Date;
    updatedTime: Date;
    status: string;
}
