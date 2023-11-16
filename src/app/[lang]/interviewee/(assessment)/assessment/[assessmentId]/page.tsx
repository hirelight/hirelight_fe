import { Metadata } from "next";

import AsyncVideoAssessment from "./(async-interview)/components/AsyncVideoAssessment";
import MultipleChoiceAssessment from "./(multiple-choice)/components/MultipleChoiceAssessment";

export const metadata: Metadata = {
    title: "Assessment",
};

const AssessmentPage = () => {
    return <AsyncVideoAssessment />;
};

export default AssessmentPage;
