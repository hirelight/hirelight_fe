"use client";

import React from "react";
import Quill, { QuillOptionsStatic } from "quill";
import { Inter, Public_Sans, Roboto_Mono } from "next/font/google";
import { toast } from "react-toastify";

import { useOutsideClick } from "@/hooks/useClickOutside";
import interceptor from "@/services/interceptor";
import { IResponse } from "@/interfaces/service.interface";
import { checkResErr, resizeImage } from "@/helpers";

import styles from "./QuillEditor.module.scss";
import EditorToolbar from "./EditorToolbar";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

const roboto_mono = Roboto_Mono({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-roboto-mono",
});
const publicSans = Public_Sans({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-public-sans",
});

interface IQuillEditor {
    id?: string;
    value?: string;
    placeholder?: string;
    onChange?: (innerHtml: string, text: string) => void;
    theme?: "snow" | "bubble";
    className?: string;
    readOnly?: boolean;
    required?: boolean;
    config?: {
        toolbar?: {
            visibile: boolean;
        };
    };
    label?: string;
}

const QuillEditor = ({
    id,
    theme = "snow",
    value = "",
    placeholder,
    onChange,
    className = "",
    readOnly = false,
    required = false,
    label,
    config = {
        toolbar: {
            visibile: true,
        },
    },
}: IQuillEditor) => {
    const wrapperRef = useOutsideClick<HTMLDivElement>(
        theme === "bubble"
            ? () => toolbarRef.current?.removeAttribute("style")
            : () => {}
    );
    const editorRef = React.useRef<HTMLDivElement>(null);
    const quillInstance = React.useRef<Quill | null>(null);
    const toolbarRef = React.useRef<HTMLDivElement>(null);

    const [fullscreen, setFullscreen] = React.useState(false);

    const handleTextChange = React.useCallback(
        function (delta: any, oldDelta: any, source: any) {
            if (source == "api") {
                if (quillInstance.current) {
                    if (onChange) {
                        const editorContent =
                            quillInstance.current.root.innerHTML;
                        const textContent =
                            quillInstance.current.root.textContent ?? "";
                        onChange(editorContent, textContent);
                    }
                }
            } else if (source == "user") {
                if (quillInstance.current) {
                    if (onChange) {
                        const editorContent =
                            quillInstance.current.root.innerHTML;
                        const textContent =
                            quillInstance.current.root.textContent ?? "";

                        onChange(editorContent, textContent);
                    }
                }
            }
        },
        [id, onChange]
    );

    const uploadImage = async (file: File): Promise<string | null> => {
        const formData = new FormData();
        formData.append("formFile", file);

        const res = await interceptor.post<IResponse<any>>(
            "/assessment-flows/images",
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );
        console.log(res.data);
        toast.success(res.data.message);
        checkResErr(res.data);

        return res.data.data;
    };

    const customImageHandler = React.useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.style.display = "none";

        input.addEventListener("change", async () => {
            if (input.files) {
                const file = input.files[0];
                if (file) {
                    const resizedImage = await resizeImage(file);
                    const imageUrl = await uploadImage(resizedImage);
                    if (imageUrl === null) return;

                    insertImage(imageUrl);
                    // const reader = new FileReader();

                    // reader.onload = event => {
                    //     const img = new Image();
                    //     img.src = reader.result as string;
                    //     img.addEventListener("load", () => {
                    //         // Resize the image based on user input
                    //         img.style.width = "auto";
                    //         img.style.height = "120px"; // Maintain aspect ratio
                    //         const imageUrl = img.src;
                    //         insertImage(imageUrl);
                    //     });
                    // };
                    // reader.readAsDataURL(file);
                }
            }
        });

        input.click();
    }, []);

    const insertImage = (imageUrl: any) => {
        const range = quillInstance.current!!.getSelection();
        if (range && quillInstance.current) {
            quillInstance.current!!.insertEmbed(
                range.index,
                "image",
                imageUrl,
                "user"
            );
            quillInstance.current.setSelection(range.index + 1, 0);
        }
    };

    React.useEffect(() => {
        if (editorRef.current) {
            if (!quillInstance.current) {
                const options: QuillOptionsStatic = {
                    modules: {
                        toolbar: {
                            container: toolbarRef.current,
                            handlers: {
                                image: customImageHandler,
                            },
                        },
                    },
                    placeholder: placeholder,
                    readOnly,
                };
                const quill = new Quill(editorRef.current, options);
                quill.root.setAttribute("spellcheck", "false");
                quillInstance.current = quill;

                quill.root.innerHTML = value;
            }

            quillInstance.current.on("text-change", handleTextChange);
        }

        return () => {
            if (quillInstance.current)
                quillInstance.current.off("text-change", () => {});
        };
    }, [customImageHandler, handleTextChange, placeholder, readOnly, value]);

    return (
        <>
            {label && (
                <h4 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {required && <span className="text-red-500 mr-1">*</span>}
                    {label}
                </h4>
            )}
            <div
                ref={wrapperRef}
                className={`${styles.quill__wrapper} ${
                    styles[theme]
                } ${className} ${fullscreen ? styles.full__screen : ""}`}
                onFocusCapture={() =>
                    toolbarRef.current!!.setAttribute(
                        "style",
                        "height: 42px; visibility: visible"
                    )
                }
                onClick={e => {
                    quillInstance.current?.focus();
                }}
            >
                <div
                    ref={toolbarRef}
                    className={`${styles.toolbar__container} ${
                        config.toolbar?.visibile
                            ? ""
                            : "!invisible !h-0 !overflow-hidden"
                    }`}
                    style={{
                        display: !readOnly ? "block" : "none",
                    }}
                >
                    <EditorToolbar
                        fullscreen={fullscreen}
                        toggleFullscreen={() => setFullscreen(prev => !prev)}
                    />
                </div>
                <div className="relative flex-1 flex flex-col">
                    <div
                        ref={editorRef}
                        className={[
                            styles.editor__container,
                            inter.className,
                            roboto_mono.className,
                            publicSans.className,
                            theme === "snow" ? styles.snow : "",
                            readOnly ? "!border-0" : "",
                            config.toolbar?.visibile
                                ? "border-t-0"
                                : "!rounded-md !overflow-hidden",
                        ].join(" ")}
                    ></div>
                </div>
                <input id={id} className="sr-only" readOnly />
            </div>
        </>
    );
};

export default QuillEditor;
