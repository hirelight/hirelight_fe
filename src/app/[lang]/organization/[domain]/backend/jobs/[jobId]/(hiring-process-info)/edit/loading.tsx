import React from "react";

import LoadingIndicator from "@/components/LoadingIndicator";

const Loading = () => {
    return (
        <div className="w-full flex justify-center items-center pt-16">
            <LoadingIndicator />
        </div>
    );
};

export default Loading;
