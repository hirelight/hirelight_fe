"use client";

import React from "react";
import { Tab } from "@headlessui/react";

import ApplicantList from "./components/ApplicationList";
import MeetingList from "./components/MeetingList";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const tabs = {
    Assessments: <ApplicantList />,
    Meetings: <MeetingList />,
};

const MyApplications = () => {
    return (
        <div className="w-full">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                    {Object.keys(tabs).map(tab => (
                        <Tab
                            key={tab}
                            className={({ selected }) =>
                                classNames(
                                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                                    "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                                    selected
                                        ? "bg-white text-blue-700 shadow"
                                        : "text-white hover:bg-white/[0.12]"
                                )
                            }
                        >
                            {tab}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    {Object.values(tabs).map((val, idx) => (
                        <Tab.Panel key={idx}>{val}</Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
            {/* <ApplicantList /> */}
        </div>
    );
};

export default MyApplications;
