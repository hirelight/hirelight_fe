"use client";

import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface ICustomInput
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    title: string;
    required?: boolean;
    placeholder?: string;
}

const CustomInput = (props: ICustomInput) => {
    const { id, className, required, title, ...rest } = props;
    return (
        <div className="w-full">
            {title && (
                <label
                    htmlFor={id}
                    className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
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
                id={id}
                className={`bg-white border border-gray-300 text-neutral-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                    className ? className : ""
                }`}
            />
        </div>
    );
};

export default CustomInput;
