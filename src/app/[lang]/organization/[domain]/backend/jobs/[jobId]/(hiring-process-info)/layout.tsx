import React from "react";

import JobHeader from "./components/JobHeader";
import WrapperJobDetail from "./components/WrapperJobDetail";

const JobDetailLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex-1 flex flex-col max-w-screen-xl mx-auto">
            <WrapperJobDetail>
                <JobHeader />
                <div className="flex-1 flex w-full">
                    <div className="flex-1 max-w-full mx-auto pb-20">
                        {children}
                    </div>
                </div>
            </WrapperJobDetail>
        </div>
    );
};

export default JobDetailLayout;
