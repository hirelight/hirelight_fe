import React from "react";

import JobHeader from "./components/JobHeader";

const JobDetailLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-1 flex flex-col max-w-screen-xl mx-auto">
            <JobHeader />
            <div className="flex-1 flex">
                <div className="flex-1 max-w-screen-xl mx-auto pb-20">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default JobDetailLayout;
