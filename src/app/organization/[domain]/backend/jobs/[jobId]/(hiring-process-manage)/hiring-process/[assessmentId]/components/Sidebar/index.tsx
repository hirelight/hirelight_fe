"use client";

import React from "react";
import {
    InformationCircleIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import {
    ArrowDownIcon,
    ChevronDownIcon,
    PlayIcon,
} from "@heroicons/react/24/solid";

import { useAppDispatch } from "@/redux/reduxHooks";
import { setSelectAllCandidates } from "@/redux/slices/candidates.slice";
import { Portal } from "@/components";

import styles from "./styles.module.scss";
import CandidateList from "./CandidateList/CandidateList";

const Sidebar = () => {
    const dispatch = useAppDispatch();

    const [selectedTab, setSelectedTab] = React.useState(0);
    const [showSidebar, setShowSidebar] = React.useState(true);

    return (
        <div className={styles.sidebar__wrapper}>
            <div className="border-b border-gray-300">
                <div role="tablist" className="px-6 mt-6 h-9 flex">
                    <button
                        type="button"
                        role="tab"
                        className={`${styles.sidebar__tab} ${
                            selectedTab === 0 ? styles.active : ""
                        }`}
                        onClick={() => setSelectedTab(0)}
                    >
                        <span>Qualified</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        className={`${styles.sidebar__tab} ${
                            selectedTab === 1 ? styles.active : ""
                        }`}
                        onClick={() => setSelectedTab(1)}
                    >
                        <span>Disqualified</span>
                    </button>
                </div>
            </div>
            <div>
                <div className="p-4 xl:px-6 border-b border-gray-300">
                    <div className="relative mb-4">
                        <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                            <MagnifyingGlassIcon className="w-6 h-6 text-neutral-600" />
                        </div>
                        <input
                            type="text"
                            className="block w-full rounded-md border-0 py-2.5 pl-10 pr-10 text-sm text-neutral-800 ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_700 sm:sm:leading-6"
                            placeholder="Search by name, skills, tags, and more..."
                            // value={search}
                            // onChange={e => setSearch(e.target.value)}
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                            <InformationCircleIcon className="w-6 h-6 text-neutral-600" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <label
                            htmlFor="select-all-candidates"
                            className="text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            <input
                                id="select-all-candidates"
                                type="checkbox"
                                value="all"
                                className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                onChange={e => {
                                    dispatch(setSelectAllCandidates());
                                }}
                            />
                        </label>

                        <div>
                            <button
                                type="button"
                                className="flex items-center gap-2 group hover:underline text-neutral-700"
                            >
                                <span className="text-sm font-semibold">
                                    Newest
                                </span>
                                <ChevronDownIcon className="w-4 h-4 group-hover:rotate-180 transition-all" />
                            </button>
                        </div>
                    </div>
                </div>
                <CandidateList />
            </div>
        </div>
    );
};

export default Sidebar;
