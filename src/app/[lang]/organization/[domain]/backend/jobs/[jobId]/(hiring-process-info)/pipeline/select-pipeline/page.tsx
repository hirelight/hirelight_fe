import React from "react";
import Link from "next/link";
import { Metadata } from "next";

import PipelineList from "./components/PipelineList";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Apply Flow Template",
};

const SelectPipeline = async () => {
    return (
        <React.Fragment>
            <div className="flex justify-between items-center">
                <h3 className="flex-1 text-lg font-medium text-neutral-700 mb-4 px-6">
                    Apply templates
                </h3>
                <Link
                    href={"create-flow"}
                    className="text-sm font-medium text-blue_primary_800 hover:underline mr-4"
                >
                    Create new flow
                </Link>
            </div>
            <div className="w-full bg-white shadow-lg rounded-md">
                <PipelineList />
            </div>
        </React.Fragment>
    );
};

export default SelectPipeline;
