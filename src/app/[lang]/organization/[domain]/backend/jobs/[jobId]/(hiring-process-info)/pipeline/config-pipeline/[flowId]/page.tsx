import React from "react";
import { Metadata } from "next";

import LoadingIndicator from "@/components/LoadingIndicator";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Assessment Flow Configuration",
};

const PipelineConfigurationHome = () => {
    return (
        <div className="w-full py-11 flex items-center justify-center">
            <LoadingIndicator />
        </div>
    );
};

export default PipelineConfigurationHome;
