"use client";

import React from "react";
import Quill, { QuillOptionsStatic } from "quill";
import { Inter, Public_Sans, Roboto_Mono } from "next/font/google";

import { useOutsideClick } from "@/hooks/useClickOutside";

import styles from "./QuillEditor.module.scss";
import EditorToolbar from "./EditorToolbar";
import CustomSpan from "./CustomSpan";

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
    value?: string;
    placeholder?: string;
    onChange?: (content: string) => void;
    theme?: "snow" | "bubble";
    className?: string;
    readOnly?: boolean;
}

const QuillEditor = ({
    theme = "snow",
    value = "",
    placeholder,
    onChange,
    className = "",
    readOnly = false,
}: IQuillEditor) => {
    const wrapperRef = useOutsideClick<HTMLDivElement>(
        theme === "bubble"
            ? () => toolbarRef.current?.removeAttribute("style")
            : () => {}
    );
    const editorRef = React.useRef<HTMLDivElement>(null);
    const quillInstance = React.useRef<Quill | null>(null);
    const toolbarRef = React.useRef<HTMLDivElement>(null);
    const resizeRef = React.useRef<HTMLDivElement>(null);

    const [fullscreen, setFullscreen] = React.useState(false);

    const [mousePos, setMousePos] = React.useState({
        x: 0,
        y: 0,
    });

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

    const customImageHandler = React.useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.style.display = "none";

        input.addEventListener("change", () => {
            if (input.files) {
                const file = input.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                        const img = new Image();
                        img.src = reader.result as string;
                        img.addEventListener("load", () => {
                            // Resize the image based on user input
                            img.style.width = "auto";
                            img.style.height = "120px"; // Maintain aspect ratio
                            const imageUrl = img.src;
                            insertImage(imageUrl);
                        });
                    };
                    reader.readAsDataURL(file);
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

    React.useEffect(() => {
        if (editorRef.current) {
            if (!quillInstance.current) {
                CustomSpan.blotName = "label";
                CustomSpan.tagName = "SPAN";
                CustomSpan.className = "ql-custom-span";

                Quill.register(CustomSpan);

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

    React.useEffect(() => {
        if (quillInstance.current) {
            const imgEls = editorRef.current?.querySelectorAll("img");
            imgEls?.forEach((imgEl: HTMLImageElement) => {
                const {
                    x: editorX,
                    y: editorY,
                    width: edtWidht,
                    height: edtHeight,
                } = editorRef.current!!.getBoundingClientRect();
                const {
                    x: imgX,
                    y: imgY,
                    width: imgWidth,
                    height: imgHeight,
                } = imgEl.getBoundingClientRect();
                const imgLeft = imgX - editorX - 15;
                const imgRight = imgX + imgWidth - editorX - 15;
                const imgTop = imgY - editorY - 12;
                const imgBottom = imgY + imgHeight - editorY - 12;
                console.log(imgLeft, imgRight, imgTop, imgBottom);
                if (
                    mousePos.x >= imgLeft &&
                    mousePos.x <= imgRight &&
                    mousePos.y >= imgTop &&
                    mousePos.y <= imgBottom
                ) {
                    console.log("Mouse inside img");
                    resizeRef.current?.setAttribute(
                        "style",
                        `left: ${imgLeft}px;top: ${
                            imgTop + 12
                        }px; width: ${imgWidth}px;height: ${imgHeight}px; visibility: visible; z-index: 50; background: rgba(0,0,0,.6)`
                    );
                } else {
                    resizeRef.current?.removeAttribute("style");
                }
            });
        }
    }, [mousePos]);

    return (
        <>
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
                    <EditorToolbar
                        quillInstance={quillInstance.current}
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
                        ].join(" ")}
                    ></div>
                </div>
            </div>
        </>
    );
};

export default QuillEditor;
