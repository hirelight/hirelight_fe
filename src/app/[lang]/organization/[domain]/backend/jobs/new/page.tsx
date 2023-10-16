import React from "react";
import { Metadata } from "next";

import JobDetail from "../components/JobDetail";

export const metadata: Metadata = {
    title: "Create new hiring pipeline",
};

const NewJob = (props: any) => {
    return <JobDetail />;
};

export default NewJob;
