import React, { FormEvent } from "react";
import Link from "next/link";
import { Metadata } from "next";

import { getDictionary } from "../../dictionnary";
import { Locale } from "../../../../../i18n.config";

import SignupForm from "./components/SignupForm";

export const metadata: Metadata = {
    title: "Hirelight Recruitment Software - Sign up",
};

const Signup = async ({ params }: { params: { lang: Locale } }) => {
    const { signup_page, common } = await getDictionary(params.lang);

    return (
        <div className="min-w-[500px] min-h-[400px] relative bg-white shadow-lg rounded-md p-8 mx-0 md:mx-6 text-center">
            <SignupForm _t={{ signup_form: signup_page.signup_form, common }} />
            <div className="mt-8 text-sm text-center relative">
                <span className="text-gray-500 mr-1">
                    {signup_page.have_account}
                </span>
                <Link
                    href={"/login"}
                    className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                >
                    {signup_page.btn.signin}
                </Link>
            </div>
        </div>
    );
};

export default Signup;
