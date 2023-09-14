import React from "react";
import { Metadata } from "next";

import { Button, ButtonOutline } from "@/components";

import styles from "./app-form.module.scss";
import AppForm from "./components/AppForm";

export const metadata: Metadata = {
    title: "Job App Form",
};

const JobApplicationForm = () => {
    return (
        <main>
            <AppForm />
        </main>
    );
};

export default JobApplicationForm;
