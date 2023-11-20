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
    evaluation: string;
    rating: number;
    createdTime: Date;
    updatedTime: Date;
}

export interface IProfileEvaluationDto {
    id: string;
    assessmentId: string;
    assessment: IAssessmentDto;
    assessmentEvaluations: (IEvaluationDto & {
        applicantAssessmentDetail: IApplicantAssessmentDetailDto;
    })[];
    applicantProfileId: string;
    applicantProfile: IApplicantProfileDto;
    startTime: Date;
    endTime: Date;
    result: 0;
    questionAnswerSet: string | null;
    createdTime: Date;
    updatedTime: Date;
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
