import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { QueryClient } from "@tanstack/react-query";

import endpoints from "@/utils/constants/service-endpoint";
import { IJobDto } from "@/services/job/job.interface";

import EditJobDetailForm from "../components/EditJobDetailForm";

export const metadata: Metadata = {
    title: "Edit job detail",
};

const getJobById = async (id: number): Promise<IJobDto> => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_API}${endpoints.JOBPOSTS}/${id}`,
        {
            method: "GET",
            cache: "no-store",
            headers: {
                mode: "cors",
                credentials: "same-origin",
                "Content-Type": "application/json",
                Authorization: `Bearer ${
                    cookies().get("hirelight_access_token")!!.value
                }`,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch data");
    }

    const jsonRes = await res.json();

    if (jsonRes.statusCode >= 400) throw new Error(jsonRes.message);

    return jsonRes.data;
};

const JobDetailEdit = async ({ params }: any) => {
    const data = await getJobById(params.jobId);

    return (
        <EditJobDetailForm
            data={{
                ...data,
                content: JSON.parse(data.content),
                applicationForm: JSON.parse(data.applicationForm),
            }}
        />
    );
};

export default JobDetailEdit;
