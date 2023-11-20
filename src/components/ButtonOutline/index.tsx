/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { SpinLoading } from "@/icons";

interface IButtonOutline
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    isLoading?: boolean;
    children: React.ReactNode;
}

const ButtonOutline = (props: IButtonOutline) => {
    const { type, className, children, isLoading = false, ...rest } = props;

    return (
        <button
            {...rest}
            type={type ?? "button"}
            className={`relative inline-flex items-center justify-center overflow-hidden text-sm font-medium text-neutral-800 rounded-lg group border-2 border-blue_primary_700 hover:bg-blue_primary_800 hover:border-blue_primary_800 px-5 py-2.5 dark:text-white dark:bg-gray-900 hover:text-white transition-all ease-in duration-75 ${className}`}
        >
            {children}
            {isLoading && <SpinLoading className="ml-2" />}
        </button>
    );
};

export default ButtonOutline;
