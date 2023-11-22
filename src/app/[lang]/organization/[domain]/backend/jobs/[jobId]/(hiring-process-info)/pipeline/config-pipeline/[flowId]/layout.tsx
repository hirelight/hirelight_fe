import React from "react";

import WrapperPipelineDetail from "./components/WrapperPipelineDetail";
import PipelineHeader from "./components/PipelineHeader";
import PipelineConfig from "./components/PipelineConfig";

const PipelineLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <WrapperPipelineDetail>
            <PipelineHeader />
            <div className="w-full flex flex-col gap-8">
                <PipelineConfig />
                <div className="w-full flex-1">{children}</div>
            </div>
        </WrapperPipelineDetail>
    );
};

export default PipelineLayout;
