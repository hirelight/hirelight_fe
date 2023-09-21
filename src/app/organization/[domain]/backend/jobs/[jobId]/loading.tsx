import React from "react";

import LoadingIndicator from "@/components/LoadingIndicator";

const JobDetailLoading = () => {
    return (
        <div className="w-full py-11 flex items-center justify-center">
            <LoadingIndicator />
        </div>
    );
};

export default JobDetailLoading;
