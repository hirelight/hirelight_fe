"use client";

import React from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import Portal from "@/components/Portal";
import { useAppSelector } from "@/redux/reduxHooks";

import AppFormSection from "./AppFormSection";
import AddQuestionModal from "./AddQuestionModal";

const AppFormConfiguration = () => {
    const [show, setShow] = React.useState(false);
    const appFormSections = useAppSelector(state => state.appForm.datas);
    return (
        <React.Fragment>
            <Portal>
                {show && <AddQuestionModal closeModal={() => setShow(false)} />}
            </Portal>
            <div className="flex-1 flex-shrink-0 bg-white drop-shadow-lg pb-4 rounded-tr-md rounded-tl-md overflow-hidden">
                <div>
                    {appFormSections.map(section => (
                        <AppFormSection key={section.name} data={section} />
                    ))}

                    <div className="px-4" onClick={() => setShow(true)}>
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
