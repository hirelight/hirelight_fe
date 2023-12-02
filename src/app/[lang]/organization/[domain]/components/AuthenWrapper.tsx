"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import jwtDecode from "jwt-decode";

import { IUserDto } from "@/services";
import { useAppDispatch } from "@/redux/reduxHooks";
import { logout, setToken } from "@/redux/slices/auth.slice";
import { decryptData } from "@/helpers/authHelpers";

const AuthenWrapper = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useSearchParams().get("accessToken");

    const { lang } = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();

    React.useEffect(() => {
        const token = decryptData("hirelight_access_token");
        if (!token) {
            if (accessToken) {
                dispatch(setToken(accessToken));
                router.push(`/${lang}/backend`);
            } else {
                router.replace(
                    `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`
                );
            }
        } else {
            const decoded = jwtDecode(token) as IUserDto;
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
                window.location.href = `http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login?authEnd=true`;
            }
        }
    }, [accessToken, dispatch, lang, router]);

    return <>{children}</>;
};

export default AuthenWrapper;
