import React from "react";

import ProfileHeaderSkeleton from "./ProfileHeaderSkeleton";
import ProfileSectionSkeleton from "./ProfileSectionSkeletion";

const CanididateProfileLoadingSkeleton = () => {
    return (
        <div className="w-full min-h-screen flex flex-col mb-10 relative">
            <ProfileHeaderSkeleton />
            <ProfileSectionSkeleton />
        </div>
    );
};

export default CanididateProfileLoadingSkeleton;
