"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import LoadingIndicator from "@/components/LoadingIndicator";
import { decryptData } from "@/helpers/authHelpers";

const SelectOrgWrapper = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();

    const token = decryptData("hirelight_access_token");

    useEffect(() => {
        if (!token) router.push("login");
    }, [router, token]);

    if (!token)
        return (
            <div className="p-12 flex justify-center items-center">
                <LoadingIndicator />
            </div>
        );

    return <>{children}</>;
};

export default SelectOrgWrapper;
