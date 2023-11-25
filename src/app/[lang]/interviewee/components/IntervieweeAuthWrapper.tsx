"use client";

import React from "react";
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

    return !token ? null : <>{children}</>;
};

export default IntervieweeAuthWrapper;
