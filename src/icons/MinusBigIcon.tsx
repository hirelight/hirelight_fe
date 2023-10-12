import React from "react";

import { IIcon } from "./icon.interface";

const MinusBigIcon = ({ className, id, strokeWidth }: IIcon) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            strokeWidth={strokeWidth ?? 1.5}
            stroke="currentColor"
            className={className}
            id={id}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15"
            />
        </svg>
    );
};

export default MinusBigIcon;
