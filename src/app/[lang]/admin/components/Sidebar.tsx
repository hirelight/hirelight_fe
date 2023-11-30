"use client";

import {
    BellIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const orgManageItems = [
    {
        label: "Organization",
        url: (lang: string) => `/${lang}/organizations`,
        icon: <BuildingOfficeIcon />,
    },
    {
        label: "Account",
        url: (lang: string) => `/${lang}/org-accounts`,
        icon: <UserCircleIcon />,
    },
    {
        label: "Job Post",
        url: (lang: string) => `/${lang}/job-posts`,
        icon: <BriefcaseIcon />,
    },
    {
        label: "Email Template",
        url: (lang: string) => `#`,
        icon: <DocumentTextIcon />,
    },
];

const hirelight = [
    {
        label: "Dashboard",
        url: (lang: string) => `/${lang}/dashboard`,
        icon: <BriefcaseIcon />,
    },
    {
        label: "Subscription",
        url: (lang: string) => `/${lang}/subscription`,
        icon: <DocumentTextIcon />,
    },
];

const Sidebar = () => {
    const { lang } = useParams();

    return (
        <aside className="flex-shrink-0 min-w-[200px] bg-white drop-shadow-lg p-4">
            {/* <div className="p-6 flex justify-center items-center">
                <h1 className="text-2xl font-semibold text-neutral-700">
                    Hirelight
                </h1>
            </div> */}

            <section className="mt-6">
                <h3 className="uppercase font-semibold mb-6">
                    Organization Management
                </h3>
                <ul className="space-y-2 font-medium">
                    {orgManageItems.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.url(lang as string)}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group active:text-blue_primary_800"
                            >
                                <div className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                    {item.icon}
                                </div>
                                <span className="ms-3">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-8">
                <h3 className="uppercase font-semibold mb-6">Hirelight</h3>
                <ul className="space-y-2 font-medium">
                    {hirelight.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.url(lang as string)}
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group active:text-blue_primary_800"
                            >
                                <div className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                                    {item.icon}
                                </div>
                                <span className="ms-3">{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </aside>
    );
};

export default Sidebar;
