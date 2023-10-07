"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const TitleHeader = () => {
    const { jobId } = useParams();
    return (
        <div className="flex items-center justify-between mb-4 px-4 xl:px-6">
            <h3 className=" ext-lg font-medium text-neutral-700">
                Default pipeline
            </h3>
            <Link
                href={`/backend/jobs/${jobId}/pipeline/config-pipeline`}
                className="text-sm font-medium text-neutral-700 hover:underline"
            >
                Cancel & return
            </Link>
        </div>
    );
};

export default TitleHeader;
