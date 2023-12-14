"use client";

import React, { useCallback, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import jwtDecode from "jwt-decode";

import { GoogleIcon, LinkedInIcon } from "@/icons";
import { LoginEmployerDto } from "@/services/auth/auth.interface";
import { fetchAccessToken } from "@/redux/thunks/auth.thunk";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { handleError } from "@/helpers";
import authServices from "@/services/auth/auth.service";
import { setToken } from "@/redux/slices/auth.slice";
import { Button } from "@/components";

import styles from "./LoginForm.module.scss";

interface ILoginForm {
    _t: Record<"login_form" | "common", any>;
}

const LoginForm: React.FC<ILoginForm> = ({ _t }) => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { token: userToken } = useAppSelector(state => state.auth);

    const { lang } = useParams();

    const loginStatus = useSearchParams().get("status");
    const loginId = useSearchParams().get("loginId");
    const isOrgOwner = useSearchParams().get("is_org_owner");
    const isOrgMember = useSearchParams().get("is_org_member");

    const [pageLoading, setPageLoading] = useState(false);
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

    const isAdmin = useCallback((token: string) => {
        const decoded: any = jwtDecode(token);

        return decoded.role === "SYSTEM_ADMIN";
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);

        try {
            const res = await authServices.loginEmployer(loginForm);
            dispatch(setToken(res.data.accessToken));

            if (isAdmin(res.data.accessToken))
                return router.replace(
                    `${window.location.protocol}//admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${lang}/organizations?accessToken=${res.data.accessToken}`
                );

            router.push(
                `select-org?isOrgOwner=${isOrgOwner}&isOrgMember=${isOrgMember}`
            );
            // handleRedirectOrgBased(res.data.accessToken);
        } catch (error) {
            setLoading(false);
            handleError(error);
        }
    };

    const getToken = React.useCallback(
        async (loginId: string) => {
            setPageLoading(true);

            try {
                await dispatch(fetchAccessToken(loginId));

                router.push(
                    `/select-org?isOrgOwner=${isOrgOwner}&isOrgMember=${isOrgMember}`
                );
            } catch (error) {
                console.error(error);
                setPageLoading(false);
            }
        },
        [dispatch, isOrgMember, isOrgOwner, router]
    );

    React.useEffect(() => {
        if (!userToken) {
            if (loginStatus && loginId) {
                getToken(loginId);
            }
        } else {
            if (loginStatus && loginId) {
                getToken(loginId);
            } else {
                if (isAdmin(userToken))
                    router.replace(
                        `${window.location.protocol}//admin.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/${lang}/organizations?accessToken=${userToken}`
                    );
                else router.push("select-org");
            }
        }
    }, [getToken, isAdmin, lang, loginId, loginStatus, router, userToken]);

    return (
        <React.Fragment>
            <form onSubmit={handleLogin}>
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
                    <Link href={`${lang}/signup`}>
                        <p className="text-right text-xs text-blue_primary_600 font-semibold underline">
                            {_t.login_form.btn.forgot_password}
                        </p>
                    </Link>
                    <Button
                        type="submit"
                        disabled={loading}
                        isLoading={loading}
                    >
                        {_t.login_form.btn.signin}
                    </Button>
                    <div className="flex items-center justify-between gap-2">
                        <hr className="flex-1 h-[1.5px] bg-gray-300" />
                        <span className="text-gray-500 font-medium">
                            {_t.login_form.or}
                        </span>
                        <hr className="flex-1 h-[1.5px] bg-gray-300" />
                    </div>
                    <Link
                        href={
                            process.env.NEXT_PUBLIC_EMPLOYER_LOGIN_GOOGLE || ""
                        }
                        className={styles.button__signin__with}
                    >
                        <GoogleIcon className="w-6 h-6 mr-2" />
                        <span>{_t.login_form.btn.signin_google}</span>
                    </Link>
                    <Link
                        href={
                            process.env.NEXT_PUBLIC_EMPLOYER_LOGIN_LINKEDIN ||
                            ""
                        }
                        className={styles.button__signin__with}
                    >
                        <LinkedInIcon className="w-8 h-8 mr-1" />
                        <span>{_t.login_form.btn.signin_linkedin}</span>
                    </Link>
                </div>
            </form>
        </React.Fragment>
    );
};

export default LoginForm;
