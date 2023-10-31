import React from "react";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { RedirectType } from "next/dist/client/components/redirect";

import ProtectedRoute from "./components/ProtectedRoute";

const BackendLayout = ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies();
    const token = cookieStore.get("hirelight_access_token");
    const headerList = headers();
    const referer = headerList.get("referer");

    if (!token)
        redirect(
            `http://www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`,
            RedirectType.replace
        );
    return <>{children}</>;
};

export default BackendLayout;
