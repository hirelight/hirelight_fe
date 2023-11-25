"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import jwtDecode from "jwt-decode";
import { toast } from "react-toastify";

import { IUserDto } from "@/services";
import { isDevMode } from "@/helpers";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setToken } from "@/redux/slices/auth.slice";
import authServices from "@/services/auth/auth.service";

const AuthenWrapper = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useSearchParams().get("accessToken");
    const orgId = useSearchParams().get("orgId");
    const orgAuth = useSearchParams().get("orgAuth");

    const router = useRouter();

    const dispatch = useAppDispatch();

    React.useEffect(() => {
        console.log(orgId, orgAuth);
        const getOrgToken = async (id: string) => {
            try {
                console.log("get org token");
                const res = await authServices.getOrgAccessToken(id);
                console.log("Get succes");

                Cookies.set("hirelight_access_token", res.data.accessToken, {
                    domain: `${window.location.hostname.split(".")[0]}.${
                        process.env.NEXT_PUBLIC_ROOT_DOMAIN
                    }`,
                    sameSite: "None",
                    secure: true,
                });
            } catch (error: any) {
                toast(
                    error.message
                        ? error.message
                        : "Something gone wrong went get org access!"
                );
            }
        };

        if (!isDevMode()) {
            if (orgId && orgAuth == "true") {
                getOrgToken(orgId);
            }
        } else {
            const token = Cookies.get("hirelight_access_token");
            if (!token) {
                if (accessToken) {
                    Cookies.set(
                        "hirelight_access_token",
                        accessToken as string,
                        {
                            sameSite: "None",
                            secure: true,
                        }
                    );
                    dispatch(setToken(accessToken));
                    router.push("/backend");
                } else {
                    router.replace(
                        `${window.location.protocol}//www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`
                    );
                }
            } else {
                const decoded = jwtDecode(token) as IUserDto;
                if (
                    typeof window !== undefined &&
                    decoded.organizationSubdomain !==
                        window.location.hostname.split(".")[0]
                ) {
                    router.replace(
                        `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/select-org`
                    );
                }
                dispatch(setToken(token));
                router.push("/backend");
            }
        }
    }, [accessToken, dispatch, orgAuth, orgId, router]);
    return <>{children}</>;
};

export default AuthenWrapper;
