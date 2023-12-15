import React from "react";
import { Metadata } from "next";

import ActivityList from "./components/ActivityList";

export const metadata: Metadata = {
    title: "Hirelight - Activity Stream",
};

const JobActivites = () => {
    return (
        <div className="w-full max-w-screen-xl mx-auto my-8">
            <h3 className="uppercase text-base font-bold text-neutral-700 mb-4">
                Activity Stream
            </h3>
            <div className="bg-white p-6 rounded-md drop-shadow-lg">
                <ActivityList />
            </div>
        </div>
    );
};

export default JobActivites;
