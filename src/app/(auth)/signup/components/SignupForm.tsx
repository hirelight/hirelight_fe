"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import { GoogleIcon, LinkedInIcon } from "@/icons";
import { delayFunc } from "@/helpers/shareHelpers";

import styles from "./SignupForm.module.scss";

const initialFormState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
};

const initialFormErrState = {
    emailErr: "",
    passwordErr: "",
    firstNameErr: "",
    lastNameErr: "",
};

const SignupForm = () => {
    const router = useRouter();
    const code = useSearchParams().get("code");

    const [signupFormErr, setSignupFormErr] =
        React.useState(initialFormErrState);
    const [signupForm, setSignupForm] = React.useState(initialFormState);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (signupForm.email === "")
            return setSignupFormErr(prev => ({
                ...prev,
                emailErr: "Email must not empty!",
            }));

        Cookies.set("hirelight_access_token", "tokenasdkajsdnkas", {
            domain: `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`,
        });
        Cookies.set("hirelight_access_token", "tokenasdkajsdnkas");

        toast.success("Sign up  success");
        await delayFunc(2000);

        router.push(`/organization/new`);
    };

    React.useEffect(() => {
        if (code) {
            console.log("Call api get token", code);
        }
    }, [code]);

    return (
        <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-4">
                <h1 className={styles.title}>Sign in to Hirelight</h1>
                <div className="mb-2 text-left">
                    <label
                        htmlFor="first-name"
                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                        First name
                    </label>
                    <input
                        type="type"
                        id="first-name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        value={signupForm.firstName}
                        required
                        onChange={e => {
                            setSignupForm({
                                ...signupForm,
                                firstName: e.target.value,
                            });
                            setSignupFormErr(initialFormErrState);
                        }}
                    />
                </div>
                <div className="mb-2 text-left">
                    <label
                        htmlFor="last-name"
                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                        Last name
                    </label>
                    <input
                        type="text"
                        id="last-name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                        required
                        value={signupForm.lastName}
                        onChange={e => {
                            setSignupForm({
                                ...signupForm,
                                lastName: e.target.value,
                            });
                            setSignupFormErr(initialFormErrState);
                        }}
                    />
                </div>
                <div className="mb-2 text-left">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                        Work email
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example@hirelight.xyz"
                        value={signupForm.email}
                        onChange={e => {
                            setSignupForm({
                                ...signupForm,
                                email: e.target.value,
                            });
                            setSignupFormErr(initialFormErrState);
                        }}
                    />
                </div>
                <div className="text-left">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="**********"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={signupForm.password}
                        required
                        onChange={e => {
                            setSignupForm({
                                ...signupForm,
                                password: e.target.value,
                            });
                            setSignupFormErr(initialFormErrState);
                        }}
                    />
                </div>
                {signupFormErr.emailErr && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="w-full border-2 border-red-500 bg-red-50 p-6 rounded-md text-center text-red-700 text-sm font-medium"
                    >
                        <p>Opps! Something went wrong!!!</p>
                        <p>{signupFormErr.emailErr}</p>
                    </motion.div>
                )}
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Sign up
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
                    <span>Sign up with Google</span>
                </Link>
                <Link
                    href={process.env.NEXT_PUBLIC_EMPLOYER_LOGIN_LINKEDIN || ""}
                    className={styles.button__signin__with}
                >
                    <LinkedInIcon className="w-8 h-8 mr-1" />
                    <span>Sign up with LinkedIn</span>
                </Link>
            </div>
        </form>
    );
};

export default SignupForm;