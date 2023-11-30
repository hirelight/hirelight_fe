"use client";

import Image from "next/image";
import React, { useState } from "react";

import logo from "/public/images/logo.svg";

import { TrashIcon } from "@heroicons/react/24/outline";
import { Tab } from "@headlessui/react";

import OrgInfo from "./components/OrgInfo";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const OrganizationDetail = () => {
    // let [tabs] = useState({
    //     Detail: <OrgInfo />,
    //     Jobs: null,
    //     Emp
    // })

    return (
        <div className="pt-8 px-6 relative">
            <div className="w-full flex items-center gap-4 bg-white p-6 rounded-md shadow-md">
                <Image
                    alt="Organization Logo"
                    src={logo}
                    width={300}
                    height={300}
                    className="h-8 w-auto object-contain"
                />

                <div className="flex-1">
                    <h4 className="text-blue_primary_800 font-semibold">
                        Organiation name
                    </h4>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <div>hirelight@gmail.com</div>
                        &#8226;
                        <div>Industry</div>
                        &#8226;
                        <div>20 jobs</div>
                        &#8226;
                        <div>20 employees</div>
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        className="p-1 text-red-500 rounded hover:text-red-700 hover:bg-red-50 transition-all"
                    >
                        <TrashIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>

            <Tab.Group
                as="div"
                className={
                    "min-w-[675px] max-w-full w-fit bg-white p-6 mt-6 mx-auto rounded-md shadow-md "
                }
            >
                <Tab.List className="w-full flex justify-center gap-6 mb-4">
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
                        Jobs
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
                        Employees
                    </Tab>
                </Tab.List>

                <Tab.Panels>
                    <Tab.Panel>
                        <OrgInfo />
                    </Tab.Panel>
                    <Tab.Panel>
                        <div>jobs</div>
                    </Tab.Panel>
                    <Tab.Panel>
                        <div>emloyees</div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    );
};

export default OrganizationDetail;
