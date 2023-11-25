import { Metadata } from "next";

import AssessmentMediation from "./components/AssessmentMediation";

export const metadata: Metadata = {
    title: "Assessment",
};

const AssessmentPage = () => {
    return <AssessmentMediation />;
};

export default AssessmentPage;
