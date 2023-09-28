import { Metadata } from "next";
import React from "react";
import Link from "next/link";

import styles from "./login.module.scss";
import LoginForm from "./components/LoginForm";

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
                        <img
                            className="mx-auto h-10 w-auto"
                            src={
                                "https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            }
                            alt="Your Company"
                            height={40}
                            width={120}
                            loading="lazy"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
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
                        <div className="w-full flex justify-center gap-6">
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <svg
                                    className="w-3.5 h-3.5 mr-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 18 21"
                                >
                                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                                </svg>
                                Buy now
                            </button>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Choose plan
                                <svg
                                    className="w-3.5 h-3.5 ml-2"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 10"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M1 5h12m0 0L9 1m4 4L9 9"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="mt-10 text-center text-sm text-gray-500">
                            <p>Don&apos;t have a Workable account?</p>
                            <Link
                                href="/signup"
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                                Start a 14 day free trial
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default IntervieweeLogin;
