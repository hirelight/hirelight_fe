export interface IFeedbackDto {
    id: string;
    applicantProfileId: string;
    content: string;
    createdTime: Date | string;
    status: string;
}

export interface ICreateFeedbackDto {
    applicantProfileId: string;
    content: string;
}
