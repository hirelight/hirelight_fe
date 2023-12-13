"use client";

import React from "react";
import Quill, { QuillOptionsStatic } from "quill";
import { Inter, Public_Sans, Roboto_Mono } from "next/font/google";
import { toast } from "react-toastify";

import { useOutsideClick } from "@/hooks/useClickOutside";
import CustomSpan from "@/components/QuillEditor/CustomSpan";
import {
    IEmailTemplateTypeDto,
    IEmailTemplatesDto,
} from "@/services/email-template/email-template.interface";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { fetchEmailTemplateTypes } from "@/redux/thunks/email-templates.thunk";
import { checkResErr, resizeImage, uploadFile } from "@/helpers";
import interceptor from "@/services/interceptor";
import { IResponse } from "@/interfaces/service.interface";
import { sanitizeHtml } from "@/helpers/sanitizeHTML";

import styles from "./EmailEditor.module.scss";
import EmailEditorToolbar from "./EmailEditorToolbar";

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

interface IEmailEditor {
    value?: string;
    data?: IEmailTemplatesDto;
    placeholder?: string;
    onChange: (content: string) => void;
    theme?: "snow" | "bubble";
    className?: string;
    readOnly?: boolean;
    emailTemplateType?: IEmailTemplateTypeDto;
    onEmailTemplateTypeChange: (id: string) => void;
    config?: {
        toolbar?: {
            visibile: boolean;
        };
    };
}

const EmailEditor: React.FC<IEmailEditor> = ({
    theme = "snow",
    value = "",
    placeholder,
    onChange,
    className = "",
    readOnly = false,
    emailTemplateType,
    onEmailTemplateTypeChange,
    data,
    config = {
        toolbar: {
            visibile: true,
        },
    },
}) => {
    const wrapperRef = useOutsideClick<HTMLDivElement>(
        theme === "bubble"
            ? () => toolbarRef.current?.removeAttribute("style")
            : () => {}
    );
    const editorRef = React.useRef<HTMLDivElement>(null);
    const quillInstance = React.useRef<Quill | null>(null);
    const toolbarRef = React.useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();
    const { emailTemplateTypes } = useAppSelector(
        state => state.templates.emailTemplates
    );

    const [fullscreen, setFullscreen] = React.useState(false);

    const handleTextChange = React.useCallback(
        function (delta: any, oldDelta: any, source: any) {
            // console.log("Change");
            if (source == "api") {
                // console.log("An API call triggered this change.");
            } else if (source == "user") {
                if (onChange) {
                    const editorContent =
                        quillInstance.current!!.root.innerHTML;
                    onChange(editorContent);
                }
            }
        },
        [onChange]
    );

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
                    const imageUrl = await uploadFile(resizedImage);
                    if (imageUrl === null) return;

                    const img = new Image();
                    img.src = imageUrl;
                    img.addEventListener("load", () => {
                        // Resize the image based on user input
                        img.style.width = "auto";
                        img.style.height = "120px"; // Maintain aspect ratio
                        const imageUrl = img.src;
                        insertImage(imageUrl);
                    });
                }
            }
        });

        input.click();
    }, []);

    const insertImage = (imageUrl: any) => {
        const range = quillInstance.current!!.getSelection();
        if (range) {
            quillInstance.current!!.insertEmbed(
                range.index + 1,
                "image",
                imageUrl
            );
        }
    };

    const handleSelectVars = (value: string) => {
        try {
            if (quillInstance.current) {
                const range = quillInstance.current.getSelection();
                if (range) {
                    quillInstance.current.insertEmbed(
                        range.index,
                        "complex",
                        value.slice(1, value.length - 1)
                    );

                    quillInstance.current.setSelection(range.index + 1, 0);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (editorRef.current) {
            if (!quillInstance.current) {
                CustomSpan.blotName = "complex";
                CustomSpan.tagName = "span";
                Quill.register(CustomSpan, true);
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

                quill.clipboard.dangerouslyPasteHTML(sanitizeHtml(value));
            }

            quillInstance.current.on("text-change", handleTextChange);
        }

        return () => {
            if (quillInstance.current)
                quillInstance.current.off("text-change", () => {});
        };
    }, [customImageHandler, handleTextChange, placeholder, readOnly, value]);

    React.useEffect(() => {
        if (emailTemplateTypes.length === 0)
            dispatch(fetchEmailTemplateTypes());
    }, [dispatch, emailTemplateTypes.length]);

    return (
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
                <EmailEditorToolbar
                    data={data}
                    fullscreen={fullscreen}
                    toggleFullscreen={() => setFullscreen(prev => !prev)}
                    handleVarChange={handleSelectVars}
                    onEmailTemplateTypeChange={onEmailTemplateTypeChange}
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
                <div id="complextype" style={{ display: "none" }}>
                    <span contentEditable={false}>
                        <span className="complex" spellCheck="false">
                            <span className="inner">Format applied</span>
                            <span className="nested">More text</span>
                            <span className="formatting">with formatting</span>
                            <span className="nested">dolor</span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default EmailEditor;
