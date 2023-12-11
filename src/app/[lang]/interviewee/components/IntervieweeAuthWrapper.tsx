"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import jwtDecode from "jwt-decode";

import { decryptData } from "@/helpers/authHelpers";
import { useAppSelector } from "@/redux/reduxHooks";

const IntervieweeAuthWrapper = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const router = useRouter();
    const { lang } = useParams();
    const token = decryptData("hirelight_access_token");
    const { authUser } = useAppSelector(state => state.auth);

    useEffect(() => {
        if (!token) router.push(`/${lang}/login`);
        else if (authUser && authUser.exp * 1000 < new Date().getTime()) {
            localStorage.removeItem("hirelight_access_token");
        }
    }, [authUser, lang, router, token]);

    return !token ? null : <>{children}</>;
};

export default IntervieweeAuthWrapper;
