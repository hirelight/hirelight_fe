import React from "react";
import { Metadata } from "next";

import AssessmentFlowSection from "./components/AssessmentFlowSection";
import CustomFieldsSection from "./components/CustomFieldsSection";

export const metadata: Metadata = {
    title: "Hirelight - Assessments Flow - Hirelight",
};

const AssessmentFlowSetting = () => {
    return (
        <div className="w-full flex flex-col gap-8">
            <AssessmentFlowSection />
            <CustomFieldsSection />
        </div>
    );
};

export default AssessmentFlowSetting;
