import React from "react";
import { Metadata } from "next";

import JobList from "./components/JobList";

export const metadata: Metadata = {
    title: "Hirelight | Jobs Center",
};

const JobsCenter = () => {
    return (
        <main className="flex-1 w-full bg-slate-100">
            <JobList />
        </main>
    );
};

export default JobsCenter;
