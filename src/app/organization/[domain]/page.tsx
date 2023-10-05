"use client";

import React from "react";
import { redirect } from "next/navigation";
import Cookies from "js-cookie";

const DomainPage = ({
    params,
    searchParams,
}: {
    params: { domain: string };
    searchParams: { [key: string]: string | string[] | undefined };
}) => {
    const { code } = searchParams;

    React.useEffect(() => {
        if (!Cookies.get("hirelight_access_token"))
            if (code) {
                Cookies.set("hirelight_access_token", code as string, {
                    sameSite: "strict",
                    expires: 1,
                });
            } else {
                redirect(
                    `${window.location.protocol}//${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/login`
                );
            }
        redirect(`backend`);
    }, [code]);

    return null;
};

export default DomainPage;
