"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { GoogleIcon, LinkedInIcon, SpinLoading } from "@/icons";
import authServices from "@/services/auth/auth.service";
import { RegisterEmployerDto } from "@/services/auth/auth.interface";
import { isInvalidForm } from "@/helpers";

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
    const [loading, setLoading] = React.useState(false);

    const validInputs = () => {
        const errors = { ...signupFormErr };
        const { email, password } = signupForm;

        if (!email) errors.emailErr = _t.signup_form.error.empty_email;

        if (!regex.test(password))
            errors.passwordErr = `Password must have at least 8 characters!
            Password must have at least one uppercase, one lowercase and one number!`;
        if (isInvalidForm(errors)) {
            setSignupFormErr(errors);
            return false;
        }
        return true;
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validInputs())
            return toast.error(`Invalid input!
        Please check red places`);

        setLoading(true);
        try {
            const res = await authServices.registerEmployee(signupForm);

            toast.success(res.message);
            router.push(`login`);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-4">
                <h1 className={styles.title}>
                    {_t.signup_form.title.highlight}
                </h1>
                <div className="mb-2 text-left">
                    <label
                        htmlFor="first-name"
                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                        {_t.signup_form.label.first_name}
                    </label>
                    <input
                        type="type"
                        id="first-name"
                        autoComplete="given-name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        value={signupForm.firstName}
                        required
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
                    />
                </div>
                <div className="mb-2 text-left">
                    <label
                        htmlFor="last-name"
                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                        {_t.signup_form.label.last_name}
                    </label>
                    <input
                        type="text"
                        id="last-name"
                        autoComplete="family-name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                        required
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
                    />
                </div>
                <div className="mb-2 text-left">
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                        {_t.signup_form.label.email}
                    </label>
                    <input
                        type="email"
                        id="email"
                        autoComplete="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                    />
                </div>
                <div className="text-left">
                    <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
                    >
                        {_t.signup_form.label.password}
                    </label>
                    <input
                        type="password"
                        id="password"
                        placeholder="**********"
                        autoComplete="new-password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={signupForm.password}
                        required
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
                    />
                </div>
                {signupFormErr.emailErr && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="w-full border-2 border-red-500 bg-red-50 p-6 rounded-md text-center text-red-700 text-sm font-medium"
                    >
                        <p>{_t.common.error.noti}</p>
                        <p>{signupFormErr.emailErr}</p>
                    </motion.div>
                )}
                <button
                    type="submit"
                    className="flex items-center gap-1 justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-80 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading && <SpinLoading />}
                    {_t.signup_form.btn.signup}
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
