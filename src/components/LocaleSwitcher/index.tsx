"use client";

import { usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { GlobeAltIcon } from "@heroicons/react/24/outline";

import { useOutsideClick } from "@/hooks/useClickOutside";

import { i18n } from "../../../i18n.config";

import styles from "./styles.module.scss";

const LocaleSwitcher = () => {
    const pathName = usePathname();
    const [showDropdown, setShowDropdown] = React.useState(false);

    const localeWrapperRef = useOutsideClick<HTMLDivElement>(() =>
        setShowDropdown(false)
    );

    const redirectedPathName = (locale: string) => {
        if (!pathName) return "/";
        const segments = pathName.split("/");
        segments[1] = locale;
        return segments.join("/");
    };

    return (
        <div
            className="relative text-left border-inherit text-inherit"
            ref={localeWrapperRef}
        >
            <button
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative p-1 rounded-md border border-inherit text-inherit"
            >
                <GlobeAltIcon className="w-6 h-6 text-inherit" />
            </button>
            <ul
                className={`${styles.locale__dropdown__wrapper} ${
                    showDropdown ? styles.entering : styles.leaving
                }`}
            >
                {i18n.locales.map(locale => {
                    return (
                        <li key={locale}>
                            <Link
                                href={redirectedPathName(locale)}
                                className={styles.locale__dropdown__btn}
                                onClick={() => setShowDropdown(false)}
                            >
                                {locale}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default LocaleSwitcher;
