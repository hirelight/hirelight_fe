import React from "react";
import dynamic from "next/dynamic";

import LoadingIndicator from "@/components/LoadingIndicator";
import DoubleRingLoading from "@/components/DoubleRingLoading";

import HeaderBar from "./components/HeaderBar";

const AuthenWrapper = dynamic(() => import("./components/AuthenWrapper"), {
    ssr: false,
    loading: () => (
        <div className="w-screen h-screen flex pt-[30%] justify-center">
            <DoubleRingLoading className="w-28 h-28" />
        </div>
    ),
});

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-screen relative bg-slate-100 flex flex-col">
            <AuthenWrapper>
                <HeaderBar />
                <main className="flex-1 relative z-0">{children}</main>
            </AuthenWrapper>
        </div>
    );
};

export default OrganizationLayout;
