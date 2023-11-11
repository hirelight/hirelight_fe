"use client";

import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

import { SpinLoading } from "@/icons";
import { uploadImage } from "@/helpers";

import styles from "./styles.module.scss";

interface ICustomFileInput
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    title: string;
    required?: boolean;
    placeholder?: string;
}

const CustomFileInput = (props: ICustomFileInput) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const wrapperRef = React.useRef<HTMLDivElement>(null);
    const [file, setFile] = React.useState<File>();
    const [progressPer, setProgressPer] = React.useState(0);
    const [loading, setLoading] = React.useState(true);

    function isImageFile(filename: string) {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        return allowedExtensions.test(filename);
    }

    const handleFileChange = async (fileList: File[]) => {
        const reader = new FileReader();

        if (fileList.length > 0) {
            if (isImageFile(fileList[0].name)) {
                const image = await uploadImage(fileList[0]);
                console.log(image);
            }
            reader.onloadstart = () => {
                setLoading(true);
            };
            reader.onload = () => {};

            reader.onprogress = ev => {
                setProgressPer(Math.round((ev.loaded / ev.total) * 100));
            };

            reader.onloadend = () => setLoading(false);
            setFile(fileList[0]);

            reader.readAsText(fileList[0]);
        }
    };

    const handleResetFile = () => {
        if (inputRef.current) inputRef.current.value = "";
        setFile(undefined);
    };

    const handleDropFile = (ev: any) => {
        ev.preventDefault();

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            [...ev.dataTransfer.items].forEach((item, i) => {
                // If dropped items aren't files, reject them
                if (item.kind === "file") {
                    const file = item.getAsFile();
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

    return (
        <div className="w-full relative">
            <label
                htmlFor={props.id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {props.required && <span className="text-red-500 mr-1">*</span>}
                {props.title}
                {!props.required && (
                    <span className="text-neutral-500 text-sm ml-1">
                        (Optional)
                    </span>
                )}
            </label>
            <div
                className="p-8 border border-dashed border-gray-400 rounded-md text-center"
                onDrop={handleDropFile}
                ref={wrapperRef}
                onDragEnter={e => {
                    e.currentTarget.classList.add(styles.file__active);
                }}
                onDragOver={e => {
                    e.preventDefault();
                    e.currentTarget.classList.add(styles.file__active);
                }}
                onDragLeave={e => {
                    e.currentTarget.classList.remove(styles.file__active);
                }}
            >
                <div className="w-full flex gap-1 items-center justify-center text-sm whitespace-nowrap overflow-hidden">
                    {loading && <SpinLoading className="mr-2" />}
                    {file ? (
                        <React.Fragment>
                            <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                                {file.name}{" "}
                            </span>
                            <button
                                type="button"
                                className="flex-shrink-0"
                                onClick={handleResetFile}
                            >
                                <span>x</span>
                            </button>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <button
                                type="button"
                                className="inline-block text-blue_primary_800 font-medium hover:underline"
                                onClick={() => {
                                    if (inputRef.current) {
                                        inputRef.current.click();
                                    }
                                }}
                            >
                                Upload a file
                            </button>{" "}
                            <span className="text-ellipsis">
                                or drag and drop here
                            </span>
                        </React.Fragment>
                    )}
                </div>
            </div>
            <input
                ref={inputRef}
                type="file"
                className="absolute top-0 left-0 h-0 w-0 overflow-hidden invisible"
                id={props.id}
                name={props.name}
                onChange={e => {
                    if (e.target.files && e.target.files.length > 0)
                        handleFileChange(Array.from(e.target.files));
                }}
            />
        </div>
    );
};

export default CustomFileInput;
