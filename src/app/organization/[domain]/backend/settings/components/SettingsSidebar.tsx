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

import styles from "./SettingsSidebar.module.scss";

const SettingsSidebar = () => {
    return (
        <aside className="min-w-[200px] w-1/4 bg-white shadow-md rounded-md overflow-hidden">
            <ul className="w-full flex flex-col">
                <li>
                    <Link
                        href={"/careers_page"}
                        className={`${styles.tab__btn} ${styles.active}`}
                    >
                        <BuildingOffice2Icon className="w-6 h-6" />
                        <span>Organization Profile</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/careers_page"}
                        className={`${styles.tab__btn}`}
                    >
                        <UserGroupIcon className="w-6 h-6" />
                        <span>Account members</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/careers_page"}
                        className={`${styles.tab__btn}`}
                    >
                        <QueueListIcon className="w-6 h-6" />
                        <span>Assessment flow</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/careers_page"}
                        className={`${styles.tab__btn}`}
                    >
                        <DocumentTextIcon className="w-6 h-6" />
                        <span>Templates</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/careers_page"}
                        className={`${styles.tab__btn}`}
                    >
                        <CreditCardIcon className="w-6 h-6" />
                        <span>Billing</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/careers_page"}
                        className={`${styles.tab__btn}`}
                    >
                        <WrenchScrewdriverIcon className="w-6 h-6" />
                        <span>Intergrations</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={"/careers_page"}
                        className={`${styles.tab__btn}`}
                    >
                        <UserIcon className="w-6 h-6" />
                        <span>Your profile</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default SettingsSidebar;
