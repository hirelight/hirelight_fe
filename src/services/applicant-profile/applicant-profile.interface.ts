export interface IApplyJobDto {
    jobPostId: number;
    referrerId?: number;
    content: string;
    firstName: string;
    lastName: string;
}

export interface IJobPostProfileDto {
    candidateId: number;
    jobPostId: number;
    referrerId?: number;
    content: string;
    firstName: string;
    lastName: string;
    status: string;
}
