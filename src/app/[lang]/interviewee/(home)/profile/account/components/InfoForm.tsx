"use client";

import React, { FormEvent, Fragment, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { CloseIcon, Plus, Upload } from "@/icons";

import logo from "/public/images/logo.svg";

import { CustomInput, UserAvatar } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import { handleError, uploadFile } from "@/helpers";
import accountServices from "@/services/account/account.service";
import authServices from "@/services/auth/auth.service";
import { IUpdateInfoDto } from "@/services";

const InfoForm = () => {
    const [fileName, setFileName] = useState("");
    const resumeRef = React.useRef<HTMLInputElement>(null);
    const { authUser } = useAppSelector(state => state.auth);
    const [formState, setFormState] = useState<IUpdateInfoDto>({
        firstName: authUser?.firstName,
        lastName: authUser?.lastName,
        avatarUrl: authUser?.avatarUrl,
    });

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files?.length > 0)
            setFileName(e.target.files[0].name);
    };

    const handleUpdateAccount = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await authServices.updateProfile(formState);
            toast.success(res.message);
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
                                value={formState?.firstName}
                                onChange={e =>
                                    setFormState({
                                        ...formState,
                                        firstName: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="relative">
                            <CustomInput
                                id="last-name"
                                title="Last name"
                                value={formState?.lastName}
                                onChange={e =>
                                    setFormState({
                                        ...formState,
                                        lastName: e.target.value,
                                    })
                                }
                                required
                            />
                        </div>
                        <div className="relative">
                            <CustomInput
                                id="email"
                                title="Email"
                                value={authUser?.emailAddress}
                                readOnly
                                required
                            />
                        </div>
                        <div className="relative"></div>
                    </div>
                </section>

                <section className="p-6">
                    <h4 className="mb-3">Profile</h4>
                    <div className="mb-6 flex flex-col gap-6">
                        <div className="flex justify-between">
                            <span className="text-gray-600 text-sm">
                                Education
                                <span className="text-gray-400">
                                    (not required)
                                </span>
                            </span>
                            <button
                                type="button"
                                className="bg-white text-blue_primary_800 border-2 border-blue_primary_800 hover:bg-blue_primary_800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 text-center inline-flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                            </button>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600 text-sm">
                                Experience
                                <span className="text-gray-400">
                                    (not required)
                                </span>
                            </span>
                            <button
                                type="button"
                                className="bg-white text-blue_primary_800 border-2 border-blue_primary_800 hover:bg-blue_primary_800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-3 py-2 text-center inline-flex items-center"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add
                            </button>
                        </div>
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
