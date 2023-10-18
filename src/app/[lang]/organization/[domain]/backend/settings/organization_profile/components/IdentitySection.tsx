"use client";

import React, { FormEvent } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { XCircleIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

import styles from "../styles.module.scss";

const IdentitySection = () => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const imageRef = React.useRef<HTMLImageElement>(null);

    const [imageFile, setImageFile] = React.useState<File | undefined>();
    const [progressPer, setProgressPer] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    const handleFileChange = async (fileList: File[]) => {
        const reader = new FileReader();
        if (fileList.length > 0) {
            reader.onloadstart = () => {
                setLoading(true);
            };
            reader.onload = () => {};

            reader.onprogress = ev => {
                setProgressPer(Math.round((ev.loaded / ev.total) * 100));
            };

            reader.onloadend = () => setLoading(false);
            setImageFile(fileList[0]);

            reader.readAsText(fileList[0]);
        }
    };

    const handleResetFile = () => {
        if (inputRef.current) inputRef.current.value = "";
        setImageFile(undefined);
    };

    const handleDropFile = (ev: any) => {
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...ev.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    const reader = new FileReader();
                    if (file) {
                        handleFileChange([file]);
                    }
                    wrapperRef.current!!.classList.remove(styles.file__active);
                    console.log(`… file[${i}].name = ${file.name}`);
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
            });
        }
    };

    const handleSaveIdentityChages = (e: FormEvent) => {
        e.preventDefault();
    };
    return (
        <section>
            <h2 className={styles.section__title}>Organization Indentity</h2>
            <form
                onSubmit={handleSaveIdentityChages}
                className={styles.section__content__wrapper}
            >
                <div className="p-6 text-neutral-700">
                    <div className="mb-4">
                        <h4 className="text-sm font-semibold">Company Logo</h4>
                        <p className="text-sm text-neutral-500">
                            Workable displays your company’s logo in your
                            careers page, in emails to candidates as well as
                            some job boards.
                        </p>
                    </div>

                    <div className="mb-4">
                        <strong className="block mb-2 text-sm">Image</strong>
                        <div
                            className="p-8 border border-dashed border-gray-400 rounded-md flex flex-col items-center gap-4"
                            onDrop={handleDropFile}
                            ref={wrapperRef}
                            onDragEnter={e =>
                                e.currentTarget.classList.add(
                                    styles.file__active
                                )
                            }
                            onDragOver={e => {
                                e.preventDefault();
                                e.currentTarget.classList.add(
                                    styles.file__active
                                );
                            }}
                            onDragLeave={e =>
                                e.currentTarget.classList.remove(
                                    styles.file__active
                                )
                            }
                        >
                            {!imageFile ? (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (inputRef.current) {
                                            inputRef.current.click();
                                        }
                                    }}
                                    className="group"
                                >
                                    <UserCircleIcon className="w-16 h-16 group-hover:text-blue-500 transition-all duration-300" />
                                </button>
                            ) : (
                                <div className="relative">
                                    <Image
                                        ref={imageRef}
                                        alt="Logo"
                                        src={URL.createObjectURL(imageFile)}
                                        height={64}
                                        width={64}
                                        className="h-16 w-auto object-contain"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 translate-x-1/2 -translate-y-1/2"
                                        onClick={handleResetFile}
                                    >
                                        <XCircleIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            )}
                            <div>
                                <button
                                    type="button"
                                    className="inline-block text-blue_primary_800 font-medium hover:underline"
                                    onClick={() => {
                                        if (inputRef.current) {
                                            inputRef.current.click();
                                        }
                                    }}
                                >
                                    {imageFile
                                        ? "Replace image"
                                        : "Upload a file"}
                                </button>{" "}
                                <span className="text-ellipsis inline-block">
                                    or drag and drop here
                                </span>
                            </div>
                            <input
                                ref={inputRef}
                                type="file"
                                className="absolute top-0 left-0 h-0 w-0 overflow-hidden invisible"
                                onChange={e => {
                                    if (
                                        e.target.files &&
                                        e.target.files.length > 0
                                    )
                                        handleFileChange(
                                            Array.from(e.target.files)
                                        );
                                }}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <strong className="block text-sm">
                            Company Introduction
                        </strong>
                        <p className="text-sm text-neutral-500 mb-4">
                            The company introduction helps other people know
                            briefly about your company
                        </p>
                        <div className="min-h-[200px] flex">
                            <QuillEditorNoSSR
                                theme="snow"
                                onChange={() => {}}
                                className="flex-1 border border-slate-400 rounded-md overflow-hidden"
                            />
                        </div>
                    </div>

                    <div>
                        <strong className="block text-sm">
                            Company Description
                        </strong>
                        <p className="text-sm text-neutral-500 mb-4">
                            The company description helps to set you apart on
                            some job boards, including the Workable Job Board.
                            It also appears on welcome pages for features like
                            video interviews and assessments.
                        </p>
                        <div className="min-h-[200px] flex">
                            <QuillEditorNoSSR
                                theme="snow"
                                onChange={() => {}}
                                className="flex-1 border border-slate-400 rounded-md overflow-hidden"
                            />
                        </div>
                    </div>
                </div>
                <div className="p-6 border-t border-gray-300">
                    <Button type="submit">Save changes</Button>
                </div>
            </form>
        </section>
    );
};

export default IdentitySection;
