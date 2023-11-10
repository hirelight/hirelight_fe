/* eslint-disable react/button-has-type */
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface IButtonOutline
    extends DetailedHTMLProps<
        ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    loading?: boolean;
    children: React.ReactNode;
}

const ButtonOutline = (props: IButtonOutline) => {
    return (
        <button
            {...props}
            type={props.type ?? "button"}
            className={`relative inline-flex items-center justify-center overflow-hidden text-sm font-medium text-neutral-800 rounded-lg group border-2 border-blue_primary_700 hover:bg-blue_primary_800 hover:border-blue_primary_800  dark:text-white transition-all ease-in duration-75 ${props.className}`}
        >
            <span className="relative block px-5 py-2.5 dark:bg-gray-900 group-hover:text-white">
                {props.children}
            </span>
        </button>
    );
};

export default ButtonOutline;
