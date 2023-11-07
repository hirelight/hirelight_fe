export enum AssessmentTypes {
    SOURCED = "Sourced",
    CV_SCREENING_ASSESSMENT = "CV screening",
    MULTIPLE_CHOICE_QUESTION_ASSESSMENT = "Multiple choice assessment",
    ASYNC_VIDEO_INTERVIEW_ASSESSMENT = "One-way interview",
    LIVE_VIDEO_INTERVIEW_ASSESSMENT = "Live video interview",
    THIRD_PARTY_ASSESSMENT = "Integration assessment",
    HIRED = "Hired",
}

export type AssessmentTypeKey = keyof typeof AssessmentTypes;
