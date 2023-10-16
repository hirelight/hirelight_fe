import React from "react";

import AssessmentInfoHeader from "./components/AssessmentInfoHeader";

const HiringProcessManageLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <AssessmentInfoHeader />
            {children}
        </div>
    );
};

export default HiringProcessManageLayout;
