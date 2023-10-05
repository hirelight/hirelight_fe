import React from "react";
import Link from "next/link";
import { Metadata } from "next";

import LoginForm from "./components/LoginForm";

export const metadata: Metadata = {
    title: "Hirelight Recruitment Software - Sign in",
};

const Login = () => {
    return (
        <div className="min-w-[500px] min-h-[400px] relative bg-white shadow-lg rounded-md p-8 mx-0 md:mx-6 text-center">
            <LoginForm />
            <div className="mt-8 text-sm text-center relative">
                <p className="text-gray-500">
                    Don&apos;t have a Hirelight account?
                </p>
                <Link
                    href={"/signup"}
                    className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                >
                    Sign up now for a 15-day free trial
                </Link>
            </div>
        </div>
    );
};

export default Login;
