import React, { FormEvent } from "react";
import Link from "next/link";
import { Metadata } from "next";

import { getI18NextTranslation } from "@/utils/i18n";

import { Locale } from "../../../../../i18n.config";

import SignupForm from "./components/SignupForm";

export const metadata: Metadata = {
    title: "Hirelight Recruitment Software - Sign up",
};

const Signup = async ({ params }: { params: { lang: Locale } }) => {
    const { t: _t } = await getI18NextTranslation(params.lang, "signup-page");
    return (
        <div className="min-w-[500px] max-w-[500px] min-h-[400px] relative bg-white shadow-lg rounded-md p-8 mx-0 md:mx-6 text-center">
            <SignupForm />
            <div className="mt-8 text-sm text-center relative">
                <span className="text-gray-500 mr-1">{_t("have_account")}</span>
                <Link
                    href={"login"}
                    className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                >
                    {_t("btn.signin")}
                </Link>
            </div>
        </div>
    );
};

export default Signup;
