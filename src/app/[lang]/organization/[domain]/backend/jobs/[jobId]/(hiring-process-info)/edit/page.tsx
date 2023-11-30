import React from "react";
import { Metadata } from "next";

import EditJobDetailForm from "../components/EditJobDetailForm";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Edit Job Detail",
};

const JobDetailEdit = async () => {
    return <EditJobDetailForm />;
};

export default JobDetailEdit;
