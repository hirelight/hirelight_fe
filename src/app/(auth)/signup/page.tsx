import React, { FormEvent } from "react";
import Link from "next/link";
import { Metadata } from "next";

import SignupForm from "./components/SignupForm";

export const metadata: Metadata = {
    title: "Hirelight Recruitment Software - Sign up",
};

const Signup = () => {
    return (
        <div className="min-w-[500px] min-h-[400px] relative bg-white shadow-lg rounded-md p-8 mx-0 md:mx-6 text-center">
            <SignupForm />
            <div className="mt-8 text-sm text-center relative">
                <span className="text-gray-500 mr-1">
                    Already have a Hirelight account?
                </span>
                <Link
                    href={"/login"}
                    className="font-semibold text-blue-600 hover:cursor-pointer hover:underline"
                >
                    Sign in
                </Link>
            </div>
        </div>
    );
};

export default Signup;
