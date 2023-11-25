import React from "react";

import LoadingIndicator from "@/components/LoadingIndicator";

import AuthenWrapper from "./components/AuthenWrapper";

const DomainPage = () => {
    return (
        <div className="w-full flex items-center justify-center py-80">
            <LoadingIndicator />
        </div>
    );
};

export default DomainPage;
