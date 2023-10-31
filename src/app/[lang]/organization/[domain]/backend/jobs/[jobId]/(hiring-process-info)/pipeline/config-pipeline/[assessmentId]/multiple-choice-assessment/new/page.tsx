import React from "react";

import CreateAssessmentForm from "./components/CreateAssessmentForm";

const NewMCAssessment = () => {
    return (
        <div className="bg-white py-6 drop-shadow-md rounded-md">
            <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                Create multiple choice question set
            </h2>
            <CreateAssessmentForm />
        </div>
    );
};

export default NewMCAssessment;
