"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

import { useAppDispatch } from "@/redux/reduxHooks";
import { logout } from "@/redux/slices/auth.slice";

const AuthenWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const authEnd = useSearchParams().get("authEnd");

    const dispatch = useAppDispatch();

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push("login");
    }, [dispatch, router]);

    useEffect(() => {
        if (authEnd && authEnd === "true") handleLogout();
    }, [authEnd, handleLogout]);
    return <>{children}</>;
};

export default AuthenWrapper;
