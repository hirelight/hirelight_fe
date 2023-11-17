import { Metadata } from "next";
import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import dynamic from "next/dynamic";

import styles from "./layout.module.scss";
import AuthenWrapper from "./components/AuthenWrapper";

const HeaderBarNoSSR = dynamic(() => import("./components/HeaderBar"), {
    ssr: false,
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
