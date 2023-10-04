import React from "react";
import { Metadata } from "next";

import JobDetail from "../../../components/JobDetail";

export const metadata: Metadata = {
    title: "Edit job detail",
};

const JobDetailEdit = (props: any) => {
    return <JobDetail />;
};

export default JobDetailEdit;
