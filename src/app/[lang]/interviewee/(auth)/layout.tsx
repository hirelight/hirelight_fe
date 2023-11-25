import React from "react";
import dynamic from "next/dynamic";

import { DoubleRingLoading } from "@/components";

import HeaderBar from "./components/HeaderBar";

const AuthGroupWrapper = dynamic(
    () => import("./components/AuthGroupWrapper"),
    {
        ssr: false,
        loading: () => (
            <div className="w-screen h-screen flex justify-center items-center">
                <DoubleRingLoading className="w-32 h-32" />
            </div>
        ),
    }
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full h-screen flex flex-col md:overflow-hidden">
            <HeaderBar />
            <AuthGroupWrapper>{children}</AuthGroupWrapper>
        </div>
    );
};

export default AuthLayout;
