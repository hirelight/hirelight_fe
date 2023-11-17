"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import Cookies from "js-cookie";

const AuthenWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const authEnd = useSearchParams().get("authEnd");

    const handleLogout = useCallback(() => {
        Cookies.remove("hirelight_access_token");
        router.push("login");
    }, [router]);

    useEffect(() => {
        if (authEnd && authEnd === "true") handleLogout();
    }, [authEnd, handleLogout]);
    return <>{children}</>;
};

export default AuthenWrapper;
