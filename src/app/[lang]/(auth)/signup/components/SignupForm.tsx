"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import { GoogleIcon, LinkedInIcon, SpinLoading } from "@/icons";
import authServices from "@/services/auth/auth.service";
import { RegisterEmployerDto } from "@/services/auth/auth.interface";
import { handleError, isInvalidForm } from "@/helpers";
import { Button, ButtonOutline, CustomInput } from "@/components";

import styles from "./SignupForm.module.scss";

const initialFormState = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    otp: "",
};

const initialFormErrState = {
    emailErr: "",
    passwordErr: "",
    firstNameErr: "",
    lastNameErr: "",
    confirmPasswordErr: "",
    otpErr: "",
};

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

interface ISignupForm {
    _t: Record<"signup_form" | "common", any>;
}

const SignupForm: React.FC<ISignupForm> = ({ _t }) => {
    const router = useRouter();
    const { lang } = useParams();

    const [signupFormErr, setSignupFormErr] =
        React.useState(initialFormErrState);
    const [signupForm, setSignupForm] =
        React.useState<RegisterEmployerDto>(initialFormState);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = React.useState(false);
    const [sendLoading, setSendLoading] = React.useState(false);
    const [showVerify, setShowVerify] = React.useState(false);

    const validInputs = () => {
        const errors = { ...signupFormErr };
        const { email, password, firstName, lastName } = signupForm;

        if (!email) errors.emailErr = _t.signup_form.error.empty_email;
        if (!firstName) errors.firstNameErr = "First name is required!";
        if (!lastName) errors.lastNameErr = "Last name is required!";

        if (!regex.test(password))
            errors.passwordErr = `Password must have at least 8 characters!
            Password must have at least one uppercase, one lowercase and one number!`;

        if (confirmPassword !== password)
            errors.confirmPasswordErr = "Confirm password miss match!";
        if (isInvalidForm(errors)) {
            setSignupFormErr(errors);
            return false;
        }
        return true;
    };

    const handleSendVerifyCode = async () => {
        if (!signupForm.email)
            return setSignupFormErr({
                ...signupFormErr,
                emailErr: "Email is required for getting verify code",
            });

        setSendLoading(true);
        try {
            const res = await authServices.sendVerifyCode(signupForm.email);
            toast.success(res.message);
            setShowVerify(true);
        } catch (error) {
            handleError(error);
        }
        setSendLoading(false);
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validInputs())
            return toast.error(
                <div>
                    <p>Invalid input!</p>
                    <p>Please check red places!</p>
                </div>
            );

        setLoading(true);
        try {
            const res = await authServices.registerEmployee(signupForm);

            toast.success(res.message);
            router.push(`login`);
        } catch (error) {
            setLoading(false);
            handleError(error);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-4">
                <h1 className={styles.title}>
                    {_t.signup_form.title.highlight}
                </h1>
                <div className="mb-2 text-left grid grid-cols-2 gap-4">
                    <CustomInput
                        id="first-name"
                        title="First name"
                        autoComplete="given-name"
                        placeholder="John"
                        value={signupForm.firstName}
                        onChange={e => {
                            setSignupForm({
                                ...signupForm,
                                firstName: e.target.value,
                            });
                            setSignupFormErr({
                                ...signupFormErr,
                                firstNameErr: "",
                            });
                        }}
                        required
                        errorText={signupFormErr.firstNameErr}
                    />
                    <CustomInput
                        id="last-name"
                        title="Last name"
                        autoComplete="family-name"
                        placeholder="Doe"
                        value={signupForm.lastName}
                        onChange={e => {
                            setSignupForm({
                                ...signupForm,
                                lastName: e.target.value,
                            });
                            setSignupFormErr({
                                ...signupFormErr,
                                lastNameErr: "",
                            });
                        }}
                        required
                        errorText={signupFormErr.lastNameErr}
                    />
                </div>
                <div className="mb-2 text-left">
                    <CustomInput
                        id="email"
                        title="Email"
                        type="email"
                        autoComplete="email"
                        placeholder="example@hirelight.xyz"
                        value={signupForm.email}
                        onChange={e => {
                            setSignupForm({
                                ...signupForm,
                                email: e.target.value,
                            });
                            setSignupFormErr({
                                ...signupFormErr,
                                emailErr: "",
                            });
                        }}
                        required
                        errorText={signupFormErr.emailErr}
                    />
                </div>

                <div className="text-left mb-2">
                    <CustomInput
                        id="password"
                        title="Password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="**********"
                        value={signupForm.password}
                        onChange={e => {
                            setSignupForm({
                                ...signupForm,
                                password: e.target.value,
                            });
                            setSignupFormErr({
                                ...signupFormErr,
                                passwordErr: "",
                            });
                        }}
                        required
                        errorText={signupFormErr.passwordErr}
                    />
                </div>
                <div className="text-left mb-2">
                    <CustomInput
                        id="confirm-password"
                        title="Confirm password"
                        type="password"
                        placeholder="**********"
                        value={confirmPassword}
                        onChange={e => {
                            setConfirmPassword(e.target.value);
                            setSignupFormErr({
                                ...signupFormErr,
                                confirmPasswordErr: "",
                            });
                        }}
                        required
                        errorText={signupFormErr.confirmPasswordErr}
                    />
                </div>

                {showVerify && (
                    <div className="text-left">
                        <CustomInput
                            id="verify-code"
                            title="Verify code"
                            type="text"
                            value={signupForm.otp}
                            required
                            onChange={e => {
                                setSignupForm({
                                    ...signupForm,
                                    otp: e.target.value,
                                });
                                setSignupFormErr({
                                    ...signupFormErr,
                                    otpErr: "",
                                });
                            }}
                            errorText={signupFormErr.otpErr}
                        />
                    </div>
                )}
                {showVerify && (
                    <Button
                        type="submit"
                        disabled={loading || sendLoading}
                        isLoading={loading}
                    >
                        {_t.signup_form.btn.signup}
                    </Button>
                )}
                <ButtonOutline
                    type="button"
                    disabled={sendLoading || loading}
                    isLoading={sendLoading}
                    onClick={handleSendVerifyCode}
                >
                    {showVerify ? "Resend code" : "Get verify code"}
                </ButtonOutline>

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
                    <span>{_t.signup_form.btn.signup_google}</span>
                </Link>
                <Link
                    href={process.env.NEXT_PUBLIC_EMPLOYER_LOGIN_LINKEDIN || ""}
                    className={styles.button__signin__with}
                >
                    <LinkedInIcon className="w-8 h-8 mr-1" />
                    <span>{_t.signup_form.btn.signup_linkedin}</span>
                </Link>
            </div>
        </form>
    );
};

export default SignupForm;
