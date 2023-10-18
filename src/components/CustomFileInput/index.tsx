"use client";

import React from "react";

import styles from "./styles.module.scss";

interface ICustomFileInput extends React.HTMLProps<HTMLInputElement> {
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
                    {loading && (
                        <div role="status" className="flex-shrink-0">
                            <svg
                                aria-hidden="true"
                                className="w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
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
            <div>Progress {progressPer}</div>
            <input
                ref={inputRef}
                type="file"
                className="absolute top-0 left-0 h-0 w-0 overflow-hidden invisible"
                onChange={e => {
                    if (e.target.files && e.target.files.length > 0)
                        handleFileChange(Array.from(e.target.files));
                }}
            />
        </div>
    );
};

export default CustomFileInput;
