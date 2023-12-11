"use client";

import Link from "next/link";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { Button, Portal } from "@/components";
import { SpinLoading } from "@/icons";
import { LoginCandidateDto } from "@/services/auth/auth.interface";
import authServices from "@/services/auth/auth.service";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setToken } from "@/redux/slices/auth.slice";
import { fetchAccessToken } from "@/redux/thunks/auth.thunk";

const LoginForm = () => {
    const router = useRouter();
    const loginStatus = useSearchParams().get("status");
    const loginId = useSearchParams().get("loginId");
    const dispatch = useAppDispatch();

    const [formState, setFormState] = useState<LoginCandidateDto>({
        email: "",
        password: "",
    });

    const [pageLoading, setPageLoading] = useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formErr, setFormErr] = useState({
        emailError: "",
        passwordError: "",
    });

    const handleSubmitLogin = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await authServices.loginCandidate(formState);

            toast.success(res.message);
            dispatch(setToken(res.data.accessToken));

            router.push("/");
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
            setLoading(false);
        }
    };

    const getToken = React.useCallback(
        async (loginId: string) => {
            setPageLoading(true);
            try {
                await dispatch(fetchAccessToken(loginId));

                router.push(`/`);
            } catch (error) {
                console.error(error);
                setPageLoading(false);
            }
        },
        [dispatch, router]
    );

    React.useEffect(() => {
        if (loginStatus && loginId) {
            getToken(loginId);
        }
    }, [getToken, loginId, loginStatus, router]);

    return (
        <>
            {pageLoading && (
                <Portal>
                    <div className="fixed inset-0 z-[2000] w-full h-screen backdrop-brightness-50 backdrop-blur-sm flex items-center justify-center">
                        <SpinLoading className="w-32 h-32 text-blue_primary_600" />
                    </div>
                </Portal>
            )}
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
                            value={formState.email}
                            onChange={e => {
                                setFormState({
                                    ...formState,
                                    email: e.target.value,
                                });
                                setFormErr({ ...formErr, emailError: "" });
                            }}
                            autoComplete="email"
                            placeholder="johndoe@gmail.com"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_600 sm:text-sm sm:leading-6"
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
                                className="font-semibold text-blue_primary_700 hover:text-blue_primary_800"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>
                    <div className="mt-2">
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={formState.password}
                                onChange={e => {
                                    setFormState({
                                        ...formState,
                                        password: e.target.value,
                                    });
                                    setFormErr({
                                        ...formErr,
                                        passwordError: "",
                                    });
                                }}
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_600 sm:text-sm sm:leading-6"
                            />
                            <button
                                type="button"
                                className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                            </button>
                        </div>
                        {formErr.passwordError && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">Oh, snapp!</span>{" "}
                                {formErr.passwordError}.
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    <Button
                        type="submit"
                        className="!w-full"
                        disabled={loading || pageLoading}
                        isLoading={loading}
                    >
                        Sign in
                    </Button>
                </div>
            </form>
        </>
    );
};

export default LoginForm;
