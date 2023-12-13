"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import jwtDecode from "jwt-decode";

import { IUserDto } from "@/services";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { logout, setToken } from "@/redux/slices/auth.slice";
import { decryptData } from "@/helpers/authHelpers";
import { DoubleRingLoading } from "@/components";

const AuthenWrapper = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useSearchParams().get("accessToken");

    const { lang } = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { token: userToken, authUser } = useAppSelector(state => state.auth);

    React.useEffect(() => {
        if (!userToken) {
            if (accessToken) {
                dispatch(setToken(accessToken));
                router.push(`/${lang}/backend`);
            } else {
                router.replace(
                    `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login?authEnd=true`
                );
            }
        } else {
            const decoded = jwtDecode(userToken) as IUserDto;
            if (
                typeof window !== "undefined" &&
                decoded.organizationSubdomain !==
                    window.location.hostname.split(".")[0]
            ) {
                router.replace(
                    `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/select-org`
                );
            } else if (accessToken) {
                dispatch(setToken(accessToken));
                router.push(`/${lang}/backend`);
            } else if (decoded.exp < Date.now() / 1000) {
                dispatch(logout());
                router.replace(
                    `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login?authEnd=true`
                );
            }
        }
    }, [accessToken, dispatch, lang, router, userToken]);

    if (!userToken)
        return (
            <div className="w-screen h-screen flex items-center justify-center">
                <DoubleRingLoading className="w-28 h-28" />
            </div>
        );
    return <>{children}</>;
};

export default AuthenWrapper;
