"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { logout } from "@/redux/slices/auth.slice";

const AuthenWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const authEnd = useSearchParams().get("authEnd");
    const { lang } = useParams();

    const dispatch = useAppDispatch();

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push(`/${lang}/login`);
    }, [dispatch, lang, router]);

    useEffect(() => {
        if (authEnd && authEnd === "true") handleLogout();
    }, [authEnd, handleLogout, lang, router]);
    return <>{children}</>;
};

export default AuthenWrapper;
