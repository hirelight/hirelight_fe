export interface IReportDto {
    id: string;
    candidateId: string;
    jobPostId: string;
    content: string;
    jobPostContent: string;
    createdTime: Date | string;
    status: string;
}

export interface ICreateReportDto {
    jobPostId: string;
    content: string;
}

export interface IReportContentJson {
    type: string;
    content: string;
}
