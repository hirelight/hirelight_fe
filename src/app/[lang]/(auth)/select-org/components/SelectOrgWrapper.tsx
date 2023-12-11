"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import jwtDecode from "jwt-decode";

import { decryptData } from "@/helpers/authHelpers";
import { DoubleRingLoading } from "@/components";
import { logout } from "@/redux/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";

const SelectOrgWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const token = decryptData("hirelight_access_token");

    useEffect(() => {
        if (!token) router.push("login");
    }, [router, token]);

    if (!token)
        return (
            <div className="p-8 flex justify-center items-center">
                <DoubleRingLoading className="w-20 h-20" />
            </div>
        );

    return <>{children}</>;
};

export default SelectOrgWrapper;
