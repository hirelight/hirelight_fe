import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import HeaderBar from "./components/HeaderBar";

const IntervieweeAuthLayout = ({ children }: { children: React.ReactNode }) => {
    const token = cookies().get("hirelight_access_token");

    if (token) redirect("/");
    return (
        <div className="w-full h-screen flex flex-col md:overflow-hidden">
            <HeaderBar />
            {children}
        </div>
    );
};

export default IntervieweeAuthLayout;
