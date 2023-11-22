import React from "react";

import TitleHeader from "./components/TitleHeader";
import AssesmentDetailWrapper from "./components/AssesmentDetailWrapper";

const PipelineAssessmentLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <AssesmentDetailWrapper>{children}</AssesmentDetailWrapper>;
};

export default PipelineAssessmentLayout;
