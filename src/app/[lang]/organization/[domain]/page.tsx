"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import authServices from "@/services/auth/auth.service";
import LoadingIndicator from "@/components/LoadingIndicator";

const DomainPage = ({
    params,
    searchParams,
}: {
    params: { domain: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const { loginId, accessToken } = searchParams;

    const router = useRouter();

    const fetchAccessToken = React.useCallback(
        async (loginId: string) => {
            try {
                const res = await authServices.getAccessToken(loginId);
                if (res.statusCode === 200) {
                    console.log(res);
                    if (process.env.NODE_ENV !== "production")
                        Cookies.set(
                            "hirelight_access_token",
                            res.data.accessToken,
                            {
                                sameSite: "strict",
                                secure: true,
                            }
                        );

                    router.push("/backend");
                }
            } catch (error) {
                console.log(error);
            }
        },
        [router]
    );

    React.useEffect(() => {
        if (!Cookies.get("hirelight_access_token")) {
            if (loginId !== "null") {
                fetchAccessToken(loginId as string);
            } else if (accessToken) {
                if (process.env.NODE_ENV !== "production")
                    Cookies.set(
                        "hirelight_access_token",
                        accessToken as string,
                        {
                            sameSite: "strict",
                            secure: true,
                        }
                    );

                router.push("/backend");
            } else {
                router.replace(
                    `${window.location.protocol}//www.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`
                );
            }
        } else router.push("/backend");
    }, [accessToken, fetchAccessToken, loginId, router]);

    return (
        <div className="w-full flex items-center justify-center py-80">
            <LoadingIndicator />
        </div>
    );
};

export default DomainPage;
