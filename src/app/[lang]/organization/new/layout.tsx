import { Metadata } from "next";
import React, { ReactNode } from "react";
import dynamic from "next/dynamic";

import { DoubleRingLoading } from "@/components";

import styles from "./layout.module.scss";
import HeaderBar from "./components/HeaderBar";

const EmployeeAuthNoSSR = dynamic(
    () => import("@/components/EmployeePrivateWrapper"),
    {
        ssr: false,
        loading: () => (
            <div className="flex-1 flex justify-center items-center ">
                <DoubleRingLoading className="w-32 h-32" />
            </div>
        ),
    }
);

export const metadata: Metadata = {
    title: "Login",
};

const NewOrganizationLayout = ({
    children,
    params,
}: {
    children: ReactNode;
    params: any;
}) => {
    return (
        <div className="flex flex-col min-h-screen w-full bg-slate-100">
            <HeaderBar />
            <EmployeeAuthNoSSR>
                <div className={styles.wrapper}>{children}</div>
            </EmployeeAuthNoSSR>
        </div>
    );
};

export default NewOrganizationLayout;
