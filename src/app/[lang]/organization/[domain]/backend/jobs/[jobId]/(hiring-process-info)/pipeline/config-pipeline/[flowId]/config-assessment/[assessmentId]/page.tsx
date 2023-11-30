import React from "react";
import { Metadata } from "next";

import AssessmentMiddleware from "./components/AssessmentMiddleware";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Assessment",
};

const ConfigAssessment = () => {
    return <AssessmentMiddleware />;
};

export default ConfigAssessment;
