"use client";

import React from "react";
import Quill, { QuillOptionsStatic } from "quill";
import { Inter, Public_Sans, Roboto_Mono } from "next/font/google";

import { useOutsideClick } from "@/hooks/useClickOutside";
import CustomSpan from "@/components/QuillEditor/CustomSpan";
import {
    IEmailTemplateTypeDto,
    IEmailTemplatesDto,
} from "@/services/email-template/email-template.interface";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { fetchEmailTemplateTypes } from "@/redux/thunks/email-templates.thunk";

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
    onEmailTemplateTypeChange: (id: number) => void;
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
            if (source == "api") {
                console.log("An API call triggered this change.");
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

    const handleSelectVars = (value: string) => {
        if (quillInstance.current) {
            const range = quillInstance.current.getSelection();
            if (range) {
                quillInstance.current.insertEmbed(
                    range.index,
                    "span",
                    value.slice(1, value.length - 1),
                    "user"
                );

                quillInstance.current.setSelection(
                    range.index + value.length,
                    0
                );

                // Create a synthetic space key event
                const spaceKeyEvent = new KeyboardEvent("keydown", {
                    key: " ",
                    code: "Space",
                    keyCode: 32,
                    which: 32,
                    bubbles: true,
                    cancelable: true,
                });

                editorRef.current!!.dispatchEvent(spaceKeyEvent);
            }
        }
    };

    React.useEffect(() => {
        if (editorRef.current) {
            if (!quillInstance.current) {
                Quill.register(CustomSpan, true);

                const options: QuillOptionsStatic = {
                    modules: {
                        toolbar: {
                            container: toolbarRef.current,
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
    }, [handleTextChange, placeholder, readOnly, value]);

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
                className={styles.toolbar__container}
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
                    emailTemplateType={emailTemplateType}
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
