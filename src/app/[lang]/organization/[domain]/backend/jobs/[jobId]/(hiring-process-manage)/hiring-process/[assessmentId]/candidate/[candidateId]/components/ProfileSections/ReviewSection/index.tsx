"use client";

import React from "react";
import { Tab } from "@headlessui/react";

import { useAppSelector } from "@/redux/reduxHooks";

import ReviewContent from "./ReviewContent";
import AssessmentContent from "./AssessmentContent";

function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
}

const ReviewSection = () => {
    const authUser = useAppSelector(state => state.auth.authUser);

    return (
        <div>
            <Tab.Group>
                <Tab.List className="flex rounded-md border-b border-gray-300">
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                "rounded-lg py-2.5 px-4 text-sm font-semibold leading-5 relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0.5 after:bg-blue-800 after:translate-y-1/2 after:transition-all",
                                selected
                                    ? "bg-white text-blue_primary_800 after:w-full"
                                    : "hover:bg-white/[0.12]"
                            )
                        }
                    >
                        Evaluation
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                "rounded-lg py-2.5 px-4 text-sm font-semibold leading-5 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-800 after:translate-y-1/2 after:transition-all",
                                selected
                                    ? "bg-white text-blue_primary_800 after:w-full"
                                    : "hover:bg-white/[0.12]"
                            )
                        }
                    >
                        Assessment
                    </Tab>
                </Tab.List>
                <Tab.Panels>
                    <Tab.Panel>
                        <ReviewContent />
                    </Tab.Panel>
                    <Tab.Panel>
                        <AssessmentContent />
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default ReviewSection;
