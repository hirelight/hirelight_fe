import React from "react";
import dynamic from "next/dynamic";

import DoubleRingLoading from "@/components/DoubleRingLoading";

const AuthenWrapper = dynamic(() => import("./components/AuthenWrapper"), {
    ssr: false,
    loading: () => (
        <div className="w-screen h-screen flex items-center justify-center">
            <DoubleRingLoading className="w-28 h-28" />
        </div>
    ),
});

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-screen relative bg-slate-100 flex flex-col">
            <AuthenWrapper>{children}</AuthenWrapper>
        </div>
    );
};

export default OrganizationLayout;
