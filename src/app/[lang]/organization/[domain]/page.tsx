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
    const { accessToken } = searchParams;

    const router = useRouter();

    React.useEffect(() => {
        if (!Cookies.get("hirelight_access_token")) {
            if (
                process.env.NEXT_PUBLIC_ROOT_DOMAIN?.includes("localhost") ||
                process.env.NODE_ENV === "development"
            ) {
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
        } else router.push("/backend");
    }, [accessToken, router]);

    return (
        <div className="w-full flex items-center justify-center py-80">
            <LoadingIndicator />
        </div>
    );
};

export default DomainPage;
