"use client";

import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { CustomInput, UserAvatar } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import { handleError, isInvalidForm, uploadFile } from "@/helpers";
import authServices from "@/services/auth/auth.service";
import { IUpdateInfoDto } from "@/services";
import { passwordRegex } from "@/utils/shared/initialDatas";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

const InfoForm = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale);

    const { authUser } = useAppSelector(state => state.auth);
    const [formState, setFormState] = useState<IUpdateInfoDto>({});
    const [formError, setFormError] = useState<IUpdateInfoDto>({
        password: "",
        firstName: "",
        lastName: "",
        oldPassword: "",
    });

    const queryClient = useQueryClient();
    const { data: indentityRes } = useQuery({
        queryKey: ["identity"],
        queryFn: authServices.getUserInfo,
    });

    const handleFieldChange = (key: string, value: any) => {
        setFormState(prev => ({
            ...prev,
            [key]: value,
        }));

        setFormError(prev => ({
            ...prev,
            [key]: "",
        }));
    };

    const validInputs = () => {
        const errors = { ...formError };
        const { password, oldPassword } = formState;

        if (password && !passwordRegex.test(password))
            errors.password = `Password must have at least 8 characters!
            Password must have at least one uppercase, one lowercase and one number!`;

        if (oldPassword && !passwordRegex.test(oldPassword))
            errors.oldPassword = `Password must have at least 8 characters!
            Password must have at least one uppercase, one lowercase and one number!`;

        if (isInvalidForm(errors)) {
            setFormError(errors);
            return false;
        }

        return true;
    };

    const handleUpdateAccount = async (e: FormEvent) => {
        e.preventDefault();
        if (!validInputs())
            return toast.error(
                <div>
                    <p>{t("common:error.invalid_input")}</p>
                    <p>{t("common:error.check_red_places")}</p>
                </div>
            );
        try {
            const res = await authServices.updateProfile(formState);

            await queryClient.invalidateQueries({ queryKey: ["indentity"] });
            toast.success(res.message);
            setFormState({
                ...formState,
                oldPassword: "",
                password: "",
            });
        } catch (error) {
            handleError(error);
        }
    };

    const handleUploadAvatar = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (!e.target.files || (e.target.files && e.target.files.length <= 0)) {
            return;
        }
        try {
            const res = await uploadFile(e.target.files[0]);
            setFormState({
                ...formState,
                avatarUrl: res,
            });
        } catch (error) {
            handleError(error);
        }
        e.target.files = null;
        e.target.value = "";
    };

    useEffect(() => {
        if (indentityRes) {
            setFormState({
                firstName: indentityRes.data.firstName,
                lastName: indentityRes.data.lastName,
                avatarUrl: indentityRes.data.avatarUrl,
            });
        }
    }, [indentityRes]);

    return (
        <Fragment>
            <label
                htmlFor="avatar-upload"
                className="w-32 h-32 rounded-full border border-gray-300 my-6"
            >
                <UserAvatar avatarUrl={formState.avatarUrl} />
                <input
                    type="file"
                    id="avatar-upload"
                    className="sr-only"
                    onChange={handleUploadAvatar}
                />
            </label>
            <form
                className="w-full max-w-3xl flex flex-col"
                onSubmit={handleUpdateAccount}
            >
                <section className="p-6">
                    <h4 className="mb-3">Personal Information</h4>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div className="relative">
                            <CustomInput
                                id="first-name"
                                title="First name"
                                defaultValue={authUser?.firstName}
                                onChange={e =>
                                    handleFieldChange(
                                        "firstName",
                                        e.target.value
                                    )
                                }
                                errorText={formError.firstName}
                                required
                            />
                        </div>
                        <div className="relative">
                            <CustomInput
                                id="last-name"
                                title="Last name"
                                defaultValue={authUser?.lastName}
                                onChange={e =>
                                    handleFieldChange(
                                        "lastName",
                                        e.target.value
                                    )
                                }
                                errorText={formError.lastName}
                                required
                            />
                        </div>
                        <div className="relative col-span-2">
                            <CustomInput
                                id="email"
                                title="Email"
                                value={authUser?.emailAddress}
                                readOnly
                                required
                            />
                        </div>
                        <div className="relative col-span-2">
                            <CustomInput
                                id="old-password"
                                title="Old password"
                                type="password"
                                onChange={e => {
                                    handleFieldChange(
                                        "oldPassword",
                                        e.target.value
                                    );
                                }}
                                errorText={formError.oldPassword}
                            />
                        </div>
                        <div className="relative col-span-2">
                            <CustomInput
                                id="new-password"
                                title="New password"
                                type="password"
                                onChange={e => {
                                    handleFieldChange(
                                        "password",
                                        e.target.value
                                    );
                                }}
                                errorText={formError.password}
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
export default InfoForm;
