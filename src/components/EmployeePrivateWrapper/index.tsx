"use client";

import { useParams, useRouter } from "next/navigation";
import React from "react";

import { decryptData } from "@/helpers/authHelpers";

const EmployeePrivateWrapper = ({
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

export default EmployeePrivateWrapper;
