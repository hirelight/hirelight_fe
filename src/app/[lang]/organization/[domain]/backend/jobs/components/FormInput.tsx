import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface IFormInput
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    title: string;
    required?: boolean;
    placeholder?: string;
    errorText?: string;
}

const FormInput = (props: IFormInput) => {
    const { id, className, required, title, errorText, ...rest } = props;
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {required && <span className="text-red-500 mr-1">*</span>}
                {title}
            </label>
            <input
                {...rest}
                id={id}
                className={[
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    className,
                ].join(" ")}
            />
            {errorText && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    {errorText}
                </p>
            )}
        </div>
    );
};

export default FormInput;
