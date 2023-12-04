"use client";

import { Tab } from "@headlessui/react";
import React from "react";

import JobInfo from "./components/JobInfo";
import ReportList from "./components/ReportList";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const JobDetail = () => {
    return (
        <Tab.Group
            as="div"
            className={"min-w-[675px] max-w-full p-6 mt-6 mx-auto rounded-md"}
        >
            <Tab.List className="w-full bg-white flex justify-center gap-6 mb-4">
                <Tab
                    className={({ selected }) =>
                        classNames(
                            "text-sm font-semibold leading-5 px-4 py-2 relative focus:outline-none",
                            "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-blue_primary_800 after:transition-all hover:after:w-full",
                            selected
                                ? "text-blue_primary_800 after:w-full"
                                : "after:w-0"
                        )
                    }
                >
                    Detail
                </Tab>
                <Tab
                    className={({ selected }) =>
                        classNames(
                            "text-sm font-semibold leading-5 px-4 py-2 relative focus:outline-none",
                            "after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:bg-blue_primary_800 after:transition-all hover:after:w-full",
                            selected
                                ? "text-blue_primary_800 after:w-full"
                                : "after:w-0"
                        )
                    }
                >
                    Reports
                </Tab>
            </Tab.List>

            <Tab.Panels className="flex justify-center">
                <Tab.Panel className="max-w-4xl bg-white p-6 shadow-md">
                    <JobInfo />
                </Tab.Panel>
                <Tab.Panel className={"p-6 bg-white w-full shadow-md"}>
                    <ReportList />
                </Tab.Panel>
            </Tab.Panels>
        </Tab.Group>
    );
};

export default JobDetail;
