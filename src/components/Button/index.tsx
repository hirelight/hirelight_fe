/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

import { SpinLoading } from "@/icons";

import styles from "./Button.module.scss";

interface IButton
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    isLoading?: boolean;
}

const Button = (props: IButton) => {
    const { type, className, isLoading = false, children, ...rest } = props;
    return (
        <button
            {...rest}
            type={type ?? "button"}
            className={
                "w-full sm:w-auto text-white bg-blue_primary_700 hover:bg-blue_primary_800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue_primary_700 dark:focus:ring-pribg-blue_primary_800 " +
                `${className} `
            }
        >
            {isLoading && <SpinLoading className="mr-2" />}
            {children}
        </button>
    );
};

export default Button;
