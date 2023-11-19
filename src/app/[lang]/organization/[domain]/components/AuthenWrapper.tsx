"use client";

import { useRouter } from "next/navigation";
import React from "react";
import Cookies from "js-cookie";
import { useSearchParams } from "next/navigation";
import jwtDecode from "jwt-decode";

import { IUserDto } from "@/services";
import { isDevMode } from "@/helpers";

const AuthenWrapper = ({ children }: { children: React.ReactNode }) => {
    const accessToken = useSearchParams().get("accessToken");

    const router = useRouter();

    React.useEffect(() => {
        const token = Cookies.get("hirelight_access_token");
        if (!token) {
            if (isDevMode()) {
                if (accessToken) {
                    Cookies.set(
                        "hirelight_access_token",
                        accessToken as string,
                        {
                            sameSite: "None",
                            secure: true,
                        }
                    );
                    router.push("/backend");
                } else {
                    router.replace(
                        `${window.location.protocol}//www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`
                    );
                }
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
            router.push("/backend");
        }
    }, [accessToken, router]);
    return <>{children}</>;
};

export default AuthenWrapper;
