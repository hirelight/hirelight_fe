"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";

import { GoogleIcon, LinkedInIcon } from "@/icons";

import styles from "./LoginForm.module.scss";

const LoginForm = () => {
    const router = useRouter();
    const code = useSearchParams().get("code");

    const [loginFormErr, setLoginFormErr] = React.useState({
        emailErr: "",
        passwordErr: "",
    });
    const [loginForm, setLoginForm] = React.useState({
        email: "",
        password: "",
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginForm.email === "")
            return setLoginFormErr(prev => ({
                ...prev,
                emailErr: "Email must not empty!",
            }));

        Cookies.set("hirelight_access_token", "tokenasdkajsdnkas", {
            domain: `fpt.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        });
        console.log(
            `${window.location.protocol}//fpt.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}?code=123`
        );
        router.push(
            `${window.location.protocol}//fpt.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}?code=123`
        );
    };

    React.useEffect(() => {
        if (code) {
            console.log("Call api get token", code);
        }
    }, [code]);

    return (
        <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-4">
                <h1 className={styles.title}>Sign in to Hirelight</h1>
                <div className="mb-2 text-left">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Email address
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example@gmail.com"
                        value={loginForm.email}
                        onChange={e => {
                            setLoginForm({
                                ...loginForm,
                                email: e.target.value,
                            });
                            setLoginFormErr({ emailErr: "", passwordErr: "" });
                        }}
                    />
                </div>
                <div className="text-left">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={loginForm.password}
                        required
                        onChange={e => {
                            setLoginForm({
                                ...loginForm,
                                password: e.target.value,
                            });
                            setLoginFormErr({ emailErr: "", passwordErr: "" });
                        }}
                    />
                </div>
                {loginFormErr.emailErr && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="w-full border-2 border-red-500 bg-red-50 p-6 rounded-md text-center text-red-700 text-sm font-medium"
                    >
                        <p>Opps! Something went wrong!!!</p>
                        <p>{loginFormErr.emailErr}</p>
                    </motion.div>
                )}
                <Link href={"/signup"}>
                    <p className="text-right text-xs text-blue_primary_600 font-semibold underline mb-4">
                        Forgot your password?
                    </p>
                </Link>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Sign in
                </button>

                <div className="flex items-center justify-between gap-2">
                    <hr className="flex-1 h-[1.5px] bg-gray-300" />
                    <span className="text-gray-500 font-medium">OR</span>
                    <hr className="flex-1 h-[1.5px] bg-gray-300" />
                </div>

                <Link
                    href={process.env.NEXT_PUBLIC_EMPLOYER_LOGIN_GOOGLE || ""}
                    className={styles.button__signin__with}
                >
                    <GoogleIcon className="w-6 h-6 mr-2" />
                    <span>Sign in with Google</span>
                </Link>
                <Link
                    href={process.env.NEXT_PUBLIC_EMPLOYER_LOGIN_LINKEDIN || ""}
                    className={styles.button__signin__with}
                >
                    <LinkedInIcon className="w-8 h-8 mr-1" />
                    <span>Sign in with LinkedIn</span>
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
