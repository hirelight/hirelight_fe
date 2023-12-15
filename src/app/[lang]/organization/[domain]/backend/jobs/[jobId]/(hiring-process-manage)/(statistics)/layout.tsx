import React from "react";

import AssessmentInfoHeader from "./components/AssessmentInfoHeader";
import WrapperJobDetail from "./components/WrapperJobDetail";

const JobPostStatisticLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <WrapperJobDetail>
            <div className="flex flex-col h-full">
                <AssessmentInfoHeader />
                <div className="flex-1">{children}</div>
            </div>
        </WrapperJobDetail>
    );
};

export default JobPostStatisticLayout;
