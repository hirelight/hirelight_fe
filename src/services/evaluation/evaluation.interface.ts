export interface IEvaluationDto {
    id: string;
    collaboratorId: string;
    applicantAssessmentDetailId: string;
    evaluation: string;
    rating: number;
    createdTime: Date;
    updatedTime: Date;
}

export interface ICreateEvaluationDto {
    applicantAssessmentDetailId: string;
    evaluation: string;
    rating: number;
}

export interface IEditEvaluationDto {
    id: string;
    applicantAssessmentDetailId: string;
    evaluation: string;
    rating: number;
}
