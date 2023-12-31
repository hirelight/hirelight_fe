"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";
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
                router.push(`/${lang}/organizations`);
            } else {
                router.replace(
                    `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${lang}/login?authEnd=true`
                );
            }
        } else {
            const decoded = jwtDecode(token) as IUserDto;
            if (accessToken) {
                dispatch(setToken(accessToken));
                router.push(`/${lang}`);
            } else if (decoded.exp < Date.now() / 1000) {
                dispatch(logout());
                window.location.href = `http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login?authEnd=true`;
            }
        }
    }, [accessToken, dispatch, lang, router]);

    return <>{children}</>;
};

export default AuthenWrapper;
