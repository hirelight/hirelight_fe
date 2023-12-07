"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useMemo, useRef } from "react";

import jobServices from "@/services/job/job.service";
import { DoubleRingLoading } from "@/components";
import { JobContentJson } from "@/services";
import { sanitizeHtml } from "@/helpers/sanitizeHTML";

import styles from "./JobInfo.module.scss";

const JobInfo = () => {
    const { jobId } = useParams();
    const {
        data: jobRes,
        isLoading,
        isSuccess,
    } = useQuery({
        queryKey: ["jobs", jobId],
        queryFn: () => jobServices.getByIdAsync(jobId as string),
    });
    const parsedContent = useMemo(() => {
        if (jobRes) {
            return JSON.parse(jobRes.data.content) as JobContentJson;
        }
        return undefined;
    }, [jobRes]);

    if (isLoading)
        return (
            <div className="flex justify-center items-center py-12">
                <DoubleRingLoading />
            </div>
        );

    return (
        <div className="max-w-3xl space-y-6">
            {parsedContent &&
                Object.keys(parsedContent).map(key => (
                    <section key={key}>
                        <h3 className="mb-4">
                            <strong>
                                {key.charAt(0).toUpperCase() + key.slice(1)}
                            </strong>
                        </h3>

                        <div
                            className="ql-editor !p-0"
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(
                                    parsedContent[
                                        key as keyof typeof parsedContent
                                    ]
                                ),
                            }}
                        ></div>
                    </section>
                ))}
        </div>
    );
};

export default JobInfo;
