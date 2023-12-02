import React from "react";
import dynamic from "next/dynamic";

import DoubleRingLoading from "@/components/DoubleRingLoading";

import HeaderBar from "./components/HeaderBar";
import Sidebar from "./components/Sidebar";

const AuthenWrapper = dynamic(() => import("./components/AuthenWrapper"), {
    ssr: false,
    loading: () => (
        <div className="w-screen h-screen flex items-center justify-center">
            <DoubleRingLoading className="w-28 h-28" />
        </div>
    ),
});

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <AuthenWrapper>
                <HeaderBar />
                <div className="flex flex-1">
                    <Sidebar />
                    <main className="flex-1 bg-slate-100 pb-12">
                        {children}
                    </main>
                </div>
            </AuthenWrapper>
        </div>
    );
};

export default AdminLayout;
