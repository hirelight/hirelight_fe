"use client";

import React, { FormEvent, useState } from "react";

import { CloseIcon, Plus, Upload } from "@/icons";

const ApplicationForm = () => {
    const [fileName, setFileName] = useState("");
    const resumeRef = React.useRef<HTMLInputElement>(null);

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files);
        if (e.target.files && e.target.files?.length > 0)
            setFileName(e.target.files[0].name);
    };

    const handleSubmitApplication = (e: FormEvent) => {
        e.preventDefault();
    };

    return (
        <form
            className="w-full flex flex-col"
            onSubmit={handleSubmitApplication}
        >
            <h4 className="mb-3">Personal Information</h4>
            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="relative">
                    <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        required
                    />
                    <label
                        htmlFor="first_name"
                        className="block mb-2 text-xs font-medium text-gray-500 dark:text-white absolute top-0 left-3 -translate-y-1/2 bg-white px-1"
                    >
                        First name
                    </label>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="John"
                        required
                    />
                    <label
                        htmlFor="last_name"
                        className="block mb-2 text-xs font-medium text-gray-500 dark:text-white absolute top-0 left-3 -translate-y-1/2 bg-white px-1"
                    >
                        Last name
                    </label>
                </div>
                <div className="relative">
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="john.doe@company.com"
                        required
                    />
                    <label
                        htmlFor="email"
                        className="block mb-2 text-xs font-medium text-gray-500 dark:text-white absolute top-0 left-3 -translate-y-1/2 bg-white px-1"
                    >
                        Email
                    </label>
                </div>
                <div className="relative">
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="123-45-678"
                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                        required
                    />
                    <label
                        htmlFor="phone"
                        className="block mb-2 text-xs font-medium text-gray-500 dark:text-white absolute top-0 left-3 -translate-y-1/2 bg-white px-1"
                    >
                        Phone number
                    </label>
                </div>
            </div>

            <div className="mb-6 relative">
                <input
                    type="text"
                    id="headline"
                    name="headline"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="john.doe@company.com"
                    required
                />
                <label
                    htmlFor="headline"
                    className="block mb-2 text-xs font-medium text-gray-500 dark:text-white absolute top-0 left-3 -translate-y-1/2 bg-white px-1"
                >
                    Headline(not required)
                </label>
            </div>

            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div className="relative">
                    <input
                        type="text"
                        id="city"
                        name="city"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Ho Chi Minh"
                        required
                    />
                    <label
                        htmlFor="city"
                        className="block mb-2 text-xs font-medium text-gray-500 dark:text-white absolute top-0 left-3 -translate-y-1/2 bg-white px-1"
                    >
                        City
                    </label>
                </div>
                <div className="relative">
                    <input
                        type="text"
                        id="district"
                        name="district"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-4 py-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tan Binh"
                        required
                    />
                    <label
                        htmlFor="district"
                        className="block mb-2 text-xs font-medium text-gray-500 dark:text-white absolute top-0 left-3 -translate-y-1/2 bg-white px-1"
                    >
                        District
                    </label>
                </div>
            </div>

            <h4 className="mb-3">Profile</h4>

            <div className="mb-6 flex flex-col gap-6">
                <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">
                        Education
                        <span className="text-gray-400">(not required)</span>
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
                        <span className="text-gray-400">(not required)</span>
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
                    <span className="text-gray-600 text-sm">CV/Resume</span>
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
                <div className="relative">
                    <textarea
                        id="self_description"
                        name="self_description"
                        rows={4}
                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Write your information here..."
                    ></textarea>
                    <label
                        htmlFor="self_description"
                        className="block mb-2 text-xs font-medium text-gray-500 dark:text-white absolute top-0 left-3 -translate-y-1/2 bg-white px-1"
                    >
                        Self Description(not required)
                    </label>
                </div>
            </div>
            <h4 className="mb-3">Detail</h4>

            <div className="mb-6 relative">
                <textarea
                    id="cover_letter"
                    name="cover_letter"
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Write something you want express to the company..."
                ></textarea>
                <label
                    htmlFor="cover_letter"
                    className="block mb-2 text-xs font-medium text-gray-500 dark:text-white absolute top-0 left-3 -translate-y-1/2 bg-white px-1"
                >
                    Cover letter(not required)
                </label>
            </div>
            <button
                type="submit"
                className="self-end text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-6 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                Submit
            </button>
        </form>
    );
};

export default ApplicationForm;
