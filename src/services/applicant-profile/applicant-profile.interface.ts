import { IJobDto, IOrganizationDto } from "..";

export interface IApplyJobDto {
    jobPostId: string;
    referrerid?: string;
    content: string;
    firstName: string;
    lastName: string;
}

export interface IJobPostProfileDto {
    id: string;
    candidateId: string;
    jobPostId: string;
    referrerid?: string;
    content: string;
    firstName: string;
    lastName: string;
    status: string;
}

export interface IApplicantProfileDto {
    id: string;
    candidateId: string;
    jobPostId: string;
    jobPost: IJobDto & {
        organization: IOrganizationDto;
    };
    referrerId: string;
    content: string;
    firstName: string;
    lastName: string;
    status: string;
}
