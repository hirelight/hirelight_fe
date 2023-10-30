"use client";

import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { RegisterCandidateDto } from "@/services/auth/auth.interface";
import authServices from "@/services/auth/auth.service";

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
    const [loading, setLoading] = useState(true);

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
                <input
                    type="password"
                    id="password"
                    value={formState.password}
                    onChange={e => handleChangeForm(e, "password")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    required
                />
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
                <input
                    type="password"
                    id="confirm_password"
                    value={formState.confirmPassword}
                    onChange={e => handleChangeForm(e, "confirmPassword")}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="•••••••••"
                    required
                />
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
                {loading && (
                    <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4 mr-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="#E5E7EB"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentColor"
                        />
                    </svg>
                )}
                Submit
            </button>
        </form>
    );
};

export default SignupForm;
