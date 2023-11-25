"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import { IUserDto } from "@/services";
import { isDevMode } from "@/helpers";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setToken } from "@/redux/slices/auth.slice";
import authServices from "@/services/auth/auth.service";
import LoadingIndicator from "@/components/LoadingIndicator";
import { decryptData } from "@/helpers/authHelpers";

const AuthenWrapper = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useSearchParams().get("accessToken");

    const router = useRouter();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        const token = decryptData("hirelight_access_token");
        if (!token) {
            if (accessToken) {
                dispatch(setToken(accessToken));
                setLoading(false);
                router.push("/backend");
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
            }
            setLoading(false);
            router.push("/backend");
        }
    }, [accessToken, dispatch, router]);

    return <>{children}</>;
};

export default AuthenWrapper;
