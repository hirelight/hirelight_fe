"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { decryptData } from "@/helpers/authHelpers";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const token = decryptData("hirelight_access_token");
    console.log(token);

    return <>{children}</>;
};

export default ProtectedRoute;
