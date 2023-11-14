export interface IApplyJobDto {
    jobPostId: string;
    referrerid?: string;
    content: string;
    firstName: string;
    lastName: string;
}

export interface IJobPostProfileDto {
    candidateId: string;
    jobPostId: string;
    referrerid?: string;
    content: string;
    firstName: string;
    lastName: string;
    status: string;
}
