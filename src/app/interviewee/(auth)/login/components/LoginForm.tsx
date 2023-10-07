"use client";

import Link from "next/link";
import React, { FormEvent, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { Button } from "@/components";
import { SpinLoading } from "@/icons";
import { delayFunc } from "@/helpers/shareHelpers";

const LoginForm = () => {
    // document.cookie =
    //     "hirelight_access_token=asdasdasdasd; domain:jobs.locahost:3000; path=/";
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = React.useState(false);

    const [formErr, setFormErr] = useState({
        emailError: "",
        passwordError: "",
    });

    const handleSubmitLogin = async (e: FormEvent) => {
        e.preventDefault();
        setFormErr({
            ...formErr,
            passwordError: "Password incorrect!",
        });

        if (process.env.NODE_ENV === "production")
            Cookies.set("hirelight_access_token", "tokenasdkajsdnkas", {
                domain: `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
                secure: true,
            });
        else
            Cookies.set("hirelight_access_token", "tokenasdkajsdnkas", {
                domain: `.local`,
                secure: true,
            });
        await delayFunc(2000);
        toast.success("Sign in  success");
        await delayFunc(500);
        setLoading(false);
        router.replace(
            `${window.location.protocol}//fpt.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}?code=123`
        );
    };
    return (
        <form className="space-y-6" onSubmit={handleSubmitLogin}>
            <div>
                <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                >
                    Email address
                </label>
                <div className="mt-2">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={email}
                        onChange={e => {
                            setEmail(e.target.value);
                            setFormErr({ ...formErr, emailError: "" });
                        }}
                        autoComplete="email"
                        placeholder="johndoe@gmail.com"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formErr.emailError && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oh, snapp!</span>{" "}
                            {formErr.emailError}.
                        </p>
                    )}
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                    >
                        Password
                    </label>
                    <div className="text-sm">
                        <Link
                            href="forgot-password"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={e => {
                            setPassword(e.target.value);
                            setFormErr({ ...formErr, passwordError: "" });
                        }}
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {formErr.passwordError && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oh, snapp!</span>{" "}
                            {formErr.passwordError}.
                        </p>
                    )}
                </div>
            </div>

            <div>
                <Button type="submit" className="w-full">
                    {loading && <SpinLoading className="mr-3" />}
                    Sign in
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
