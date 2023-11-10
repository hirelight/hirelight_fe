"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const TitleHeader = () => {
    const { jobId } = useParams();
    const router = useRouter();
    return (
        <div className="flex items-center justify-between mb-4 px-4 xl:px-6">
            <h3 className=" ext-lg font-medium text-neutral-700">
                Default pipeline
            </h3>
            <button
                type="button"
                className="text-sm font-medium text-neutral-700 hover:underline"
                onClick={() => router.back()}
            >
                Cancel & return
            </button>
        </div>
    );
};

export default TitleHeader;
