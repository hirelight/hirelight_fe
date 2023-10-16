"use client";

import Link from "next/link";
import React from "react";
import {
    BuildingOffice2Icon,
    CreditCardIcon,
    DocumentTextIcon,
    QueueListIcon,
    UserGroupIcon,
    UserIcon,
    WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

import styles from "./SettingsSidebar.module.scss";

const SettingsSidebar = () => {
    const pathname = usePathname();
    return (
        <aside className="min-w-[200px] w-full bg-white shadow-md rounded-md overflow-hidden">
            <ul className="w-full flex flex-col">
                <li>
                    <Link
                        href={"/backend/settings/organization_profile"}
                        className={`${styles.tab__btn} ${
                            pathname.includes(
                                "/backend/settings/organization_profile"
                            )
                                ? styles.active
                                : ""
                        }`}
                    >
                        <BuildingOffice2Icon className="w-6 h-6" />
                        <span>Organization Profile</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/backend/settings/members"}
                        className={`${styles.tab__btn} ${
                            pathname.includes("/backend/settings/members")
                                ? styles.active
                                : ""
                        }`}
                    >
                        <UserGroupIcon className="w-6 h-6" />
                        <span>Account members</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/backend/settings/assessment_flow"}
                        className={`${styles.tab__btn} ${
                            pathname.includes(
                                "/backend/settings/assessment_flow"
                            )
                                ? styles.active
                                : ""
                        }`}
                    >
                        <QueueListIcon className="w-6 h-6" />
                        <span>Assessment flow</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/backend/settings/templates"}
                        className={`${styles.tab__btn} ${
                            pathname.includes("/backend/settings/templates")
                                ? styles.active
                                : ""
                        }`}
                    >
                        <DocumentTextIcon className="w-6 h-6" />
                        <span>Templates</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/backend/settings/billing"}
                        className={`${styles.tab__btn} ${
                            pathname.includes("/backend/settings/billing")
                                ? styles.active
                                : ""
                        }`}
                    >
                        <CreditCardIcon className="w-6 h-6" />
                        <span>Billing</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/backend/settings/integrations"}
                        className={`${styles.tab__btn} ${
                            pathname.includes("/backend/settings/integrations")
                                ? styles.active
                                : ""
                        }`}
                    >
                        <WrenchScrewdriverIcon className="w-6 h-6" />
                        <span>Intergrations</span>
                    </Link>
                </li>
                <li>
                    <Link href={"#"} className={`${styles.tab__btn}`}>
                        <UserGroupIcon className="w-6 h-6" />
                        <span>Your profile</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default SettingsSidebar;
