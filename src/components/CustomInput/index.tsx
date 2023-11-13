"use client";

import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

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
}

const CustomInput = (props: ICustomInput) => {
    const { id, className, required, title, onChange, errorText, ...rest } =
        props;
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
                onChange={onChange ? onChange : () => {}}
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
