"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Briefcase, Key, Newspaper, UserCircle } from "@/icons";

import styles from "./Sidebar.module.scss";

const sideBarItems = [
    {
        label: "Applications",
        path: "applications",
        icon: <Briefcase />,
    },
    {
        label: "My Profile",
        path: "my-profile",
        icon: <Newspaper />,
    },
    {
        label: "Account",
        path: "account",
        icon: <UserCircle />,
    },
    {
        label: "Change password",
        path: "change-password",
        icon: <Key />,
    },
];

const Sidebar = () => {
    const { lang } = useParams();

    const pathname = usePathname();
    const cite = pathname.split("/")[3];

    return (
        <>
            <aside className="w-60 h-fit bg-white rounded-lg border border-slate-200 shadow-md overflow-hidden hidden lg:block">
                <ul className="space-y-2">
                    {sideBarItems.map(item => (
                        <li key={item.path}>
                            <Link
                                href={`/${lang}/profile/${item.path}`}
                                className={`w-full flex gap-3 px-4 py-3 text-neutral-600 hover:text-blue_primary_600 border-r-4 border-transparent transition-all ${
                                    cite === item.path ? styles.activeCite : ""
                                }`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
