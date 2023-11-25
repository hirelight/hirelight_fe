import React from "react";

const ProfileSectionSkeleton = () => {
    return (
        <div className="flex-1 bg-white rounded-md border border-gray-300 mb-4 overflow-hidden p-6">
            <div className="animate-pulse">
                <div className="h-7 w-28 bg-gray-300 rounded mb-6"></div>
                <div className="h-5 w-48 bg-slate-200 rounded mb-4"></div>
                <div role="status" className="max-w-sm mb-6">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>

                <div className="w-full min-h-[300px] bg-gray-200 rounded"></div>
            </div>
        </div>
    );
};

export default ProfileSectionSkeleton;
