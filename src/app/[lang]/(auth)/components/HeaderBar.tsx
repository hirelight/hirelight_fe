import React from "react";
import Image from "next/image";
import { BellAlertIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";

import { LocaleSwitcher, ThemeSwitcher } from "@/components";

import InvitationDropDown from "./InvitationDropDown";

type HeaderBarProps = {};

const HeaderBar: React.FC<HeaderBarProps> = ({}) => {
    return (
        <div className="text-center w-full  h-fit bg-white dark:bg-blue-950 drop-shadow-md relative z-10">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 xl:px-6">
                <div className="flex gap-2 items-center">
                    <span>
                        <Image
                            alt="Hirelight Logo"
                            src={"/images/logo.png"}
                            width={40}
                            height={40}
                        />
                    </span>
                    <h1 className="text-2xl tracking-wider font-semibold italic">
                        Hirelight
                    </h1>
                </div>
                <div className="flex items-center gap-6">
                    <div>
                        <button
                            type="button"
                            className="relative p-1 rounded-md border border-neutral-400"
                        >
                            <BellAlertIcon className="w-6 h-6" />
                        </button>
                    </div>
                    <InvitationDropDown />
                    <LocaleSwitcher />
                </div>
            </div>
        </div>
    );
};

export default HeaderBar;
