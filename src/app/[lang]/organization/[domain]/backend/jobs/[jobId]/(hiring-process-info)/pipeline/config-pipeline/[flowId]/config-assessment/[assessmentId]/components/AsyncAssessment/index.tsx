"use client";

import React from "react";

import AsyncVideoForm from "./AsyncVideoForm";

const AsyncAssessmentConfig = () => {
    return (
        <div className="bg-white py-6 drop-shadow-md rounded-md">
            <h2 className="text-xl text-neutral-700 text-center font-medium px-4 xl:px-6 mb-8">
                Create your video interview
            </h2>
            <AsyncVideoForm />
        </div>
    );
};

export default AsyncAssessmentConfig;
