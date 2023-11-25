import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import {
    IApplicantAssessmentDetailDto,
    IApplicantProfileDto,
    IAssessmentDto,
} from "..";

export interface IEvaluationDto {
    id: string;
    collaboratorId: string;
    applicantAssessmentDetailId: string;
    applicantAssessmentDetail: IApplicantAssessmentDetailDto;
    evaluation: string;
    rating: number;
    createdTime: Date | string;
    updatedTime: Date | string;
}

export interface IProfileEvaluationDto {
    id: string;
    assessmentId: string;
    assessment: IAssessmentDto;
    assessmentEvaluations: IEvaluationDto[];
    applicantProfileId: string;
    applicantProfile: IApplicantProfileDto;
    startTime: Date | string;
    endTime: Date | string;
    result: 0;
    questionAnswerSet: string | null;
    createdTime: Date | string;
    updatedTime: Date | string;
    status: ApplicantAssessmentDetailStatus;
}

export interface ICreateEvaluationDto {
    applicantAssessmentDetailId: string;
    evaluation: string;
    rating: number;
}

export interface IEditEvaluationDto {
    id: string;
    applicantAssessmentDetailId: string;
    evaluation: string;
    rating: number;
}
