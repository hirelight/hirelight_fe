import React from "react";

import Sidebar from "./components/Sidebar/Sidebar";

const HiringProcessAssessmentInfoLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <div className="max-w-screen-xl mx-auto">
                <div className="flex gap-6 justify-between">
                    <Sidebar />
                    <div className="flex-1">{children}</div>
                </div>
            </div>
        </div>
    );
};

export default HiringProcessAssessmentInfoLayout;
