import {
    ICandidateMCDto,
    QuestionAnswerContentJson,
} from "@/interfaces/questions.interface";
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
    startTime: Date | string;
    endTime: Date | string;
    result: number;
    questionAnswerSet: string;
    createdTime: Date | string;
    updatedTime: Date | string;
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
    createdTime: Date | string;
    updatedTime: Date | string;
    status: ApplicantAssessmentDetailStatus;
}

export interface ICandidateAssessmentDetailDto {
    id: string;
    assessmentId: string;
    assessment: {
        id: string;
        name: string;
        description: string | null;
        assessmentTypeId: string;
        assessmentTypeName: AssessmentTypeKey;
    };
    applicantProfileId: string;
    applicantProfile: IJobPostProfileDto & {
        jobPost: IJobDto & {
            organization: IOrganizationDto;
        };
    };
    startTime: Date | string;
    endTime: Date | string;
    result: number;
    questionAnswerSet: string | null;
    createdTime: Date | string;
    updatedTime: Date | string;
    status: ApplicantAssessmentDetailStatus;
}

export interface IMCAppliAssessmentDto extends ICandidateAssessmentDetailDto {
    id: string;
    assessmentId: string;
    assessment: IAssessmentDto;
    applicantProfileId: string;
    applicantProfile: IJobPostProfileDto & {
        jobPost: IJobDto & {
            organization: IOrganizationDto;
        };
    };
    startTime: Date | string;
    endTime: Date | string;
    result: number;
    questionAnswerSet: string;
    createdTime: Date | string;
    updatedTime: Date | string;
    status: ApplicantAssessmentDetailStatus;
}

export interface ISubmitMCAnswerDto {
    applicantAssessmentDetailId: string;
    answers: ICandidateMCDto[];
}

export interface ITrackAsyncAssessmentDto {
    applicantAssessmentDetailId: string;
    assessmentSubmissions: (Omit<IAsyncAnswer, "content"> & {
        content: string;
    })[];
}

export interface ISubmitAsyncAssessmentDto {
    applicantAssessmentDetailId: string;
    assessmentSubmissions: (Omit<IAsyncAnswer, "content"> & {
        content: string;
    })[];
}

export interface IAsyncAssessDto {
    id: string;
    assessmentId: string;
    assessment: IAssessmentDto;
    applicantProfileId: string;
    applicantProfile: IJobPostProfileDto & {
        jobPost: IJobDto & {
            organization: IOrganizationDto;
        };
    };
    startTime: Date;
    endTime: Date | null;
    result: number | null;
    questionAnswerSet: string;
    createdTime: Date;
    updatedTime: Date;
    status: ApplicantAssessmentDetailStatus;
}

export interface IParsedAsyncAssess extends IAssessmentDto {
    questionAnswerSet: (IQuestionAnswerDto & {
        content: QuestionAnswerContentJson;
    })[];
}

export type IAsyncAnswer = Omit<IQuestionAnswerDto, "content"> & {
    content: QuestionAnswerContentJson & {
        files?: VideoFile[];
    };
};

type VideoFile = {
    src: string;
    name: string;
    type: string;
    isChosen?: boolean;
};
