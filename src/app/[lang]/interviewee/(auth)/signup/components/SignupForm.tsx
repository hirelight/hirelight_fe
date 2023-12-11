"use client";

import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { RegisterCandidateDto } from "@/services/auth/auth.interface";
import authServices from "@/services/auth/auth.service";
import { SpinLoading } from "@/icons";
import { Button } from "@/components";
import { handleError, isInvalidForm } from "@/helpers";

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

const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

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

    const validInputs = () => {
        const errors = { ...formError };
        const { email, password, confirmPassword } = formState;

        if (!email) errors.email = "Email is required";

        if (!regex.test(password))
            errors.password = `Password must have at least 8 characters!
            Password must have at least one uppercase, one lowercase and one number!`;

        if (password !== confirmPassword)
            errors.confirmPassword = "Confirm password not matched!";

        if (isInvalidForm(errors)) {
            setFormError(errors);
            return false;
        }

        return true;
    };

    const handleSubmitSignup = async (e: FormEvent) => {
        e.preventDefault();
        if (!validInputs())
            return toast.error(`Invalid input!
        Please check red places`);
        setLoading(true);
        try {
            const res = await authServices.registerCandidate(formState);

            toast.success(res.message);
            setLoading(false);
            router.push("login");
        } catch (error) {
            setLoading(false);
            handleError(error);
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
                        autoComplete="first-name"
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
                        autoComplete="last-name"
                        required
                    />
                    {formError.lastName && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
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
                    autoComplete="email"
                    required
                />
                {formError.email && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
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
                        minLength={8}
                        maxLength={25}
                        title="Password must between 8 and 25"
                        autoComplete="new-password"
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
                        minLength={8}
                        maxLength={25}
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
                        {formError.confirmPassword}.
                    </p>
                )}
            </div>

            <Button
                type="submit"
                className="!w-full"
                disabled={loading}
                isLoading={loading}
            >
                Submit
            </Button>
        </form>
    );
};

export default SignupForm;
