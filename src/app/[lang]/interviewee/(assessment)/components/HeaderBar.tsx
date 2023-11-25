"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import logo from "/public/images/logo.svg";

import { LocaleSwitcher } from "@/components";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { useAppSelector } from "@/redux/reduxHooks";

import styles from "./HeaderBar.module.scss";

const HeaderBar = () => {
    const { lang } = useParams();
    const router = useRouter();
    const { authUser } = useAppSelector(state => state.auth);
    const [showAvatarDropdown, setShowAvatarDropdown] = useState(false);

    const avatarDropdownRef = useOutsideClick<HTMLDivElement>(() =>
        setShowAvatarDropdown(false)
    );

    const handleLogout = async () => {
        setShowAvatarDropdown(false);
        localStorage.removeItem("hirelight_access_token");
        router.push(`/${lang}/login`);
    };
    return (
        <header className="w-full bg-blue_primary_600 px-4 md:px-10 max-h-20">
            <div className="max-w-screen-xl mx-auto py-3 flex justify-between">
                <Link className="flex gap-6 items-center" href={"/"}>
                    <Image
                        alt="Hirelight Logo"
                        src={logo}
                        width={40}
                        height={40}
                    />
                    <span className="text-white text-2xl font-medium">
                        Hirelight
                    </span>
                </Link>
                <div className="flex gap-6 items-center">
                    {/* <Bell className="text-white w-8 h-8" /> */}
                    <div className="flex gap-4 text-white border-white">
                        <LocaleSwitcher />
                    </div>
                    {/* <Link
                        href={"/settings"}
                        className="rounded-full w-8 aspect-square border border-white"
                    ></Link> */}
                    {!authUser ? (
                        <Link
                            href={`login`}
                            className="text-sm font-medium text-white hover:underline"
                        >
                            Login / Signup
                        </Link>
                    ) : (
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
                                        process.env
                                            .NEXT_PUBLIC_AVATAR_URL as string
                                    }
                                    width={40}
                                    height={40}
                                />
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
                                <div className="py-1" role="none">
                                    {/* <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" --> */}
                                    <Link
                                        href={`/${lang}/profile/account`}
                                        className={styles.avatar__dropdown__btn}
                                        role="menuitem"
                                        tabIndex={-1}
                                        onClick={() =>
                                            setShowAvatarDropdown(false)
                                        }
                                    >
                                        Settings
                                    </Link>
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
                    )}
                </div>
            </div>
        </header>
    );
};

export default HeaderBar;
