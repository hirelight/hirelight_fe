"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { decryptData } from "@/helpers/authHelpers";

const AuthGroupWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { lang } = useParams();
    const token = decryptData("hirelight_access_token");

    useEffect(() => {
        if (token) router.push(`/${lang}`);
    }, [router, token, lang]);

    return token ? <div></div> : <>{children}</>;
};

export default AuthGroupWrapper;
