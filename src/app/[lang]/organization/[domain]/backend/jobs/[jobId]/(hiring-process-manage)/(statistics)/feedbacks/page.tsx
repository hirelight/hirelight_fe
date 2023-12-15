import { Metadata } from "next";
import React from "react";

import FeedbackList from "./components/FeedbackList";

export const metadata: Metadata = {
    title: "Hirelight - Job Post Feedbacks",
};

const JobFeedbacksPage = () => {
    return (
        <main className="max-w-screen-xl mx-auto">
            <div className="bg-white p-6 rounded-md drop-shadow-lg">
                <h3 className="uppercase text-base font-bold text-neutral-700 mb-4">
                    Feedbacks
                </h3>
                <FeedbackList />
            </div>
        </main>
    );
};

export default JobFeedbacksPage;
