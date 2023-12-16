"use client";

import Image from "next/image";
import React, { useState } from "react";

import logo from "/public/images/logo.svg";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { UserCircleIcon } from "@heroicons/react/24/solid";

import { Bell } from "@/icons";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { LocaleSwitcher, UserAvatar } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { logout } from "@/redux/slices/auth.slice";
import { useI18NextTranslation } from "@/utils/i18n/client";

import { Locale } from "../../../../../../i18n.config";

import styles from "./HeaderBar.module.scss";
import InvitationDropDown from "./InvitationDropDown";

const HeaderBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { lang } = useParams();
    const cite = pathname.split("/")[1];

    const { t } = useI18NextTranslation(lang as Locale, "domain-page", {
        keyPrefix: "components.header_bar",
    });

    const dispatch = useAppDispatch();

    const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

    const { authUser } = useAppSelector(state => state.auth);
    const avatarDropdownRef = useOutsideClick<HTMLDivElement>(() =>
        setShowAvatarDropdown(false)
    );

    const handleLogout = async () => {
        setShowAvatarDropdown(false);
        dispatch(logout());
    };

    return (
        <header className="bg-white shadow-md relative z-10">
            <div className="max-w-screen-xl mx-auto px-4 xl:px-6 flex items-center justify-between py-4">
                <Link
                    href={`/${lang}/backend`}
                    className="flex gap-2 items-center"
                >
                    <Image
                        alt="Logo"
                        src={logo}
                        className="w-11 aspect-square object-contain"
                    />
                    <span className="text-xl font-semibold text-neutral-700">
                        Hirelight
                    </span>
                </Link>
                <nav>
                    <ul className="hidden md:flex gap-6 text-lg">
                        <li>
                            <Link
                                href={`/${lang}/backend`}
                                className={`${
                                    cite === "backend"
                                        ? "text-blue-800"
                                        : "text-blue_primary_600"
                                } hover:text-blue_primary_800 font-medium`}
                            >
                                {t("link.jobs")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/candidates"}
                                className={`${
                                    cite === "candidates"
                                        ? "text-blue-800"
                                        : "text-blue_primary_600"
                                } hover:text-blue_primary_800 font-medium`}
                            >
                                {t("link.candidates")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/dashboard"}
                                className={`${
                                    cite === "dashboard"
                                        ? "text-blue-800"
                                        : "text-blue_primary_600"
                                } hover:text-blue_primary_800 font-medium`}
                            >
                                {t("link.dashboard")}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={"/calendar"}
                                className={`${
                                    cite === "calendar"
                                        ? "text-blue-800"
                                        : "text-blue_primary_600"
                                } hover:text-blue_primary_800 font-medium`}
                            >
                                {t("link.calendar")}
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex gap-6 items-center">
                    <InvitationDropDown />
                    <div className="flex gap-4 text-neutral-700 border-gray-400">
                        <LocaleSwitcher />
                    </div>
                    {authUser && (
                        <div
                            className="relative inline-block text-left"
                            ref={avatarDropdownRef}
                        >
                            <button
                                type="button"
                                className={styles.avatar__btn}
                                onClick={() =>
                                    setShowAvatarDropdown(!showAvatarDropdown)
                                }
                            >
                                <UserAvatar avatarUrl={authUser.avatarUrl} />
                            </button>
                            <div
                                className={`${
                                    styles.avatar__dropdown__wrapper
                                } ${
                                    showAvatarDropdown
                                        ? styles.entering
                                        : styles.leaving
                                }`}
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex={-1}
                            >
                                <div className="p-4 border-b border-gray-300 flex items-center gap-2">
                                    <div className="flex-shrink-0 inline-block rounded-full overflow-hidden w-10 aspect-square object-contain text-neutral-700">
                                        <UserAvatar
                                            avatarUrl={authUser.avatarUrl}
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-neutral-700 font-semibold">
                                            {authUser.firstName +
                                                " " +
                                                (authUser.lastName ?? "")}
                                        </h4>
                                        <p className="text-sm text-neutral-500">
                                            {authUser.emailAddress}
                                        </p>
                                    </div>
                                </div>
                                <div className="py-1" role="none">
                                    <Link
                                        href={`/${lang}/backend/settings/assessment_flow`}
                                        className={styles.avatar__dropdown__btn}
                                        role="menuitem"
                                        tabIndex={-1}
                                        onClick={() =>
                                            setShowAvatarDropdown(false)
                                        }
                                    >
                                        {t("avatar_menu.settings")}
                                    </Link>
                                    <a
                                        href="#"
                                        className={styles.avatar__dropdown__btn}
                                        role="menuitem"
                                        tabIndex={-1}
                                    >
                                        {t("avatar_menu.help")}
                                    </a>
                                    <Link
                                        href={`${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${lang}/organization/new`}
                                        className={styles.avatar__dropdown__btn}
                                        role="menuitem"
                                        tabIndex={-1}
                                        onClick={() =>
                                            setShowAvatarDropdown(false)
                                        }
                                    >
                                        {t("avatar_menu.add_company")}
                                    </Link>
                                    <button
                                        type="button"
                                        className={styles.avatar__dropdown__btn}
                                        role="menuitem"
                                        tabIndex={-1}
                                        onClick={handleLogout}
                                    >
                                        {t("avatar_menu.sign_out")}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderBar;
