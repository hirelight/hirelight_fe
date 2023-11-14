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
            <div className="flex justify-between items-center mb-4 px-4 xl:px-6">
                <h3 className="flex-1 text-lg font-medium text-neutral-700">
                    Default pipeline
                </h3>
                <Link
                    href={`${flowId}/edit`}
                    className="text-sm font-medium hover:underline"
                >
                    Edit pipeline
                </Link>
            </div>
            <div className="p-6 w-full bg-white shadow-lg rounded-md">
                <PipelineConfig />
            </div>
        </React.Fragment>
    );
};

export default PipelineConfigurationHome;
