import React from "react";
import dynamic from "next/dynamic";

import { LocaleSwitcher } from "@/components";

import Link from "next/link";
import Image from "next/image";

import logo from "/public/images/logo.svg";

const HeaderBar = dynamic(() => import("./components/HeaderBar"), {
    ssr: false,
    loading: () => (
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
                <div className="flex gap-6 items-center">
                    {/* <Bell className="text-white w-8 h-8" /> */}
                    <div className="flex gap-4 text-white border-white">
                        <LocaleSwitcher />
                    </div>
                </div>
            </div>
        </header>
    ),
});

const IntervieweeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <HeaderBar />
            {children}
        </div>
    );
};

export default IntervieweeLayout;
