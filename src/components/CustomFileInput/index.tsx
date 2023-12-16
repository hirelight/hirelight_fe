"use client";

import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { toast } from "react-toastify";

import { SpinLoading } from "@/icons";
import fileServices from "@/services/file-service/file.service";

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
    const [loading, setLoading] = React.useState(false);

    function isImageFile(filename: string) {
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        return allowedExtensions.test(filename);
    }

    const handleFileChange = async (fileList: File[]) => {
        try {
            if (fileList.length > 0 && inputRef.current) {
                const fileSize = fileList[0].size;

                if (fileSize / 1024 / 1024 >= 200)
                    return toast.error("Maximum file size is 200MB!");

                const formData = new FormData();
                formData.append("formFile", fileList[0]);
                const res = await fileServices.uploadFile(formData, event => {
                    setProgressPer(
                        Math.round(100 * event.loaded) / (event.total ?? 1)
                    );
                });

                (
                    document.getElementById(
                        props.id + "_fileName"
                    )!! as HTMLInputElement
                ).value = fileList[0].name;
                inputRef.current.value = res.data;
                setFile(fileList[0]);
            }
        } catch (error: any) {
            toast.error(error.message ? error.message : "Upload file failure!");
        }
    };

    const handleResetFile = () => {
        if (inputRef.current) inputRef.current.value = "";
        setFile(undefined);
        setProgressPer(0);
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
                    if (wrapperRef.current)
                        wrapperRef.current.classList.remove(
                            styles.file__active
                        );
                }
            });
        } else {
            // Use DataTransfer interface to access the file(s)
            [...ev.dataTransfer.files].forEach((file, i) => {});
        }
    };

    const handleUploadFile = () => {
        const inputFile = document.createElement("input");
        inputFile.type = "file";
        inputFile.accept =
            props.id === "resume"
                ? [
                      "application/pdf",
                      "application/msword",
                      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                      "application/vnd.oasis.opendocument.text",
                      "application/rtf",
                      ".pdf",
                      ".doc",
                      ".docx",
                      ".odt",
                      ".rtf",
                  ].join(",")
                : props.id === "avatar"
                ? [
                      "image/jpeg",
                      "image/gif",
                      "image/png",
                      ".jpg",
                      ".jpeg",
                      ".gif",
                      ".png",
                  ].join(",")
                : "";
        document.body.appendChild(inputFile);
        inputFile.addEventListener("change", (e: any) => {
            if (e.target.files) handleFileChange(Array.from(e.target.files));
        });

        inputFile.click();
        inputFile.remove();
    };

    return (
        <div className="w-full relative">
            <label
                htmlFor={props.id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {props.required && <span className="text-red-500 mr-1">*</span>}
                {props.title}
                {!props.required && props.required !== undefined && (
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
                        <div className="flex flex-col gap-1">
                            <p>
                                <button
                                    type="button"
                                    className="inline-block text-blue_primary_800 font-medium hover:underline"
                                    onClick={handleUploadFile}
                                >
                                    Upload a file
                                </button>{" "}
                                <span className="text-ellipsis overflow-hidden">
                                    or drag and drop here
                                </span>
                            </p>
                            {progressPer > 0 && (
                                <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                    <div
                                        className="bg-blue-600 h-1.5 rounded-full"
                                        style={{
                                            width: `${progressPer}%`,
                                        }}
                                    ></div>
                                </div>
                            )}
                        </div>
                    )}
                    <input
                        required={props.required}
                        ref={inputRef}
                        type="text"
                        className="sr-only"
                        id={props.id}
                        name={props.name}
                    />
                    <input
                        type="text"
                        className="sr-only"
                        id={props.id + "_fileName"}
                        name={props.name}
                    />
                </div>
            </div>
        </div>
    );
};

export default CustomFileInput;
