import React from "react";
import { Metadata } from "next";
import Link from "next/link";

import PipelineConfig from "./components/PipelineConfig";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Pipeline Configuration",
};

const PipelineConfigurationHome = () => {
    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <h3 className="flex-1 text-lg font-medium text-neutral-700 mb-4 px-6">
                    Default pipeline
                </h3>
                <Link
                    href={"create-flow"}
                    className="text-sm font-medium text-blue_primary_800 hover:underline mr-4"
                >
                    Create new flow
                </Link>
                <Link
                    href={"select-pipeline"}
                    className="text-sm font-medium text-blue_primary_800 hover:underline mr-4 xl:mr-6"
                >
                    Change flow
                </Link>
            </div>
            <div className="p-6 w-full bg-white shadow-lg rounded-md">
                <PipelineConfig />
            </div>
        </React.Fragment>
    );
};

export default PipelineConfigurationHome;
