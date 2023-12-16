"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { logout, setToken } from "@/redux/slices/auth.slice";
import { decryptData } from "@/helpers/authHelpers";
import { Portal } from "@/components";
import { SpinLoading } from "@/icons";

const AuthenWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const authEnd = useSearchParams().get("authEnd");
    const { lang } = useParams();
    const [pageLoading, setPageLoading] = useState(true);

    const dispatch = useAppDispatch();
    const token = decryptData("hirelight_access_token");

    const handleLogout = useCallback(() => {
        dispatch(logout());
        router.push(`/${lang}/login`);
    }, [dispatch, lang, router]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (token) {
                if (authEnd && authEnd === "true") handleLogout();
                else {
                    dispatch(setToken(token));
                    setPageLoading(false);
                }
            } else setPageLoading(false);
        } else setPageLoading(false);
    }, [authEnd, dispatch, handleLogout, lang, router, token]);

    return (
        <>
            {pageLoading && (
                <div className="fixed inset-0 z-[2000] w-full h-screen backdrop-brightness-50 backdrop-blur-sm flex items-center justify-center">
                    <SpinLoading className="w-32 h-32 text-blue_primary_600" />
                </div>
            )}
            {children}
        </>
    );
};

export default AuthenWrapper;
