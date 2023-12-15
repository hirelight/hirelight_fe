"use client";

import React, { FormEvent, Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { CloseIcon, Plus, Upload } from "@/icons";
import {
    CustomInput,
    EducationSection,
    ExperienceSection,
    UserAvatar,
} from "@/components";
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

    const [fileName, setFileName] = useState("");
    const resumeRef = React.useRef<HTMLInputElement>(null);
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

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0)
            setFileName(e.target.files[0].name);
    };

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
            const formData = { ...formState };

            const educationEl = document.getElementById(
                "education"
            ) as HTMLTextAreaElement;
            const experienceEl = document.getElementById(
                "experience"
            ) as HTMLTextAreaElement;
            if (educationEl && educationEl.value) {
                formData.educations = JSON.parse(educationEl.value);
            }
            if (experienceEl && experienceEl.value) {
                formData.educations = JSON.parse(experienceEl.value);
            }
            const res = await authServices.updateProfile(formData);

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
                className="w-32 h-32 rounded-full border border-gray-300"
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
                className="w-full flex flex-col"
                onSubmit={handleUpdateAccount}
            >
                <section className="p-6">
                    <h4 className="mb-3">Personal Information</h4>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div className="relative">
                            <CustomInput
                                id="first-name"
                                title="First name"
                                defaultValue={formState?.firstName}
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
                                defaultValue={formState?.lastName}
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
                                required
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

                <section className="p-6">
                    <h4 className="mb-3">Profile</h4>
                    <div className="mb-6 flex flex-col gap-6">
                        <EducationSection
                            data={{
                                id: "education",
                                custom: true,
                                label: "education",
                                type: "group",
                            }}
                            datas={
                                formState.educations
                                    ? JSON.parse(formState.educations)
                                    : []
                            }
                        />
                        <ExperienceSection
                            data={{
                                id: "experience",
                                custom: true,
                                label: "experience",
                                type: "group",
                            }}
                            datas={
                                formState.educations
                                    ? JSON.parse(formState.educations)
                                    : []
                            }
                        />
                        <div className="flex justify-between">
                            <span className="text-gray-600 text-sm">
                                CV/Resume
                            </span>
                            <input
                                ref={resumeRef}
                                type="file"
                                id="resume"
                                name="resume"
                                className="invisible absolute"
                                onChange={handleUploadFile}
                            />
                            {fileName ? (
                                <div className="flex gap-1 items-center justify-end py-2.5 text-sm text-gray-700 max-w-[50%]">
                                    <span className="max-w-[70%] text-ellipsis whitespace-nowrap overflow-hidden">
                                        {fileName}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setFileName("")}
                                    >
                                        <CloseIcon className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="bg-white text-blue_primary_800 border-2 border-blue_primary_800 hover:bg-blue_primary_800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 text-center inline-flex items-center"
                                    onClick={() => resumeRef.current?.click()}
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload
                                </button>
                            )}
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
