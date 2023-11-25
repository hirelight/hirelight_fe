import React from "react";

import ApplicantList from "./components/ApplicationList";

const MyApplications = async () => {
    return (
        <div className="w-full">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm flex justify-center items-center pt-4 pb-6 mb-10">
                <div className="flex items-center gap-16">
                    <button
                        type="button"
                        className={`relative font-medium text-lg transition-all after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-blue_primary_800 after:mt-2 after:rounded-full after:transition-all`}
                    >
                        Wait for response
                    </button>
                    <button
                        type="button"
                        className={`relative font-medium text-lg transition-all after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-blue_primary_800 after:mt-2 after:rounded-full after:transition-all`}
                    >
                        In interview progress
                    </button>
                    <button
                        type="button"
                        className={`relative font-medium text-lg transition-all after:content-[""] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:h-1 after:w-0 after:bg-blue_primary_800 after:mt-2 after:rounded-full after:transition-all`}
                    >
                        Finished
                    </button>
                </div>
            </div>
            <div>
                <ApplicantList />
            </div>
        </div>
    );
};

export default MyApplications;
