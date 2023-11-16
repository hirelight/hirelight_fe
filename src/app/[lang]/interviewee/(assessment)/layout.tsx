import React from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import HeaderBar from "./components/HeaderBar";

const AssessmentLayout = ({
    children,
    params,
}: {
    children: React.ReactNode;
    params: any;
}) => {
    const { lang } = params;
    const token = cookies().get("hirelight_access_token");

    if (!token) redirect(`/${lang}/login`);

    return (
        <div className="min-h-screen">
            <HeaderBar />
            {children}
        </div>
    );
};

export default AssessmentLayout;
