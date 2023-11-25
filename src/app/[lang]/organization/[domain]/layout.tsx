import React from "react";

import HeaderBar from "./components/HeaderBar";
import AuthenWrapper from "./components/AuthenWrapper";

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
