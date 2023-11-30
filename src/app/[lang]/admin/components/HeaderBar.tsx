"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";

import logo from "/public/images/logo.svg";

import { BellIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";

import { LocaleSwitcher } from "@/components";

const HeaderBar = () => {
    const { lang } = useParams();
    return (
        <header className="bg-white shadow-md relative z-10">
            <div className="p-6 flex items-center justify-between py-4">
                <div className="flex gap-6">
                    <Link href={`/${lang}`} className="flex gap-2 items-center">
                        <Image
                            alt="Logo"
                            src={logo}
                            className="w-11 aspect-square object-contain"
                        />
                        <span className="text-xl font-semibold text-neutral-700">
                            Hirelight
                        </span>
                    </Link>
                </div>
                <div className="flex gap-6">
                    <button
                        type="button"
                        className="rounded text-blue_primary_600 hover:text-blue_primary_800 hover:bg-slate-100 transition-all"
                    >
                        <BellIcon className="w-6 h-6" />
                    </button>

                    <div className="text-blue_primary_700 border-blue_primary_700">
                        <LocaleSwitcher />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderBar;
