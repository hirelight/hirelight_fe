import React from "react";
import { Metadata } from "next";

import AppForm from "./components/AppForm";

export const metadata: Metadata = {
    title: "Hirelight - Backend | Job Application Form",
};

const JobApplicationForm = async () => {
    return (
        <main>
            <AppForm />
        </main>
    );
};

export default JobApplicationForm;
