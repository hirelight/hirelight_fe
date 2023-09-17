import React from "react";

import background from "/public/images/interviewee_auth_bg.png";

import Image from "next/image";
import Link from "next/link";

import SignupForm from "./components/SignupForm";
import styles from "./signup.module.scss";

const IntervieweeSignup = () => {
    return (
        <main className="flex-1 flex relative">
            <div className="w-full lg:w-[45%] xl:flex-1 absolute inset-0 lg:relative opacity-20 lg:opacity-80">
                <Image
                    alt="Background"
                    src={background}
                    className="w-auto h-full object-cover"
                />
            </div>

            <div className="flex-1 lg:bg-white relative">
                <div className="flex min-h-full flex-col px-6 pt-10 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className={styles.title__gradient}>
                            Try Hirelight for free
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-xl">
                        <SignupForm />
                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have a Hirelight account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default IntervieweeSignup;
