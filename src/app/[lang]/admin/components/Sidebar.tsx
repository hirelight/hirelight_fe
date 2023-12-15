"use client";

import {
    ArrowLeftOnRectangleIcon,
    BellIcon,
    BriefcaseIcon,
    BuildingOfficeIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";

import { logout } from "@/redux/slices/auth.slice";
import { useAppDispatch } from "@/redux/reduxHooks";

const orgManageItems = [
    {
        label: "Organization",
        url: (lang: string) => `/${lang}/organizations`,
        icon: <BuildingOfficeIcon />,
    },

    {
        label: "Job Post",
        url: (lang: string) => `/${lang}/job-posts`,
        icon: <BriefcaseIcon />,
    },
    // {
    //     label: "Email Template",
    //     url: (lang: string) => `#`,
    //     icon: <DocumentTextIcon />,
    // },
];

const hirelight = [
    // {
    //     label: "Account",
    //     url: (lang: string) => `/${lang}/accounts`,
    //     icon: <UserCircleIcon />,
    // },
    // {
    //     label: "Dashboard",
    //     url: (lang: string) => `/${lang}/dashboard`,
    //     icon: <BriefcaseIcon />,
    // },
    {
        label: "Transactions",
        url: (lang: string) => `/${lang}/transactions`,
        icon: <DocumentTextIcon />,
    },
    {
        label: "Subscription",
        url: (lang: string) => `/${lang}/subscription`,
        icon: <DocumentTextIcon />,
    },
];

const Sidebar = () => {
    const { lang } = useParams();
    const pathname = usePathname();

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleLogout = () => {
        dispatch(logout());
        router.replace(
            `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${lang}/login?authEnd=true`
        );
    };

    return (
        <aside className="flex-shrink-0 min-w-[200px] flex flex-col bg-white drop-shadow-lg p-4">
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
                                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                                    pathname.includes(item.url(lang as string))
                                        ? "bg-gray-100"
                                        : ""
                                }`}
                            >
                                <div
                                    className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
                                        pathname.includes(
                                            item.url(lang as string)
                                        )
                                            ? "text-gray-900"
                                            : ""
                                    }`}
                                >
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
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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

            <div className="mt-auto">
                <button
                    type="button"
                    className="w-full flex items-center gap-2 p-4 text-neutral-700 hover:text-neutral-900"
                    onClick={handleLogout}
                >
                    <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
