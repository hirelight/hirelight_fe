import { ICandidateMCDto } from "@/interfaces/questions.interface";
import { AssessmentTypeKey } from "@/interfaces/assessment.interface";

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
    startTime: Date;
    endTime: Date;
    result: number;
    questionAnswerSet: string;
    createdTime: Date;
    updatedTime: Date;
    status: string;
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
    createdTime: Date;
    updatedTime: Date;
    status: string;
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
        jobPost: IJobDto;
    };
    startTime: null;
    endTime: null;
    result: null;
    questionAnswerSet: null;
    createdTime: Date;
    updatedTime: Date;
    status: string;
}

export interface IMCAppliAssessmentDto {
    id: string;
    assessmentId: string;
    assessment: IAssessmentDto;
    applicantProfileId: string;
    applicantProfile: IApplicantAssessmentDetailDto;
    startTime: Date;
    endTime: Date;
    result: number;
    questionAnswerSet: string;
    createdTime: Date;
    updatedTime: Date;
    status: string;
}

export interface ISubmitMCAnswerDto {
    applicantAssessmentDetailId: string;
    answers: ICandidateMCDto[];
}
