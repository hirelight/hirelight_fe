import React from "react";

import WrapperPipeline from "./components/WrapperPipeline";

const PipelineLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <WrapperPipeline>{children}</WrapperPipeline>
        </React.Fragment>
    );
};

export default PipelineLayout;
