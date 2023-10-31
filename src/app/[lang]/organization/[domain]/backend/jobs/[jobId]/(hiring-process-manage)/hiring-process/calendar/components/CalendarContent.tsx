"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useRef } from "react";

const CalendarContent = () => {
    const timeRef = useRef<HTMLDivElement>(null);

    return (
        <div className="flex-1 flex flex-col max-h-full">
            <div className="grid grid-cols-3 p-4">
                <div></div>
                <div className="flex items-center gap-2">
                    <button type="button">
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>
                    <strong>14-20, 08/2023</strong>
                    <button type="button">
                        <ChevronRightIcon className="w-5 h-5" />
                    </button>
                </div>
                <div>
                    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-full overflow-hidden sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full border-b border-gray-200 text-center sm:border-b-0 sm:border-r dark:border-gray-600">
                            <input
                                id="horizontal-list-radio-license"
                                type="radio"
                                value=""
                                name="list-radio"
                                className="sr-only peer"
                            />
                            <label
                                htmlFor="horizontal-list-radio-license"
                                className="w-full block py-2 px-4 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer peer-checked:text-blue_primary_800 peer-checked:font-semibold peer-checked:bg-blue-100"
                            >
                                Week
                            </label>
                        </li>
                        <li className="w-full border-b border-gray-200 text-center sm:border-b-0 sm:border-r dark:border-gray-600">
                            <input
                                id="horizontal-list-radio-id"
                                type="radio"
                                value=""
                                name="list-radio"
                                className="sr-only peer"
                            />
                            <label
                                htmlFor="horizontal-list-radio-id"
                                className="w-full block py-2 px-4 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer peer-checked:text-blue_primary_800 peer-checked:font-semibold peer-checked:bg-blue-100"
                            >
                                Month
                            </label>
                        </li>
                        <li className="w-full border-b border-gray-200 text-center sm:border-b-0 dark:border-gray-600">
                            <input
                                id="horizontal-list-radio-millitary"
                                type="radio"
                                value=""
                                name="list-radio"
                                className="sr-only peer"
                            />
                            <label
                                htmlFor="horizontal-list-radio-millitary"
                                className="w-full block py-2 px-4 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer peer-checked:text-blue_primary_800 peer-checked:font-semibold peer-checked:bg-blue-100"
                            >
                                Year
                            </label>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="relative flex-auto flex flex-col overflow-hidden">
                <div className="flex-auto flex items-stretch overflow-hidden">
                    <div
                        ref={timeRef}
                        className="h-auto flex-none flex items-start min-w-[40px] overflow-y-hidden"
                    >
                        <div className="relative ml-auto text-xs text-neutral-500">
                            {new Array(24).fill("AM").map((item, index) => (
                                <div
                                    key={index}
                                    className="h-12 relative pr-2 text-right"
                                >
                                    <span
                                        className={`block relative -top-[6px] ${
                                            index == 0 ? "hidden" : ""
                                        }`}
                                    >{`${index} ${item}`}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        className="overflow-x-auto overflow-y-scroll flex items-start flex-auto"
                        onScroll={e => {
                            if (timeRef) {
                                timeRef.current!!.scrollTop =
                                    e.currentTarget.scrollTop;
                            }
                        }}
                    >
                        <div className="min-w-full flex-none inline-flex align-top overflow-hidden relative">
                            <div className="border-t border-gray-300">
                                {new Array(24).fill("").map((item, index) => (
                                    <div
                                        key={index}
                                        className="h-12 after:content-[''] after:absolute after:z-10 after:w-full after:-mt-[1px] after:border-b after:border-gray-300"
                                    ></div>
                                ))}
                            </div>
                            <div className="w-2 border-r border-gray-300"></div>
                            {new Array(6).fill("").map((item, index) => (
                                <div
                                    key={index}
                                    className="w-[81px] min-w-[81px] flex-shrink-0 border-r border-gray-300 relative pr-3 flex-auto"
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarContent;
