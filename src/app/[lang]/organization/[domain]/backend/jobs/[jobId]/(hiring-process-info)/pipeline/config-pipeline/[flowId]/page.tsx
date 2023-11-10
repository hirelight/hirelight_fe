import React from "react";
import { Metadata } from "next";
import Link from "next/link";

import PipelineConfig from "./components/PipelineConfig";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Pipeline Configuration",
};

const PipelineConfigurationHome = ({ params }: any) => {
    const { flowId } = params;
    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <h3 className="flex-1 text-lg font-medium text-neutral-700 mb-4 px-6">
                    Default pipeline
                </h3>
                <Link href={`${flowId}/edit`}>Change pipeline</Link>
            </div>
            <div className="p-6 w-full bg-white shadow-lg rounded-md">
                <PipelineConfig />
            </div>
        </React.Fragment>
    );
};

export default PipelineConfigurationHome;
