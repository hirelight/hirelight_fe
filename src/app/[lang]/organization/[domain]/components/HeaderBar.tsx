"use client";

import Image from "next/image";
import React, { useState } from "react";

import logo from "/public/images/logo.png";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { delayFunc } from "@/helpers/shareHelpers";
import { Bell } from "@/icons";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { LocaleSwitcher, ThemeSwitcher } from "@/components";

import styles from "./HeaderBar.module.scss";

const HeaderBar = () => {
    const pathname = usePathname();
    const router = useRouter();
    const cite = pathname.split("/")[1];

    const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

    const avatarDropdownRef = useOutsideClick<HTMLDivElement>(() =>
        setShowAvatarDropdown(false)
    );

    const handleLogout = async () => {
        setShowAvatarDropdown(false);
        Cookies.remove("hirelight_access_token");
        Cookies.remove("hirelight_access_token", {
            domain: `${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
            path: "/login",
        });
        toast.success("Logout success!");
        await delayFunc(1000);

        router.push(
            `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`
        );
    };

    return (
        <div className="bg-white shadow-md relative z-10">
            <div className="max-w-screen-xl mx-auto px-4 xl:px-6 flex items-center justify-between py-4">
                <Link href={`/backend`} className="flex gap-2 items-center">
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
                                href={"/backend"}
                                className={`${
                                    cite === "backend"
                                        ? "text-blue-800"
                                        : "text-blue_primary_600"
                                } hover:text-blue_primary_800 font-medium`}
                            >
                                Jobs
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
                                Candidates
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
                                Dashboard
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
                                Calendar
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="flex gap-8 items-center">
                    <Bell className="text-blue_primary_800 w-8 h-8" />
                    <div className="flex gap-4">
                        <LocaleSwitcher />
                        <ThemeSwitcher />
                    </div>
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
                            <Image
                                alt="Avatar"
                                src={
                                    process.env.NEXT_PUBLIC_AVATAR_URL as string
                                }
                                width={40}
                                height={40}
                            />
                        </button>

                        {/* <!--
    Dropdown menu, show/hide based on menu state.

    Entering: "transition ease-out duration-100"
      From: "transform opacity-0 scale-95"
      To: "transform opacity-100 scale-100"
    Leaving: "transition ease-in duration-75"
      From: "transform opacity-100 scale-100"
      To: "transform opacity-0 scale-95"
  --> */}
                        <div
                            className={`${styles.avatar__dropdown__wrapper} ${
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
                                <span className="inline-block rounded-full overflow-hidden">
                                    <Image
                                        alt="Avatar"
                                        src={
                                            process.env
                                                .NEXT_PUBLIC_AVATAR_URL as string
                                        }
                                        width={50}
                                        height={50}
                                    />
                                </span>
                                <div>
                                    <h4 className="text-neutral-700 font-semibold">
                                        {"Nguyen Kien"}
                                    </h4>
                                    <p className="text-sm text-neutral-500">
                                        Hirelight
                                    </p>
                                </div>
                            </div>
                            <div className="py-1" role="none">
                                {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                                <Link
                                    href="/backend/settings/templates"
                                    className={styles.avatar__dropdown__btn}
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={() => setShowAvatarDropdown(false)}
                                >
                                    Settings
                                </Link>
                                <a
                                    href="#"
                                    className={styles.avatar__dropdown__btn}
                                    role="menuitem"
                                    tabIndex={-1}
                                >
                                    Help
                                </a>
                                <button
                                    type="button"
                                    className={styles.avatar__dropdown__btn}
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={() => setShowAvatarDropdown(false)}
                                >
                                    Add a company
                                </button>
                                <button
                                    type="button"
                                    className={styles.avatar__dropdown__btn}
                                    role="menuitem"
                                    tabIndex={-1}
                                    onClick={handleLogout}
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
