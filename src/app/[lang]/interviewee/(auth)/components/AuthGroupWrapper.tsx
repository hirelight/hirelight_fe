"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

import { decryptData } from "@/helpers/authHelpers";

const AuthGroupWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { lang } = useParams();
    const token = decryptData("hirelight_access_token");

    useEffect(() => {
        if (token) {
            const decoded: any = jwtDecode(token);
            if (decoded.exp * 1000 < new Date().getTime()) {
                localStorage.removeItem("hirelight_access_token");
            } else {
                router.push(`/${lang}`);
            }
        }
    }, [router, token, lang]);

    return <>{children}</>;
};

export default AuthGroupWrapper;
