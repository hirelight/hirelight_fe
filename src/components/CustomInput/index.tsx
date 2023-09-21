import React from "react";

interface ICustomInput extends React.HTMLProps<HTMLInputElement> {
    title: string;
    required?: boolean;
    placeholder?: string;
}

const CustomInput = (props: ICustomInput) => {
    return (
        <div className="w-full">
            {props.title && (
                <label
                    htmlFor={props.id}
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                    {props.required && (
                        <span className="text-red-500 mr-1">*</span>
                    )}
                    {props.title}
                    {!props.required && (
                        <span className="text-neutral-500 text-sm ml-1">
                            (Optional)
                        </span>
                    )}
                </label>
            )}
            <input
                {...props}
                className={[
                    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                    props.className,
                ].join(" ")}
            />
        </div>
    );
};

export default CustomInput;
