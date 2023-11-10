import React from "react";

import TitleHeader from "./components/TitleHeader";

const PipelineAssessmentLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <TitleHeader />
            <div>{children}</div>
        </div>
    );
};

export default PipelineAssessmentLayout;
