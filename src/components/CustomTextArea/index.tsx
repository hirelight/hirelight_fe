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
}

const CustomTextArea = (props: ICustomTextArea) => {
    return (
        <div className="w-full">
            <label
                htmlFor={props.id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {props.required && <span className="text-red-500 mr-1">*</span>}
                {props.title}
                {!props.required && (
                    <span className="text-neutral-500 text-sm ml-1">
                        (Optional)
                    </span>
                )}
            </label>
            <textarea
                {...props}
                id={props.id}
                name={props.name}
                rows={props.rows || 3}
                className={[
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    props.className,
                ].join(" ")}
                onChange={props.onChange ? props.onChange : () => {}}
            />
        </div>
    );
};

export default CustomTextArea;
