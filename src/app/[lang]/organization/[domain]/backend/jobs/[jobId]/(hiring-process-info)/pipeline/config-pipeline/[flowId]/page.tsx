import React from "react";
import { Metadata } from "next";

import PipelineConfig from "./components/PipelineConfig";
import PipelineHeader from "./components/PipelineHeader";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Pipeline Configuration",
};

const PipelineConfigurationHome = () => {
    return (
        <React.Fragment>
            <PipelineHeader />
            <div className="p-6 w-full bg-white shadow-lg rounded-md">
                <PipelineConfig />
            </div>
        </React.Fragment>
    );
};

export default PipelineConfigurationHome;
