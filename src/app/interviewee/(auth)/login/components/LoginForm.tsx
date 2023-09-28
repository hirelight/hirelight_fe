"use client";

import Link from "next/link";
import React, { FormEvent, useState } from "react";

import { Button } from "@/components";
import { SpinLoading } from "@/icons";

const LoginForm = () => {
    // document.cookie =
    //     "hirelight_access_token=asdasdasdasd; domain:jobs.locahost:3000; path=/";

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const [formErr, setFormErr] = useState({
        emailError: "",
        passwordError: "",
    });

    const handleSubmitLogin = (e: FormEvent) => {
        e.preventDefault();
        setFormErr({
            ...formErr,
            passwordError: "Password incorrect!",
        });
        console.log("Login");
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
                    {isLoading && <SpinLoading className="mr-3" />}
                    Sign in
                </Button>
            </div>
        </form>
    );
};

export default LoginForm;
