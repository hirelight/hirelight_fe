"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

import { decryptData } from "@/helpers/authHelpers";

const IntervieweeAuthWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const router = useRouter();
    const { lang } = useParams();
    const token = decryptData("hirelight_access_token");

    if (!token) router.push(`/${lang}/login`);

    useEffect(() => {
        if (!token) router.push(`/${lang}/login`);
    }, [lang, router, token]);

    return !token ? null : <>{children}</>;
};

export default IntervieweeAuthWrapper;
