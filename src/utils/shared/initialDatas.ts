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

export const oneWayQuestions = [
    {
        id: 1,
        topic: "Merle",
        questions: [
            {
                id: 1,
                description: "Morbi non quam nec dui luctus rutrum.",
                thinkLength: "Distributed",
                answerLength: "website",
                numOfTakes: 1,
            },
            {
                id: 2,
                description:
                    "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis.",
                thinkLength: "conglomeration",
                answerLength: "complexity",
                numOfTakes: 4,
            },
        ],
    },
    {
        id: 2,
        topic: "Vivien",
        questions: [
            {
                id: 1,
                description:
                    "Vestibulum sed magna at nunc commodo placerat. Praesent blandit.",
                thinkLength: "policy",
                answerLength: "Ameliorated",
                numOfTakes: 4,
            },
        ],
    },
    {
        id: 3,
        topic: "Vanna",
        questions: [
            {
                id: 1,
                description:
                    "Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.",
                thinkLength: "budgetary management",
                answerLength: "Seamless",
                numOfTakes: 4,
            },
            {
                id: 2,
                description:
                    "Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl. Nunc nisl.",
                thinkLength: "high-level",
                answerLength: "superstructure",
                numOfTakes: 4,
            },
            {
                id: 3,
                description:
                    "Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum.",
                thinkLength: "upward-trending",
                answerLength: "help-desk",
                numOfTakes: 3,
            },
            {
                id: 4,
                description:
                    "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros.",
                thinkLength: "radical",
                answerLength: "circuit",
                numOfTakes: 3,
            },
        ],
    },
    {
        id: 4,
        topic: "Lazare",
        questions: [
            {
                id: 1,
                description:
                    "Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
                thinkLength: "Configurable",
                answerLength: "contextually-based",
                numOfTakes: 3,
            },
            {
                id: 2,
                description:
                    "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
                thinkLength: "structure",
                answerLength: "Phased",
                numOfTakes: 1,
            },
        ],
    },
    {
        id: 5,
        topic: "Quill",
        questions: [
            {
                id: 1,
                description:
                    "Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.",
                thinkLength: "archive",
                answerLength: "extranet",
                numOfTakes: 2,
            },
            {
                id: 2,
                description:
                    "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.",
                thinkLength: "Switchable",
                answerLength: "Integrated",
                numOfTakes: 1,
            },
            {
                id: 3,
                description:
                    "Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.",
                thinkLength: "migration",
                answerLength: "leading edge",
                numOfTakes: 4,
            },
            {
                id: 4,
                description:
                    "Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.",
                thinkLength: "even-keeled",
                answerLength: "utilisation",
                numOfTakes: 2,
            },
        ],
    },
];
