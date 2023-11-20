import { ICandidateMCDto } from "@/interfaces/questions.interface";
import {
    ApplicantAssessmentDetailStatus,
    AssessmentTypeKey,
} from "@/interfaces/assessment.interface";

import {
    IApplicantProfileDto,
    IAssessmentDto,
    IJobDto,
    IJobPostProfileDto,
    IOrganizationDto,
    IQuestionAnswerDto,
} from "..";

export interface IJobPostAppAssDetailDto {
    id: string;
    assessmentId: string;
    assessment: IAssessmentDto;
    applicantProfileId: string;
    applicantProfile: IApplicantProfileDto & {
        jobPost: IJobDto;
    };
    startTime: string;
    endTime: string;
    result: number;
    questionAnswerSet: string;
    createdTime: string;
    updatedTime: string;
    status: ApplicantAssessmentDetailStatus;
}

export interface IApplicantAssessmentDetailDto {
    id: string;
    assessmentId: string;
    assessment: IAssessmentDto;
    applicantProfileId: string;
    applicantProfile: IJobPostProfileDto;
    startTime: null;
    endTime: null;
    result: null;
    questionAnswerSet: null;
    createdTime: string;
    updatedTime: string;
    status: ApplicantAssessmentDetailStatus;
}

export interface ICandidateAssessmentDetailDto {
    id: string;
    assessmentId: string;
    assessment: {
        id: string;
        name: string;
        description: string;
        assessmentTypeId: string;
        assessmentTypeName: AssessmentTypeKey;
    };
    applicantProfileId: string;
    applicantProfile: IJobPostProfileDto & {
        jobPost: IJobDto & {
            organization: IOrganizationDto;
        };
    };
    startTime: string;
    endTime: string;
    result: number;
    questionAnswerSet: string | null;
    createdTime: string;
    updatedTime: string;
    status: ApplicantAssessmentDetailStatus;
}

export interface IMCAppliAssessmentDto {
    id: string;
    assessmentId: string;
    assessment: IAssessmentDto;
    applicantProfileId: string;
    applicantProfile: IApplicantAssessmentDetailDto;
    startTime: string;
    endTime: string;
    result: number;
    questionAnswerSet: string;
    createdTime: string;
    updatedTime: string;
    status: ApplicantAssessmentDetailStatus;
}

export interface ISubmitMCAnswerDto {
    applicantAssessmentDetailId: string;
    answers: ICandidateMCDto[];
}

export interface ITrackAsyncAssessmentDto {
    applicantAssessmentDetailId: string;
    assessmentSubmissions: IQuestionAnswerDto[];
}

export interface ISubmitAsyncAssessmentDto {
    applicantAssessmentDetailId: string;
    assessmentSubmissions: IQuestionAnswerDto[];
}
