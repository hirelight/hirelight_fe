export interface ICreateAssessmentFlTempDto {
    name: string;
    content: string;
}

export interface IEditAssessmentFlTempDto extends ICreateAssessmentFlTempDto {
    id: string;
    organizationId: string;
}

export interface IAssessmentFlTempDto {
    id?: string;
    organizationId?: string;
    name: string;
    content: string;
}
