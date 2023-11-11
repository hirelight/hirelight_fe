"use client";

import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { RegisterCandidateDto } from "@/services/auth/auth.interface";
import authServices from "@/services/auth/auth.service";
import { SpinLoading } from "@/icons";

const initialErr = {
    firstName: "",
    lastName: "",
    company: "",
    phoneNumber: "",
    site: "",
    visitors: 0,
    email: "",
    password: "",
    confirmPassword: "",
};

interface FormState extends RegisterCandidateDto {
    confirmPassword: string;
}

const SignupForm = () => {
    const router = useRouter();

    const [formState, setFormState] = useState<FormState>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [formError, setFormError] = useState(initialErr);
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleChangeForm = (e: any, key: string) => {
        setFormState({
            ...formState,
            [key]: e.target.value,
        });
        setFormError({
            ...formError,
            [key]: "",
        });
    };

    const handleSubmitSignup = async (e: FormEvent) => {
        e.preventDefault();
        if (formState.password !== formState.confirmPassword) {
            setFormError({
                ...formError,
                confirmPassword: "Confirm password not matched!",
            });
        }

        try {
            const res = await authServices.registerCandidate(formState);

            toast.success(res.message);
            setLoading(false);
            router.push("login");
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmitSignup}>
            <div className="grid gap-4 mb-4 md:grid-cols-2">
                <div>
                    <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        First name
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="first_name"
                        value={formState.firstName}
                        onChange={e => handleChangeForm(e, "firstName")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        required
                    />
                    {formError.firstName && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oh, snapp!</span>{" "}
                            {formError.firstName}.
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                        Last name
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="last_name"
                        value={formState.lastName}
                        onChange={e => handleChangeForm(e, "lastName")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Doe"
                        required
                    />
                    {formError.lastName && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Oh, snapp!</span>{" "}
                            {formError.lastName}.
                        </p>
                    )}
                </div>
            </div>
            <div className="mb-4">
                <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Email address
                    <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    id="email"
                    value={formState.email}
                    onChange={e => handleChangeForm(e, "email")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john.doe@company.com"
                    required
                />
                {formError.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oh, snapp!</span>{" "}
                        {formError.email}.
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Password
                    <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={formState.password}
                        onChange={e => handleChangeForm(e, "password")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••"
                        required
                    />
                    <button
                        type="button"
                        className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                </div>
                {formError.password && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oh, snapp!</span>{" "}
                        {formError.password}.
                    </p>
                )}
            </div>
            <div className="mb-4">
                <label
                    htmlFor="confirm_password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    Confirm password
                    <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input
                        type={showConfirm ? "text" : "password"}
                        id="confirm_password"
                        value={formState.confirmPassword}
                        onChange={e => handleChangeForm(e, "confirmPassword")}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="•••••••••"
                        required
                    />
                    <button
                        type="button"
                        className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2"
                        onClick={() => setShowConfirm(!showConfirm)}
                    >
                        {showConfirm ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                </div>
                {formError.confirmPassword && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">Oh, snapp!</span>{" "}
                        {formError.confirmPassword}.
                    </p>
                )}
            </div>
            <div className="flex items-start mb-4">
                <div className="flex items-center h-5">
                    <input
                        id="remember"
                        type="checkbox"
                        value=""
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                        required
                    />
                </div>
                <label
                    htmlFor="remember"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                    I agree with the{" "}
                    <a
                        href="#"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                        terms and conditions
                    </a>
                    .
                </label>
            </div>
            <button
                type="submit"
                className="flex w-full justify-center items-center  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {loading && <SpinLoading className="mr-2" />}
                Submit
            </button>
        </form>
    );
};

export default SignupForm;
