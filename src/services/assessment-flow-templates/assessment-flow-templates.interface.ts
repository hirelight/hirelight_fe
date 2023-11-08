export interface ICreateAssessmentFlTempDto {
    name: string;
    content: string;
}

export interface IEditAssessmentFlTempDto extends ICreateAssessmentFlTempDto {
    id: number;
    organizationId: number;
}

export interface IAssessmentFlTempDto {
    id?: number;
    organizationId?: number;
    name: string;
    content: string;
}
