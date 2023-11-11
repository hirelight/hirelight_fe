"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { Bell } from "@/icons";

import logo from "/public/images/logo.png";

import { LocaleSwitcher, ThemeSwitcher } from "@/components";

const HeaderBar = () => {
    const router = useRouter();
    return (
        <header className="w-full bg-blue_primary_600 px-4 md:px-10">
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
                <div className="flex gap-8 items-center">
                    <Bell className="text-white w-8 h-8" />
                    <div className="flex gap-4">
                        <LocaleSwitcher />
                    </div>
                    {/* <Link
                        href={"/settings"}
                        className="rounded-full w-8 aspect-square border border-white"
                    ></Link> */}
                    <button
                        type="button"
                        className="rounded-full w-8 aspect-square border border-white"
                        onClick={() => {
                            Cookies.remove("hirelight_access_token");
                            router.push("/login");
                        }}
                    ></button>
                </div>
            </div>
        </header>
    );
};

export default HeaderBar;
