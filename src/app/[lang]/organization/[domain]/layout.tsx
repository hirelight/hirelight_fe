import React from "react";

import HeaderBar from "./components/HeaderBar";

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="w-full min-h-screen relative bg-slate-100 flex flex-col">
            <HeaderBar />
            <main className="flex-1 relative z-0">{children}</main>
        </div>
    );
};

export default OrganizationLayout;
