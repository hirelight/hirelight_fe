"use client";

import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { RegisterCandidateDto } from "@/services/auth/auth.interface";
import authServices from "@/services/auth/auth.service";
import { SpinLoading } from "@/icons";
import { Button, ButtonOutline, CustomInput } from "@/components";
import { handleError, isInvalidForm } from "@/helpers";

const initialErr = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    otp: "",
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
        otp: "",
    });

    const [formError, setFormError] = useState(initialErr);
    const [loading, setLoading] = useState(false);
    const [sendLoading, setSendLoading] = React.useState(false);
    const [showVerify, setShowVerify] = React.useState(false);

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

    const handleSendVerifyCode = async () => {
        if (!formState.email)
            return setFormError({
                ...formError,
                email: "Email is required for getting verify code",
            });
        setSendLoading(true);
        try {
            const res = await authServices.sendVerifyCode({
                email: formState.email,
                type: "REGISTER",
            });
            toast.success(res.message);
            setShowVerify(true);
        } catch (error) {
            handleError(error);
        }
        setSendLoading(false);
    };

    const handleSubmitSignup = async (e: FormEvent) => {
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
            const res = await authServices.registerCandidate(formState);

            toast.success(res.message);
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
                    <CustomInput
                        id="first-name"
                        title="First name"
                        autoComplete="given-name"
                        placeholder="John"
                        value={formState.firstName}
                        onChange={e => handleChangeForm(e, "firstName")}
                        required
                        errorText={formError.firstName}
                    />
                </div>
                <div>
                    <CustomInput
                        id="last-name"
                        title="Last name"
                        autoComplete="family-name"
                        placeholder="Doe"
                        value={formState.lastName}
                        onChange={e => handleChangeForm(e, "lastName")}
                        required
                        errorText={formError.lastName}
                    />
                </div>
            </div>
            <div className="mb-4">
                <CustomInput
                    id="email"
                    title="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@hirelight.xyz"
                    value={formState.email}
                    onChange={e => handleChangeForm(e, "email")}
                    required
                    errorText={formError.email}
                />
            </div>
            <div className="mb-4">
                <CustomInput
                    id="password"
                    title="Password"
                    type="password"
                    placeholder="**********"
                    value={formState.password}
                    onChange={e => handleChangeForm(e, "password")}
                    required
                    errorText={formError.password}
                />
            </div>
            <div className="mb-4">
                <CustomInput
                    id="confirm-password"
                    title="Confirm password"
                    type="password"
                    placeholder="**********"
                    value={formState.confirmPassword}
                    onChange={e => handleChangeForm(e, "confirmPassword")}
                    required
                    errorText={formError.confirmPassword}
                />
            </div>

            {showVerify && (
                <div className="text-left mb-6">
                    <CustomInput
                        id="verify-code"
                        title="Verify code"
                        type="text"
                        value={formState.otp}
                        required
                        onChange={e => {
                            setFormState({
                                ...formState,
                                otp: e.target.value,
                            });
                            setFormError({
                                ...formError,
                                otp: "",
                            });
                        }}
                        errorText={formError.otp}
                    />
                </div>
            )}

            {showVerify && (
                <Button
                    type="submit"
                    className="!w-full mb-4"
                    disabled={loading || sendLoading}
                    isLoading={loading}
                >
                    Submit
                </Button>
            )}
            <ButtonOutline
                type="button"
                className="!w-full"
                disabled={sendLoading || loading}
                isLoading={sendLoading}
                onClick={handleSendVerifyCode}
            >
                {showVerify ? "Resend code" : "Get verify code"}
            </ButtonOutline>
        </form>
    );
};

export default SignupForm;
