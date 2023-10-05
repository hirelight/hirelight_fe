"use client";

import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    React.useEffect(() => {
        if (!Cookies.get("hirelight_access_token"))
            router.replace(
                `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`
            );
    }, [router]);

    return !Cookies.get("hirelight_access_token") ? null : <>{children}</>;
};

export default ProtectedRoute;
