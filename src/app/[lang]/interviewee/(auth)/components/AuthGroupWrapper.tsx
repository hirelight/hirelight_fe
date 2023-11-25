"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";

import { decryptData } from "@/helpers/authHelpers";

const AuthGroupWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const { lang } = useParams();
    const token = decryptData("hirelight_access_token");

    if (token) router.push(`/${lang}`);

    return token ? null : <>{children}</>;
};

export default AuthGroupWrapper;
