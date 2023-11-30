import { Metadata } from "next";
import React from "react";
import Link from "next/link";

import { GoogleIcon, LinkedInIcon } from "@/icons";

import styles from "./login.module.scss";
import LoginForm from "./components/LoginForm";

import Image from "next/image";

import logo from "/public/images/logo.svg";

export const metadata: Metadata = {
    title: "Create an account or log in | Jobs on Hirelight",
};

const IntervieweeLogin = async () => {
    return (
        <main className={styles.wrapper}>
            <div className="relative flex-1 flex justify-center items-center">
                <div className="flex min-w-[500px] bg-white flex-col justify-center px-6 py-12 lg:px-8 drop-shadow-lg border border-gray-200 rounded-lg">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <Image
                            className="mx-auto h-20 w-auto"
                            src={logo}
                            alt="Your Company"
                            height={80}
                            width={120}
                            loading="lazy"
                        />
                        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <LoginForm />

                        <div className="flex gap-6 items-center mt-12 mb-8">
                            <div className="flex-1 h-[1px] bg-gray-400" />
                            <span className="text-neutral-700">
                                Or continue with
                            </span>
                            <div className="flex-1 h-[1px] bg-gray-400" />
                        </div>

                        <Link
                            href={
                                process.env
                                    .NEXT_PUBLIC_CANDIDATE_LOGIN_GOOGLE || ""
                            }
                            className={styles.button__signin__with}
                        >
                            <GoogleIcon className="w-6 h-6 mr-2" />
                            <span>Sign in with Google</span>
                        </Link>
                        <Link
                            href={
                                process.env
                                    .NEXT_PUBLIC_CANDIDATE_LOGIN_LINKEDIN || ""
                            }
                            className={styles.button__signin__with}
                        >
                            <LinkedInIcon className="w-8 h-8 mr-1" />
                            <span>Sign in with LinkedIn</span>
                        </Link>

                        <div className="mt-10 text-center text-sm text-gray-500">
                            <p>Don&apos;t have a Hirelight account?</p>
                            <Link
                                href="/signup"
                                className="font-semibold leading-6 text-blue_primary_700 hover:text-blue_primary_800"
                            >
                                Register now
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default IntervieweeLogin;
