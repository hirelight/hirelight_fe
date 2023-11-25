"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { decryptData } from "@/helpers/authHelpers";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const token = decryptData("hirelight_access_token");
    React.useEffect(() => {
        if (!token && typeof window !== "undefined")
            router.replace(
                `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`
            );
    }, [router, token]);

    return !decryptData("hirelight_access_token") ? null : <>{children}</>;
};

export default ProtectedRoute;
