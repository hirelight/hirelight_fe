"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

import { decryptData } from "@/helpers/authHelpers";
import { SpinLoading } from "@/icons";

const AuthGroupWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { lang } = useParams();
    const token = decryptData("hirelight_access_token");

    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        if (token) {
            const decoded: any = jwtDecode(token);
            if (decoded.exp * 1000 < new Date().getTime()) {
                localStorage.removeItem("hirelight_access_token");
                setPageLoading(false);
            } else {
                router.push(`/${lang}`);
            }
        } else setPageLoading(false);
    }, [router, token, lang]);

    return (
        <>
            {pageLoading && (
                <div className="fixed inset-0 z-[2000] w-full h-screen backdrop-brightness-50 backdrop-blur-sm flex items-center justify-center">
                    <SpinLoading className="w-32 h-32 text-blue_primary_600" />
                </div>
            )}
            {children}
        </>
    );
};

export default AuthGroupWrapper;
