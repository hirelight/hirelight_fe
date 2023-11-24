import { Metadata } from "next";
import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";

import styles from "./layout.module.scss";
import AuthenWrapper from "./components/AuthenWrapper";

import Image from "next/image";

import logo from "/public/images/logo.svg";

const HeaderBarNoSSR = dynamic(() => import("./components/HeaderBar"), {
    ssr: false,
    loading: () => (
        <div className="text-center w-full  h-fit bg-white dark:bg-blue-950 drop-shadow-md relative z-10">
            <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 xl:px-6">
                <div className="flex gap-2 items-center">
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
                </div>
                <div className="flex items-center gap-6"></div>
            </div>
        </div>
    ),
});

export const metadata: Metadata = {
    title: "Login",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-slate-100">
            <AuthenWrapper>
                <HeaderBarNoSSR />
                <div className={styles.wrapper}>{children}</div>
            </AuthenWrapper>
        </div>
    );
};

export default AuthLayout;
