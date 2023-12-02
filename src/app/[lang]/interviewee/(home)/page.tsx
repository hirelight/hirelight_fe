import Image from "next/image";
import React from "react";

import background from "/public/images/interviewee_auth_bg.png";

import { Metadata } from "next";

import { MapPin, SearchIcon } from "@/icons";

import JobList from "./components/JobList";

export const metadata: Metadata = {
    title: "Jobs by Hirelight",
};

const JobsCenter = async () => {
    return (
        <main className="flex-1 w-full bg-slate-100">
            <div className="w-full pt-4 pb-6 relative shadow-md">
                <div className="absolute inset-0 opacity-20 overflow-hidden">
                    <Image
                        alt="Background"
                        src={background}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="max-w-screen-xl mx-auto px-4 md:px-10 relative">
                    <section className="mb-6">
                        <h1 className="text-2xl sm:text-4xl font-semibold mb-3">
                            Find properly jobs for you
                        </h1>
                        <span className="text-gray-500">
                            Sorem ipsum dolor sit amet, consectetur adipiscing
                            elit.
                        </span>
                    </section>
                    <div className="relative w-full flex">
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <SearchIcon className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <input
                                type="search"
                                id="jobs-query"
                                className="block w-full p-3 md:p-4 pl-8 md:pl-12 text-sm text-gray-900 border border-gray-300 rounded-tl-full rounded-bl-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Jobs you are searching for"
                                required
                            />
                        </div>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <MapPin className="w-4 h-4 md:w-6 md:h-6" />
                            </div>
                            <input
                                type="search"
                                id="jobs-location"
                                className="block w-full p-3 md:p-4 pl-8 md:pl-12 text-sm text-gray-900 border border-gray-300 bg-gray-50 rounded-tr-full rounded-br-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Location"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="absolute top-0 right-0 p-2.5 px-3 md:px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-tr-full rounded-br-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 z-20 flex gap-2 items-center"
                        >
                            <SearchIcon className="w-4 h-4" />
                            <span className="text-sm hidden md:inline-block">
                                Search
                            </span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="max-w-screen-xl mx-auto px-4 md:px-10 flex flex-col lg:flex-row gap-6 py-6 relative">
                <JobList />
            </div>
        </main>
    );
};

export default JobsCenter;
