import React from "react";

import RadioCategory from "./RadioCategory";
import FilterDrawer from "./FilterDrawer";

const JobsCenterCategory = () => {
    return (
        <aside className="w-full lg:max-w-xs overflow-visible flex gap-2 sm:gap-0 items-center justify-between px-8 py-6 bg-white rounded-lg shadow-lg border border-slate-200 lg:h-fit lg:gap-0 lg:block">
            <h3 className="hidden lg:block text-neutral-700 font-semibold text-xl mb-6">
                Categories
            </h3>
            <h4 className="text-neutral-700 font-medium text-lg mb-1 hidden lg:block">
                Salary
            </h4>

            <div
                className="hidden lg:inline-flex rounded-md shadow-sm mb-4"
                role="group"
            >
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-tl-full rounded-bl-full hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                    Hours
                </button>
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                    Months
                </button>
                <button
                    type="button"
                    className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-tr-full rounded-br-full hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                >
                    Anually
                </button>
            </div>

            <div>
                <RadioCategory
                    title="Salary"
                    type="radio"
                    options={[
                        "> 1000 000",
                        "> 3 000 000",
                        "> 5 000 000",
                        "> 10 000 000",
                    ]}
                />
            </div>
            <div className="hidden sm:block">
                <RadioCategory
                    title="Date posted"
                    type="radio"
                    options={[
                        "All",
                        "24 hours ago",
                        "3 days ago",
                        "7 days ago",
                    ]}
                />
            </div>
            <div className="hidden semi-sm:block">
                <RadioCategory
                    title="Experience level"
                    type="checkbox"
                    options={[
                        "Internship",
                        "Entry level",
                        "Associate",
                        "Mid-Senior level",
                        "Director",
                        "Executive",
                    ]}
                />
            </div>
            <div className="hidden md:block">
                <RadioCategory
                    title="Job type"
                    type="checkbox"
                    options={["Full-time", "Contract", "Part-time"]}
                />
            </div>
            <div className="hidden lg:block">
                <RadioCategory
                    title="On-site/remote"
                    type="checkbox"
                    options={["Remote", "On-site", "Hybrid"]}
                />
            </div>
            <FilterDrawer />
        </aside>
    );
};

export default JobsCenterCategory;
