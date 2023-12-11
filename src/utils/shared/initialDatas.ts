import { IAppFormField, IAppFormSection } from "@/interfaces";
import { AssessmentTypeKey } from "@/interfaces/assessment.interface";

export const defaulAssessmentStages: AssessmentTypeKey[] = [
    "SOURCED_ASSESSMENT",
    "HIRED_ASSESSMENT",
    "LIVE_VIDEO_INTERVIEW_ASSESSMENT",
    "CV_SCREENING_ASSESSMENT",
];

export const jobFunctions = [
    { id: 0, name: "Accounting" },
    { id: 1, name: "Administrative" },
    { id: 2, name: "Arts and Design" },
    { id: 3, name: "Business Development" },
    { id: 4, name: "Community and Social Services" },
    { id: 5, name: "Consulting" },
    { id: 6, name: "Education" },
    { id: 7, name: "Engineering" },
    { id: 8, name: "Entrepreneurship" },
    { id: 9, name: "Finance" },
    { id: 10, name: "Healthcare Services" },
    { id: 11, name: "Human Resources" },
    { id: 12, name: "Information Technology" },
    { id: 13, name: "Legal" },
    { id: 14, name: "Marketing" },
    { id: 15, name: "Media and Communication" },
    { id: 16, name: "Military and Protective Services" },
    { id: 17, name: "Operations" },
    { id: 18, name: "Product Management" },
    { id: 19, name: "Program and Project Management" },
    { id: 20, name: "Purchasing" },
    { id: 21, name: "Quality Assurance" },
    { id: 22, name: "Real Estate" },
    { id: 23, name: "Research" },
    { id: 24, name: "Sales" },
    { id: 25, name: "Support" },
];

export const industries = [
    "Accounting",
    "Airlines/Aviation",
    "Alternative Dispute Resolution",
    "Business Analyst",
    "Financial Analyst",
    "Data Analyst",
    "Art/Creative",
    "Business Development",
    "Consulting",
    "Customer Service",
    "Distribution",
    "Design",
];

export const workModalities = [
    { id: 0, name: "Full-time" },
    { id: 1, name: "Part-time" },
    { id: 2, name: "Remote" },
];

export const experienceLevels = [
    { id: 0, name: "Internship" },
    { id: 1, name: "Entry level" },
    { id: 2, name: "Associate" },
    { id: 3, name: "Mid-Senior level" },
    { id: 4, name: "Director" },
    { id: 5, name: "Executive" },
];
