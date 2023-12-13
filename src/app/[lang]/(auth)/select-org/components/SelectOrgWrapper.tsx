"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { decryptData } from "@/helpers/authHelpers";
import { DoubleRingLoading } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";

const SelectOrgWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const token = useAppSelector(state => state.auth.token);

    useEffect(() => {
        if (!token) router.push("login");
    }, [router, token]);

    return <>{children}</>;
};

export default SelectOrgWrapper;
