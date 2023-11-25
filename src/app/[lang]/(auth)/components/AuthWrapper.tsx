"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useAppSelector } from "@/redux/reduxHooks";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const token = useAppSelector(state => state.auth.token);
    console.log(token);

    return <>{children}</>;
};

export default AuthWrapper;
