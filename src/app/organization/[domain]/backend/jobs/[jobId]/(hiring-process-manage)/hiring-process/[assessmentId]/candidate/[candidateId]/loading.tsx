import React from "react";

import LoadingIndicator from "@/components/LoadingIndicator";

const CandidateProfileLoading = () => {
    return (
        <div className="w-full py-16 flex items-center justify-center">
            <LoadingIndicator className="w-36 h-36" />
        </div>
    );
};

export default CandidateProfileLoading;
