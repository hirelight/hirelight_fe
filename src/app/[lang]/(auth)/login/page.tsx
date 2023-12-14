import React from "react";
import Link from "next/link";
import { Metadata } from "next";

import { Portal } from "@/components";
import { SpinLoading } from "@/icons";

import { Locale } from "../../../../../i18n.config";
import { getDictionary } from "../../../../utils/dictionaries/dictionnary";

import LoginForm from "./components/LoginForm";

export const metadata: Metadata = {
    title: "Hirelight Recruitment Software - Sign in",
};

const Login = async ({
    params,
    searchParams,
}: {
    params: { lang: Locale };
    searchParams: any;
}) => {
    const { login_page, common } = await getDictionary(params.lang);
    const showPageLoad =
        (searchParams["status"] && searchParams["loginId"]) ||
        (searchParams["authEnd"] && searchParams["authEnd"] == "true");

    return (
        <div className="min-w-[500px] max-w-[500px] min-h-[400px] relative bg-white shadow-lg rounded-md p-8 mx-0 md:mx-6 text-center">
            {showPageLoad && (
                <div className="fixed inset-0 z-[2000] w-full h-screen backdrop-brightness-50 backdrop-blur-sm flex items-center justify-center">
                    <SpinLoading className="w-32 h-32 text-blue_primary_600" />
                </div>
            )}

            <LoginForm _t={{ login_form: login_page.login_form, common }} />
            <div className="mt-8 text-sm text-center relative flex flex-col items-center">
                <p className="text-gray-500">{login_page.dont_have_account}</p>
                <Link
                    href={`signup`}
                    className="block max-w-[280px] font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                >
                    {login_page.btn.signup.replace("{{days}}", "15")}
                </Link>
            </div>
        </div>
    );
};

export default Login;
