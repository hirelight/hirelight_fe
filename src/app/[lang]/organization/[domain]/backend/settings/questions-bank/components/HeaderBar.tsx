"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";

const breadcrumbStructure: { [pathName: string]: string } = {
    "/questions-bank": "Questions Bank",
    "/questions-bank/create-question": "Create Question",
};

function extractSubpath(fullPath: string, paramString: string): string {
    const position = fullPath.indexOf(paramString);
    if (position !== -1) {
        const result = fullPath.slice(0, position + paramString.length);
        return result;
    } else {
        // Handle the case where the parameter string is not found in the input string
        return "#";
    }
}

// Function to parse the current URL and build the breadcrumb trail
function buildBreadcrumbs(
    curPath: string,
    fullPath: string
): { label: string; url: string }[] {
    const preffix = fullPath.replace("/" + curPath, "");
    const parts = curPath.split("/").filter(part => part !== ""); // Split the URL into parts
    const breadcrumbs = []; // Add a Home breadcrumb as the starting point
    let currentPath = "";

    for (const part of parts) {
        currentPath += `/${part}`;
        if (breadcrumbStructure[currentPath]) {
            breadcrumbs.push({
                label: breadcrumbStructure[currentPath],
                url: preffix + currentPath,
            });
        }
    }

    return breadcrumbs;
}

const HeaderBar = () => {
    const pathname = usePathname();
    const { lang } = useParams();

    return (
        <nav
            className="flex justify-between items-center px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                {buildBreadcrumbs(
                    pathname.slice(pathname.indexOf("questions-bank")),
                    pathname
                )?.map((breadcrumb, index) => (
                    <li key={index}>
                        <div className="flex items-center">
                            {index > 0 &&
                                index <
                                    buildBreadcrumbs(
                                        pathname.slice(
                                            pathname.indexOf("questions-bank")
                                        ),
                                        pathname
                                    ).length && (
                                    <svg
                                        className="w-3 h-3 mx-1 text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 6 10"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 9 4-4-4-4"
                                        />
                                    </svg>
                                )}
                            <Link
                                href={breadcrumb.url}
                                className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white"
                            >
                                {breadcrumb.label}
                            </Link>
                        </div>
                    </li>
                ))}
            </ol>
            {!pathname.includes("create-question") && (
                <Link
                    href={`/${lang}/backend/settings/questions-bank/create-question`}
                    className="flex items-center gap-1 text-sm text-blue_primary_700 font-semibold hover:underline hover:text-blue_primary_800"
                >
                    <PlusCircleIcon className="w-5 g-5" />
                    <span>Add a new question</span>
                </Link>
            )}
        </nav>
    );
};

export default HeaderBar;
