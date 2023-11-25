import React from "react";

const JobListSkeleton = () => {
    return (
        <div>
            <div className="bg-white rounded-md border border-gray-300 mb-4 overflow-hidden">
                <div className="p-4 xl:px-6 flex flex-col gap-4 animate-pulse">
                    <div className="flex items-end gap-4 mb-3">
                        <div className="h-8 w-40 bg-gray-300 rounded"></div>
                        <div className="h-5 w-48 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-full flex justify-around items-center">
                        {new Array(5).fill("").map((_, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 w-24 h-24 rounded bg-slate-200 overflow-hidden"
                            ></div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="h-5 w-60 bg-slate-300 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobListSkeleton;
