import React from "react";
import { Metadata } from "next";
import Link from "next/link";

import PipelineConfig from "./components/PipelineConfig";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Pipeline Configuration",
};

const PipelineConfigurationHome = () => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-neutral-700 mb-4 px-6">
                    Default pipeline
                </h3>
                <Link
                    href={"select-pipeline"}
                    className="text-sm font-medium text-blue_primary_800 hover:underline"
                >
                    Change pipeline
                </Link>
            </div>
            <div className="p-6 w-full bg-white shadow-lg rounded-md">
                <PipelineConfig />
            </div>
        </div>
    );
};

export default PipelineConfigurationHome;
