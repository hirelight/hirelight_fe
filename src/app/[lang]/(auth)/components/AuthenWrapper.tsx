"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import jwtDecode from "jwt-decode";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { logout } from "@/redux/slices/auth.slice";

const AuthenWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const authEnd = useSearchParams().get("authEnd");
    const { lang } = useParams();

    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push("login");
    }, [dispatch, router]);

    useEffect(() => {
        if (authEnd && authEnd === "true") handleLogout();
    }, [authEnd, handleLogout, lang, router, token]);
    return <>{children}</>;
};

export default AuthenWrapper;
