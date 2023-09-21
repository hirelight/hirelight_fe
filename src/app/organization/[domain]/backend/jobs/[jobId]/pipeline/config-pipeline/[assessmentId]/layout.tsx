import React from "react";

const PipelineAssessmentLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <h3 className="text-lg font-medium text-neutral-700 mb-4 px-6">
                Default pipeline
            </h3>
            <div>{children}</div>
        </div>
    );
};

export default PipelineAssessmentLayout;
