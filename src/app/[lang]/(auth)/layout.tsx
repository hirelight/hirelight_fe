import { Metadata } from "next";
import React, { ReactNode } from "react";
import { cookies } from "next/headers";

import HeaderBar from "./components/HeaderBar";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
    title: "Login",
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-slate-100">
            <HeaderBar />
            <div className={styles.wrapper}>{children}</div>
        </div>
    );
};

export default AuthLayout;
