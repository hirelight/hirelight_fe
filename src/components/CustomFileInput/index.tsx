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
        const reader = new FileReader();

        if (fileList.length > 0 && inputRef.current) {
            const fileSize = fileList[0].size;

            if (fileSize / 1024 / 1024 >= 200)
                return toast.error("Maximum file size is 200MB!");
            const formData = new FormData();
            formData.append("formFile", fileList[0]);
            const res = await fileServices.uploadFile(formData);
            toast.success(res.message);
            (
                document.getElementById(
                    props.id + "_fileName"
                )!! as HTMLInputElement
            ).value = fileList[0].name;
            inputRef.current.value = res.data;
            setFile(fileList[0]);
            reader.onloadstart = () => {
                setLoading(true);
            };
            reader.onload = () => {};

            reader.onprogress = ev => {
                setProgressPer(Math.round((ev.loaded / ev.total) * 100));
            };

            reader.onloadend = () => setLoading(false);

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
        inputFile.addEventListener("change", e => {
            handleFileChange(Array.from((e.target as any)!!.files));
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
                                onClick={handleUploadFile}
                            >
                                Upload a file
                            </button>{" "}
                            <span className="text-ellipsis overflow-hidden">
                                or drag and drop here
                            </span>
                        </React.Fragment>
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
