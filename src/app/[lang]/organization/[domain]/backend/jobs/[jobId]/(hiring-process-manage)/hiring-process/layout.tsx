import React from "react";

import AssessmentInfoHeader from "./components/AssessmentInfoHeader";

const HiringProcessManageLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex flex-col h-full">
            <AssessmentInfoHeader />
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default HiringProcessManageLayout;
