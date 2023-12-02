import React from "react";

const DoubleRingLoading = (props: any) => {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={200}
            height={200}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
            className={props.className}
        >
            <circle
                cx="50"
                cy="50"
                r="32"
                strokeWidth="8"
                stroke="#1d3f72"
                strokeDasharray="50.26548245743669 50.26548245743669"
                fill="none"
                strokeLinecap="round"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="1s"
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                ></animateTransform>
            </circle>
            <circle
                cx="50"
                cy="50"
                r="23"
                strokeWidth="8"
                stroke="#5699d2"
                strokeDasharray="36.12831551628262 36.12831551628262"
                strokeDashoffset="36.12831551628262"
                fill="none"
                strokeLinecap="round"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="1s"
                    repeatCount="indefinite"
                    keyTimes="0;1"
                    values="0 50 50;-360 50 50"
                ></animateTransform>
            </circle>
        </svg>
    );
};

export default DoubleRingLoading;
