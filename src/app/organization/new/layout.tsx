import { Metadata } from "next";
import React, { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import HeaderBar from "./components/HeaderBar";
import styles from "./layout.module.scss";

export const metadata: Metadata = {
    title: "Login",
};

const NewOrganizationLayout = ({ children }: { children: ReactNode }) => {
    const cookieStore = cookies();
    const token = cookieStore.get("hirelight_access_token");

    if (!token) redirect("/login");
    else
        return (
            <div className="flex flex-col min-h-screen w-full bg-slate-100">
                <HeaderBar />
                <div className={styles.wrapper}>{children}</div>
            </div>
        );
};

export default NewOrganizationLayout;
