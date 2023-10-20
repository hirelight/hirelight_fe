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
import { useParams, usePathname } from "next/navigation";

import { useTranslation } from "@/components/InternationalizationProvider";

import { Locale } from "../../../../../../../../i18n.config";

import styles from "./SettingsSidebar.module.scss";

const SettingsSidebar = () => {
    const pathname = usePathname();
    const { lang } = useParams();

    const t = useTranslation(
        lang as Locale,
        "settings.components.settings_sidebar"
    );
    return (
        <aside className="min-w-[200px] w-full bg-white shadow-md rounded-md overflow-hidden">
            <ul className="w-full flex flex-col">
                <li>
                    <Link
                        href={`/${lang}/backend/settings/organization_profile`}
                        className={`${styles.tab__btn} ${
                            pathname.includes(
                                "/backend/settings/organization_profile"
                            )
                                ? styles.active
                                : ""
                        }`}
                    >
                        <BuildingOffice2Icon className="w-6 h-6" />
                        <span>{t.organization_profile}</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={`/${lang}/backend/settings/members`}
                        className={`${styles.tab__btn} ${
                            pathname.includes("/backend/settings/members")
                                ? styles.active
                                : ""
                        }`}
                    >
                        <UserGroupIcon className="w-6 h-6" />
                        <span>{t.account_members}</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={`/${lang}/backend/settings/assessment_flow`}
                        className={`${styles.tab__btn} ${
                            pathname.includes(
                                "/backend/settings/assessment_flow"
                            )
                                ? styles.active
                                : ""
                        }`}
                    >
                        <QueueListIcon className="w-6 h-6" />
                        <span>{t.assessment_flow}</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={`/${lang}/backend/settings/templates`}
                        className={`${styles.tab__btn} ${
                            pathname.includes("/backend/settings/templates")
                                ? styles.active
                                : ""
                        }`}
                    >
                        <DocumentTextIcon className="w-6 h-6" />
                        <span>{t.templates}</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={`/${lang}/backend/settings/billing`}
                        className={`${styles.tab__btn} ${
                            pathname.includes("/backend/settings/billing")
                                ? styles.active
                                : ""
                        }`}
                    >
                        <CreditCardIcon className="w-6 h-6" />
                        <span>{t.billing}</span>
                    </Link>
                </li>
                <li>
                    <Link
                        href={`/${lang}/backend/settings/integrations`}
                        className={`${styles.tab__btn} ${
                            pathname.includes("/backend/settings/integrations")
                                ? styles.active
                                : ""
                        }`}
                    >
                        <WrenchScrewdriverIcon className="w-6 h-6" />
                        <span>{t.integrations}</span>
                    </Link>
                </li>
                <li>
                    <Link href={"#"} className={`${styles.tab__btn}`}>
                        <UserGroupIcon className="w-6 h-6" />
                        <span>{t.your_profile}</span>
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default SettingsSidebar;
