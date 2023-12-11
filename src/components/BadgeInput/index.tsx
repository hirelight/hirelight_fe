"use client";

import React, {
    DetailedHTMLProps,
    InputHTMLAttributes,
    useEffect,
    useState,
} from "react";
import { toast } from "react-toastify";

import styles from "./styles.module.scss";

interface ICustomInput
    extends Omit<
        DetailedHTMLProps<
            InputHTMLAttributes<HTMLInputElement>,
            HTMLInputElement
        >,
        "onChange"
    > {
    title: string;
    required?: boolean;
    placeholder?: string;
    errorText?: string;
    values: string[];
    onChange: (badges: string[]) => void;
}

const BadgeInput = (props: ICustomInput) => {
    const {
        id,
        className,
        required,
        title,
        onChange,
        values,
        errorText,
        ...rest
    } = props;
    const [text, setText] = useState("");

    const handleAddBadge = () => {
        const regex = /[`~,<>;':"\[\]\|{}()=_\[+]]/;
        if (values.includes(text)) {
            return toast.error("Key word has alread existed!");
        }

        if (regex.test(text))
            return toast.error("Key word cannot contain special characters!");
        onChange(values.concat([text]));
        setText("");
    };

    return (
        <div className="w-full">
            {title && (
                <label
                    htmlFor={id}
                    className={
                        styles.input__label +
                        ` ${errorText ? styles.error : ""}`
                    }
                >
                    {required && <span className="text-red-500 mr-1">*</span>}
                    {title}
                    {!required && (
                        <span className="text-neutral-500 text-sm ml-1">
                            (Optional)
                        </span>
                    )}
                </label>
            )}
            <label
                htmlFor={id}
                className={`${styles.input__box} ${
                    errorText ? styles.error : ""
                } ${className ? className : ""}`}
            >
                <div className="inline-flex gap-1 max-w-full flex-wrap">
                    {values?.map((item, index) => (
                        <span
                            key={index}
                            className="whitespace-nowrap bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 inline-flex items-center"
                        >
                            {item}{" "}
                            <button
                                type="button"
                                onClick={() =>
                                    onChange(
                                        values.filter(
                                            (_, iIndex) => index !== iIndex
                                        )
                                    )
                                }
                                className="ml-1"
                            >
                                x
                            </button>
                        </span>
                    ))}
                    <input
                        {...rest}
                        required={required}
                        id={id}
                        className={`inline-block outline-none border-none focus:outline-none focus:border-none focus:ring-0 p-0 m-0`}
                        value={text}
                        onChange={e => setText(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddBadge();
                            } else if (
                                e.key === "Backspace" &&
                                !text &&
                                values.length > 0
                            ) {
                                onChange(values.slice(0, -1));
                            }
                        }}
                    />
                </div>
            </label>
            {errorText && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errorText} </span>
                </p>
            )}
        </div>
    );
};

export default BadgeInput;
