import React, { FormEvent } from "react";
import Link from "next/link";
import { Metadata } from "next";

import HeaderBar from "./components/HeaderBar";
import styles from "./login.module.scss";
import LoginForm from "./components/LoginForm";

const Login = () => {
    return (
        <>
            <HeaderBar />
            <div className={styles.wrapper}>
                <div className="min-w-[500px] min-h-[400px] relative bg-white border border-gray-300 rounded-md p-8 mx-0 md:mx-6 text-center">
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
            </div>
        </>
    );
};

export default Login;
