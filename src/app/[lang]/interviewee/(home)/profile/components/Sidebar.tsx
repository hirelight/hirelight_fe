"use client";

import React from "react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

import { Briefcase, Key, Newspaper, UserCircle } from "@/icons";

import styles from "./Sidebar.module.scss";

const Sidebar = () => {
    const { lang } = useParams();

    const pathname = usePathname();
    const cite = pathname.split("/")[3];

    return (
        <>
            <aside className="w-60 h-fit bg-white rounded-lg border border-slate-200 shadow-md overflow-hidden hidden lg:block">
                <ul className="space-y-2">
                    <li>
                        <Link
                            href={`/${lang}/profile/applications`}
                            className={`w-full flex gap-3 px-4 py-3 text-neutral-600 hover:text-blue_primary_600 border-r-4 border-transparent transition-all ${
                                cite === "applications" ? styles.activeCite : ""
                            }`}
                        >
                            <Briefcase />
                            <span>Applications</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/${lang}/profile/my-profile`}
                            className={`w-full flex gap-3 px-4 py-3 text-neutral-600 hover:text-blue_primary_600 border-r-4 border-transparent transition-all ${
                                cite === "my-profile" ? styles.activeCite : ""
                            }`}
                        >
                            <Newspaper />
                            <span>My Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/${lang}/profile/account`}
                            className={`w-full flex gap-3 px-4 py-3 text-neutral-600 hover:text-blue_primary_600 border-r-4 border-transparent transition-all ${
                                cite === "account" ? styles.activeCite : ""
                            }`}
                        >
                            <UserCircle />
                            <span>Account</span>
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/${lang}/profile/chnage-password`}
                            className={`w-full flex gap-3 px-4 py-3 text-neutral-600 hover:text-blue_primary_600 border-r-4 border-transparent transition-all ${
                                cite === "change-password"
                                    ? styles.activeCite
                                    : ""
                            }`}
                        >
                            <Key />
                            <span>Change Password</span>
                        </Link>
                    </li>
                </ul>
            </aside>
        </>
    );
};

export default Sidebar;
