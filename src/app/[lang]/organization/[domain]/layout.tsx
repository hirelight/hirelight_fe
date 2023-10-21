import React from "react";

import HeaderBar from "./components/HeaderBar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-screen relative bg-slate-100">
            <HeaderBar />
            <main className="relative z-0">{children}</main>
        </div>
    );
};

export default OrganizationLayout;
