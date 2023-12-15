import React from "react";
import { Metadata } from "next";

import ReportList from "./components/ReportList";

export const metadata: Metadata = {
    title: "Hirelight - Job Post Reports",
};

const JobReportPage = () => {
    return (
        <main className="max-w-screen-xl mx-auto">
            <div className="bg-white p-6 rounded-md drop-shadow-lg">
                <h3 className="uppercase text-base font-bold text-neutral-700 mb-4">
                    Job post reports
                </h3>
                <ReportList />
            </div>
        </main>
    );
};

export default JobReportPage;
