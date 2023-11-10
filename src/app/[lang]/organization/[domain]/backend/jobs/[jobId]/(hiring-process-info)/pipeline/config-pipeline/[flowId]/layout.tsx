import React from "react";

import WrapperPipelineDetail from "./components/WrapperPipelineDetail";

const PipelineLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <WrapperPipelineDetail>{children}</WrapperPipelineDetail>
        </React.Fragment>
    );
};

export default PipelineLayout;
