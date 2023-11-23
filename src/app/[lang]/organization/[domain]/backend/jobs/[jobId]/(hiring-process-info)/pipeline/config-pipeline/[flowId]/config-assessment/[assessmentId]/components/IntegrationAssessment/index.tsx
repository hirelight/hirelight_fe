import React from "react";

import IntegrationForm from "./IntegrationForm";

const IntegrationAssessmentConfig = () => {
    return (
        <div className="bg-white py-6 drop-shadow-md rounded-md">
            <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                Integration assessment
            </h2>
            <IntegrationForm />
        </div>
    );
};

export default IntegrationAssessmentConfig;
