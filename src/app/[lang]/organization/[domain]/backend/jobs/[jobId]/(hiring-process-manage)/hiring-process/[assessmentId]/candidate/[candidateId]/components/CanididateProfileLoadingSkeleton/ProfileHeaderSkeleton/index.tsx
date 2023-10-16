import { MapPinIcon, PhoneIcon } from "@heroicons/react/24/solid";
import React from "react";

const ProfileHeaderSkeleton = () => {
    return (
        <div className="bg-white rounded-md border border-gray-300 mb-4 overflow-hidden">
            <div className="h-24 bg-slate-100"></div>
            <div className="p-4 xl:px-6 flex gap-8 animate-pulse">
                <div className="w-20 h-20 rounded-full bg-slate-200 overflow-hidden"></div>
                <div className="flex flex-col">
                    <div className="h-8 w-48 bg-gray-300 rounded mb-3"></div>
                    <div className="h-5 w-80 bg-slate-200 rounded mb-1"></div>
                    <div className="h-5 w-60 bg-slate-200 rounded"></div>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeaderSkeleton;
