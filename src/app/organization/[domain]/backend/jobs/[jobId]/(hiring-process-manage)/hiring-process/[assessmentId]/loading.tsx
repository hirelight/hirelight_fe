import React from "react";

import LoadingIndicator from "@/components/LoadingIndicator";

const AssessmentInfoMainLoading = () => {
    return (
        <div className="w-full py-16 flex items-center justify-center">
            <LoadingIndicator className="w-36 h-w-36" />
        </div>
    );
};

export default AssessmentInfoMainLoading;
