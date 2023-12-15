"use client";

import React, { FormEvent, Fragment, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { CloseIcon, Plus, Upload } from "@/icons";

import logo from "/public/images/logo.svg";

import { CustomInput, UserAvatar } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import { handleError, uploadFile } from "@/helpers";
import authServices from "@/services/auth/auth.service";
import { IUpdateInfoDto } from "@/services";

const ChangePasswordForm = () => {
    const [formState, setFormState] = useState<IUpdateInfoDto>({});
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleUpdateAccount = async (e: FormEvent) => {
        e.preventDefault();
        if (formState.password !== confirmPassword) {
            return toast.error("Confirm password missmatch");
        }
        try {
            const res = await authServices.updateProfile(formState);
            toast.success(res.message);
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <Fragment>
            <form
                className="w-full flex flex-col"
                onSubmit={handleUpdateAccount}
            >
                <section className="p-6">
                    <h4 className="mb-3">Change password</h4>
                    <div className="flex flex-col space-y-6">
                        <div className="relative">
                            <CustomInput
                                id="cur-password"
                                type="password"
                                title="Current password"
                                value={formState?.oldPassword ?? ""}
                                onChange={e =>
                                    setFormState({
                                        ...formState,
                                        oldPassword: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="relative">
                            <CustomInput
                                id="new-password"
                                type="password"
                                title="New password"
                                value={formState?.password ?? ""}
                                onChange={e =>
                                    setFormState({
                                        ...formState,
                                        password: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="relative">
                            <CustomInput
                                id="confirm-password"
                                type="password"
                                title="Confirm password"
                                value={confirmPassword}
                                onChange={e =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                            />
                        </div>
                    </div>
                </section>

                <div className="p-6 border-t border-gray-300 w-full text-right">
                    <button
                        type="submit"
                        className="self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Save changes
                    </button>
                </div>
            </form>
        </Fragment>
    );
};
export default ChangePasswordForm;
