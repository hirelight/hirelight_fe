export enum AssessmentTypes {
    SOURCED_ASSESSMENT = "Sourced",
    CV_SCREENING_ASSESSMENT = "CV screening",
    MULTIPLE_CHOICE_QUESTION_ASSESSMENT = "Multiple choice assessment",
    ASYNC_VIDEO_INTERVIEW_ASSESSMENT = "One-way interview",
    LIVE_VIDEO_INTERVIEW_ASSESSMENT = "Live video interview",
    THIRD_PARTY_ASSESSMENT = "Integration assessment",
    HIRED_ASSESSMENT = "Hired",
}

export enum ApplicantAssessmentDetailStatus {
    IDLE = "IDLE",
    INVITED = "INVITED",
    PENDING_EVALUATION = "PENDING_EVALUATION",
    IN_PROGRESS = "IN_PROGRESS",
    EVALUATED = "EVALUATED",
    NON_ATTENDANCE = "NON_ATTENDANCE",
    MOVED = "MOVED",
}

export const defaultAsessment = [
    "SOURCED_ASSESSMENT",
    "CV_SCREENING_ASSESSMENT",
    "HIRED_ASSESSMENT",
];

export type AssessmentTypeKey = keyof typeof AssessmentTypes;
