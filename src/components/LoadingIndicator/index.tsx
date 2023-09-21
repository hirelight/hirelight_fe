import React from "react";

import { IIcon } from "@/icons/icon.interface";

import styles from "./styles.module.scss";

const LoadingIndicator = ({ id, className }: IIcon) => {
    return (
        <svg
            width={90}
            height={90}
            viewBox="0 0 90 90"
            className={className}
            id={id}
        >
            <rect width="30" height="30" className={styles.square1} />
            <rect
                x="30"
                y="0"
                width="30"
                height="30"
                className={styles.square2}
            />
            <rect
                x="60"
                y="0"
                width="30"
                height="30"
                className={styles.square3}
            />
            <rect
                x="0"
                y="30"
                width="30"
                height="30"
                className={styles.square4}
            />
            <rect
                x="30"
                y="30"
                width="30"
                height="30"
                className={styles.square5}
            />
            <rect
                x="60"
                y="30"
                width="30"
                height="30"
                className={styles.square6}
            />
            <rect
                x="0"
                y="60"
                width="30"
                height="30"
                className={styles.square7}
            />
            <rect
                x="30"
                y="60"
                width="30"
                height="30"
                className={styles.square8}
            />
            <rect
                x="60"
                y="60"
                width="30"
                height="30"
                className={styles.square9}
            />
        </svg>
    );
};

export default LoadingIndicator;
