"use client";

import React from "react";
import ReactDOM from "react-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import {
    detailsFields,
    personalInfoFields,
    profileFields,
} from "@/utils/shared/initialDatas";

import AppFormSection from "./AppFormSection";
import AddQuestionModal from "./AddQuestionModal";

const AppFormConfiguration = () => {
    React.useEffect(() => {
        const portalContainer = document.createElement("div"); // Create a container element
        document.body.appendChild(portalContainer);
        ReactDOM.createPortal(<AddQuestionModal />, portalContainer);

        return () => {};
    }, []);

    return (
        <React.Fragment>
            <div className="flex-1 flex-shrink-0 bg-white drop-shadow-lg pb-4 rounded-tr-md rounded-tl-md overflow-hidden">
                <div>
                    <AppFormSection
                        title="Personal information"
                        fields={personalInfoFields}
                    />
                    <AppFormSection title="Profile" fields={profileFields} />
                    <AppFormSection title="Details" fields={detailsFields} />
                    <div className="px-4">
                        <button
                            type="button"
                            className="flex items-center text-blue_primary_800 hover:underline font-medium"
                        >
                            <span>
                                <PlusCircleIcon className="w-5 h-5 mr-1" />
                            </span>
                            Add a question
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AppFormConfiguration;
