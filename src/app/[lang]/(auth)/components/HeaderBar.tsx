"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { LocaleSwitcher } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { logout } from "@/redux/slices/auth.slice";

import logo from "/public/images/logo.svg";

const InvitationDropDownNoSSR = dynamic(() => import("./InvitationDropDown"), {
    ssr: false,
});

type HeaderBarProps = {};

const HeaderBar: React.FC<HeaderBarProps> = ({}) => {
    const router = useRouter();

    const dispatch = useAppDispatch();
    const { token, authUser } = useAppSelector(state => state.auth);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push("login");
    }, [router, dispatch]);

    useEffect(() => {
        if (authUser && authUser.exp * 1000 < new Date().getTime()) {
            handleLogout();
        }
    }, [authUser, handleLogout]);

    return (
        <div className="text-center w-full  h-fit bg-white dark:bg-blue-950 drop-shadow-md relative z-10">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 xl:px-6">
                <Link href={`/`} className="flex gap-2 items-center">
                    <span>
                        <Image
                            alt="Hirelight Logo"
                            src={logo}
                            width={40}
                            height={40}
                        />
                    </span>
                    <h1 className="text-2xl tracking-wider font-semibold italic">
                        Hirelight
                    </h1>
                </Link>
                <div className="flex items-center gap-6">
                    {/* <div>
                        <button
                            type="button"
                            className="relative p-1 rounded-md border border-neutral-400"
                        >
                            <BellAlertIcon className="w-6 h-6" />
                        </button>
                    </div> */}
                    {token && <InvitationDropDownNoSSR />}
                    <div className="text-neutral-700 border-neutral-400">
                        <LocaleSwitcher />
                    </div>
                    {token && (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={`block p-1 rounded-md border border-neutral-400`}
                        >
                            <ArrowLeftOnRectangleIcon className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
