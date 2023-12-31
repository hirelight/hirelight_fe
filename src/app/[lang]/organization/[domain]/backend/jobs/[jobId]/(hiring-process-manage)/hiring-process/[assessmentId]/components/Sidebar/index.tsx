"use client";

import React, { useState } from "react";
import {
    InformationCircleIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Tab } from "@headlessui/react";
import { useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setSelectAllCandidates } from "@/redux/slices/candidates.slice";
import { MinusBigIcon } from "@/icons";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./styles.module.scss";
import CandidateList from "./CandidateList/CandidateList";

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "hiring-process");

    const dispatch = useAppDispatch();
    const selectedCandidates = useAppSelector(
        state => state.candidates.selectedCandidates
    );

    const [search, setSearch] = useState("");
    const [disqualify, setDisqualify] = useState(false);

    return (
        <aside className={styles.sidebar__wrapper}>
            <Tab.Group>
                <Tab.List
                    as="div"
                    className="px-6 mt-6 h-9 flex border-b border-gray-300"
                >
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                `${styles.sidebar__tab}`,
                                selected ? styles.active : ""
                            )
                        }
                        onClick={() => setDisqualify(false)}
                    >
                        <span>{t("qualified")}</span>
                    </Tab>
                    <Tab
                        className={({ selected }) =>
                            classNames(
                                `${styles.sidebar__tab}`,
                                selected ? styles.active : ""
                            )
                        }
                        onClick={() => setDisqualify(true)}
                    >
                        <span>{t("disqualified")}</span>
                    </Tab>
                </Tab.List>
            </Tab.Group>

            <div className="p-4 xl:px-6 border-b border-gray-300">
                <div className="relative mb-4">
                    <div className="pointer-events-none absolute inset-y-0 left-2 flex items-center">
                        <MagnifyingGlassIcon className="w-6 h-6 text-neutral-600" />
                    </div>
                    <input
                        type="text"
                        className="block w-full rounded-md border-0 py-2.5 pl-10 pr-10 text-sm text-neutral-800 ring-1 ring-inset ring-gray-300  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_700 sm:sm:leading-6"
                        placeholder="Search by name, skills, tags, and more..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                        <InformationCircleIcon className="w-6 h-6 text-neutral-600" />
                    </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <label
                        htmlFor="select-all-candidates"
                        className="text-sm font-medium text-gray-900 dark:text-gray-300 relative"
                    >
                        <input
                            id="select-all-candidates"
                            type="checkbox"
                            value="all"
                            checked={selectedCandidates.length > 0}
                            className="absolute w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 cursor-pointer "
                            onChange={e => {
                                dispatch(setSelectAllCandidates());
                            }}
                        />
                        {selectedCandidates.length > 0 &&
                            selectedCandidates.length < 3 && (
                                <MinusBigIcon
                                    strokeWidth={2.2}
                                    className="absolute w-5 h-5 text-white bg-blue-600 border border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                />
                            )}
                    </label>

                    <div>
                        <button
                            type="button"
                            className="flex items-center gap-2 group hover:underline text-neutral-700"
                        >
                            <span className="text-sm font-semibold">
                                {t("newest")}
                            </span>
                            <ChevronDownIcon className="w-4 h-4 group-hover:rotate-180 transition-all" />
                        </button>
                    </div>
                </div>
            </div>
            <CandidateList disqualify={disqualify} />
        </aside>
    );
};

export default Sidebar;
