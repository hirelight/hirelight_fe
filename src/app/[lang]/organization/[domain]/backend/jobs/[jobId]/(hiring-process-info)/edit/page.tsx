import React from "react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { QueryClient } from "@tanstack/react-query";

import endpoints from "@/utils/constants/service-endpoint";
import { IJobDto } from "@/services/job/job.interface";
import { checkResErr } from "@/helpers/resErrHelpers";

import EditJobDetailForm from "../components/EditJobDetailForm";

export const metadata: Metadata = {
    title: "Edit job detail",
};

const JobDetailEdit = async ({ params }: any) => {
    return <EditJobDetailForm />;
};

export default JobDetailEdit;
