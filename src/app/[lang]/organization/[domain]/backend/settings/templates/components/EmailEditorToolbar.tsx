"use client";

import React from "react";
import {
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
    SquaresPlusIcon,
} from "@heroicons/react/24/solid";
import Quill from "quill";

import { Bold, ImageIcon, Italic, LinkIcon, ListOL, ListUL } from "@/icons";

import styles from "./EmailEditor.module.scss";

interface IEmailEditorToolbar {
    fullscreen: boolean;
    toggleFullscreen: () => void;
    handleVarChange: (value: string) => void;
}

const EmailEditorToolbar: React.FC<IEmailEditorToolbar> = ({
    fullscreen,
    toggleFullscreen,
    handleVarChange,
}) => {
    const selectionRef = React.useRef<HTMLUListElement>(null);

    const handleShowSelection = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        const isExpand =
            selectionRef.current!!.classList.contains(styles.showTop) ||
            selectionRef.current!!.classList.contains(styles.show);
        if (
            e.currentTarget.getBoundingClientRect().bottom + 252 >
                window.innerHeight &&
            !isExpand
        ) {
            selectionRef.current!!.classList.add(styles.showTop);
        } else if (
            e.currentTarget.getBoundingClientRect().bottom + 252 <
                window.innerHeight &&
            !isExpand
        ) {
            selectionRef.current!!.classList.add(styles.show);
        } else {
            selectionRef.current!!.classList.remove(styles.showTop);
            selectionRef.current!!.classList.remove(styles.show);
        }
    };

    const handleSelectVars = (value: string) => {
        handleVarChange(value);
        selectionRef.current!!.classList.remove(styles.showTop);
        selectionRef.current!!.classList.remove(styles.show);
    };

    return (
        <ul className="h-full flex relative">
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats}`}
                    onClick={handleShowSelection}
                >
                    <span className="h-4 w-4">
                        <SquaresPlusIcon />
                    </span>
                </button>
                <ul
                    ref={selectionRef}
                    className={`${styles.vars__selection__wrapper} ql-custom-inline`}
                >
                    {[
                        "[candidate]",
                        "[candidate_first_name]",
                        "[company]",
                        "[user]",
                    ].map((item, index) => (
                        <li key={index}>
                            <button
                                type="button"
                                onClick={handleSelectVars.bind(null, item)}
                            >
                                {item}
                            </button>
                        </li>
                    ))}
                </ul>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-bold`}
                >
                    <span className="h-4 w-4">
                        <Bold />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-italic`}
                >
                    <span className="h-4 w-4">
                        <Italic />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-list`}
                    // value={'ordered'}
                >
                    <span className="h-4 w-4">
                        <ListOL />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-list`}
                    // value={'bullet'}
                >
                    <span className="h-4 w-4">
                        <ListUL />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-link `}
                >
                    <span className="h-4 w-4">
                        <LinkIcon />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} ql-image`}
                >
                    <span className="h-4 w-4">
                        <ImageIcon />
                    </span>
                </button>
            </li>
            <li className={styles.toolbar__item}>
                <button
                    type="button"
                    className={`${styles.ql__formats} p-2`}
                    onClick={toggleFullscreen}
                >
                    {fullscreen ? (
                        <ArrowsPointingInIcon />
                    ) : (
                        <ArrowsPointingOutIcon />
                    )}
                </button>
            </li>
        </ul>
    );
};

export default EmailEditorToolbar;
