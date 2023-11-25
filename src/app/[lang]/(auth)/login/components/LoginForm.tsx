"use client";

import React, { useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

import { Portal } from "@/components/index";
import { GoogleIcon, LinkedInIcon, SpinLoading } from "@/icons";
import { LoginEmployerDto } from "@/services/auth/auth.interface";
import { fetchAccessToken, loginEmailPwd } from "@/redux/thunks/auth.thunk";
import { useAppDispatch } from "@/redux/reduxHooks";
import { decryptData, encryptData } from "@/helpers/authHelpers";
import authServices from "@/services/auth/auth.service";
import { setToken } from "@/redux/slices/auth.slice";

import styles from "./LoginForm.module.scss";

interface ILoginForm {
    _t: Record<"login_form" | "common", any>;
}

const LoginForm: React.FC<ILoginForm> = ({ _t }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();

    const loginStatus = useSearchParams().get("status");
    const loginId = useSearchParams().get("loginId");
    const isOrgOwner = useSearchParams().get("is_org_owner");
    const isOrgMember = useSearchParams().get("is_org_member");

    const [loginFormErr, setLoginFormErr] = React.useState({
        emailErr: "",
        passwordErr: "",
        errMessage: "",
    });
    const [loginForm, setLoginForm] = React.useState<LoginEmployerDto>({
        email: "",
        password: "",
    });
    const [loading, setLoading] = React.useState(false);

    const [pageLoading, setPageLoading] = React.useState(false);

    const isAdmin = useCallback((token: string) => {
        const decoded: any = jwtDecode(token);

        return decoded.role === "SYSTEM_ADMIN";
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res: any = await dispatch(loginEmailPwd(loginForm));
            setLoading(false);

            if (isAdmin(res.payload.data.accessToken))
                return router.push("/admin");

            router.push(
                `/select-org?isOrgOwner=${isOrgOwner}&isOrgMember=${isOrgMember}`
            );
            // handleRedirectOrgBased(res.data.accessToken);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    const getToken = React.useCallback(
        async (loginId: string) => {
            setPageLoading(true);
            try {
                const res = await authServices.getAccessToken(loginId);
                encryptData("hirelight_access_token", res.data.accessToken);
                dispatch(setToken(res.data.accessToken));
                router.push(
                    `/select-org?isOrgOwner=${isOrgOwner}&isOrgMember=${isOrgMember}`
                );
            } catch (error) {
                console.log("🚀 ~ file: LoginForm.tsx:86 ~ error:", error);
            }
        },
        [dispatch, isOrgMember, isOrgOwner, router]
    );

    React.useEffect(() => {
        const accessToken = decryptData("hirelight_access_token");
        if (!accessToken) {
            if (loginStatus && loginId) {
                getToken(loginId);
            }
        } else {
            if (isAdmin(accessToken)) router.push("/admin");
            else router.push("select-org");
        }
    }, [getToken, isAdmin, loginId, loginStatus, router]);

    return (
        <form onSubmit={handleLogin}>
            <Portal>
                {pageLoading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[2000] w-full h-screen backdrop-brightness-50 backdrop-blur-sm flex items-center justify-center"
                    >
                        <SpinLoading className="w-32 h-32 text-blue_primary_600" />
                    </motion.div>
                )}
            </Portal>
            <div className="flex flex-col gap-4">
                <h1 className={styles.title}>
                    {_t.login_form.title.highlight}
                </h1>
                {loginFormErr.errMessage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="w-full border-2 border-red-500 bg-red-50 p-6 rounded-md text-center text-red-700 text-sm font-medium max-w-full"
                    >
                        <p>{_t.common.error.noti}</p>
                        <p>{loginFormErr.errMessage}</p>
                    </motion.div>
                )}
                <div className="mb-2 text-left">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                        {_t.login_form.label.email}
                    </label>
                    <input
                        type="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="example@gmail.com"
                        required
                        value={loginForm.email}
                        onChange={e => {
                            setLoginForm(prev => ({
                                ...prev,
                                email: e.target.value,
                            }));
                            setLoginFormErr({
                                emailErr: "",
                                passwordErr: "",
                                errMessage: "",
                            });
                        }}
                    />
                </div>
                <div className="text-left">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                        {_t.login_form.label.password}
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        value={loginForm.password}
                        onChange={e => {
                            setLoginForm(prev => ({
                                ...prev,
                                password: e.target.value,
                            }));
                            setLoginFormErr({
                                emailErr: "",
                                passwordErr: "",
                                errMessage: "",
                            });
                        }}
                    />
                </div>
                {loginFormErr.emailErr && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="w-full border-2 border-red-500 bg-red-50 p-6 rounded-md text-center text-red-700 text-sm font-medium"
                    >
                        <p>{_t.common.error.noti}</p>
                        <p>{loginFormErr.emailErr}</p>
                    </motion.div>
                )}
                <Link href={"/signup"}>
                    <p className="text-right text-xs text-blue_primary_600 font-semibold underline">
                        {_t.login_form.btn.forgot_password}
                    </p>
                </Link>
                <button
                    type="submit"
                    className="flex items-center gap-1 justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    {loading && <SpinLoading />}
                    {_t.login_form.btn.signin}
                </button>

                <div className="flex items-center justify-between gap-2">
                    <hr className="flex-1 h-[1.5px] bg-gray-300" />
                    <span className="text-gray-500 font-medium">
                        {_t.login_form.or}
                    </span>
                    <hr className="flex-1 h-[1.5px] bg-gray-300" />
                </div>

                <Link
                    href={process.env.NEXT_PUBLIC_EMPLOYER_LOGIN_GOOGLE || ""}
                    className={styles.button__signin__with}
                >
                    <GoogleIcon className="w-6 h-6 mr-2" />
                    <span>{_t.login_form.btn.signin_google}</span>
                </Link>
                <Link
                    href={process.env.NEXT_PUBLIC_EMPLOYER_LOGIN_LINKEDIN || ""}
                    className={styles.button__signin__with}
                >
                    <LinkedInIcon className="w-8 h-8 mr-1" />
                    <span>{_t.login_form.btn.signin_linkedin}</span>
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
