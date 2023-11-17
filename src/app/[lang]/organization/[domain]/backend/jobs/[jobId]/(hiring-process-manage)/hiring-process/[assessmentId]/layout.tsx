import React from "react";

import ContentWrapper from "./components/ContentWrapper";

const HiringProcessAssessmentInfoLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto">
                <ContentWrapper>{children}</ContentWrapper>
            </div>
        </div>
    );
};

export default HiringProcessAssessmentInfoLayout;
