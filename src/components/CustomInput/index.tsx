"use client";

import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from "react";
import {
    FieldValues,
    RegisterOptions,
    UseFormRegisterReturn,
    useFormContext,
} from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

import styles from "./styles.module.scss";

interface ICustomInput
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    title: string;
    required?: boolean;
    placeholder?: string;
    errorText?: string;
    registerData?: UseFormRegisterReturn<string>;
}

const CustomInput = (props: ICustomInput) => {
    const {
        id,
        className,
        required,
        title,
        errorText,
        name,
        registerData,
        ...rest
    } = props;

    if (props.type === "password") {
        return <PasswordInput {...props} />;
    }
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
            <input
                {...rest}
                required={required}
                id={id}
                className={`${styles.input__box} ${
                    errorText ? styles.error : ""
                } ${className ? className : ""}`}
                {...registerData}
            />

            {errorText && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errorText} </span>
                </p>
            )}
        </div>
    );
};

export default CustomInput;

const PasswordInput = (props: ICustomInput) => {
    const {
        id,
        className,
        required,
        title,
        errorText,
        name,
        registerData,
        type,
        ...rest
    } = props;

    const [show, setShow] = useState(false);

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
            <div className="relative">
                <input
                    {...rest}
                    required={required}
                    id={id}
                    type={show ? "text" : "password"}
                    className={`${styles.input__box} ${
                        errorText ? styles.error : ""
                    } ${className ? className : ""}`}
                    {...registerData}
                />
                <button
                    type="button"
                    className="w-5 h-5 absolute top-1/2 right-2 -translate-y-1/2"
                    onClick={() => setShow(!show)}
                >
                    {show ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
            </div>

            {errorText && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errorText} </span>
                </p>
            )}
        </div>
    );
};
