export interface ICreateAssessmentFlTempDto {
    name: string;
    content: string;
}

export interface IEditAssessmentFlTempDto extends ICreateAssessmentFlTempDto {
    id: number;
}

export interface IAssessmentFlTempDto {
    organizationId: number;
    name: string;
    content: string;
}
