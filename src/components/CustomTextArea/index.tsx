import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface ICustomTextArea
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLTextAreaElement>,
        HTMLTextAreaElement
    > {
    title: string;
    required?: boolean;
    placeholder?: string;
    rows?: number;
    errorText?: string;
}

const CustomTextArea = (props: ICustomTextArea) => {
    const { required, title, id, name, rows, className, errorText, ...rest } =
        props;
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {required && <span className="text-red-500 mr-1">*</span>}
                {title}
                {!required && (
                    <span className="text-neutral-500 text-sm ml-1">
                        (Optional)
                    </span>
                )}
            </label>
            <textarea
                {...rest}
                id={id}
                name={name}
                rows={rows || 3}
                className={[
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    className,
                ].join(" ")}
            />
            {errorText && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">{errorText} </span>
                </p>
            )}
        </div>
    );
};

export default CustomTextArea;
