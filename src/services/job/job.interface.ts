import { IAppFormField, IAppFormSection, ICustomField } from "@/interfaces";

import { IAssessmentFlowDto, IOrganizationDto } from "..";

export interface ApplicationFormJSON {
    form_structure: IAppFormSection[];
    questions: ICustomField[];
}

export interface ICreateJobDto {
    title: string;
    content: string;
    applicationForm: string;
    minSalary: number;
    maxSalary: number;
    currency: string;
    startTime: Date | string;
    endTime: Date | string;
    area: string;
    experience: string;
    workModality: string;
    keywords?: string;
    scanKeywords?: string;
}

export interface JobContentJson {
    description: string;
    requirements: string;
    benefits: string;
}

export interface IJobDto extends ICreateJobDto {
    id: string;
    creatorId: string;
    assessmentFlowId: string | null;
    assessmentFlow?: IAssessmentFlowDto;
    organizationId: string;
    employmentType: string;
    keywords: string;
    createdTime: Date | string;
    updatedTime: Date | string;
    status: string;
}

export interface ICandidateJobDto extends ICreateJobDto {
    id: string;
    creatorId: string;
    assessmentFlowId: string | null;
    assessmentFlow: IAssessmentFlowDto;
    organizationId: string;
    organization: IOrganizationDto;
    employmentType: string;
    keywords: string;
    createdTime: Date | string;
    updatedTime: Date | string;
    status: string;
}

export interface IJobDetailError {
    titleErr: string;
    locationErr: string;
    contentErr: {
        descriptionErr?: string;
        requirementsErr?: string;
        benefitsErr?: string;
    };
    workModalityErr?: string;
    areaErr?: string;
    experienceErr?: string;
    minSalaryErr?: string;
    maxSalaryErr?: string;
    currencyErr?: string;
    statusErr?: string;
    startTimeErr?: string;
    endTimeErr?: string;
}

export interface IEditJobDto {
    id: string;
    title: string;
    content: string;
    applicationForm: string;
    minSalary: number;
    maxSalary: number;
    currency: string;
    startTime: Date | string;
    endTime: Date | string;
    area: string;
    experience: string;
    workModality: string;
    keywords?: string;
    scanKeywords?: string;
}
