import React from "react";
import {
    ArrowsPointingInIcon,
    ArrowsPointingOutIcon,
} from "@heroicons/react/24/solid";
import Quill from "quill";

import { Bold, ImageIcon, Italic, LinkIcon, ListOL, ListUL } from "@/icons";

import styles from "./QuillEditor.module.scss";

interface IEditorToolbar {
    quillInstance: Quill | null;
    fullscreen: boolean;
    toggleFullscreen: () => void;
}

const EditorToolbar: React.FC<IEditorToolbar> = ({
    quillInstance,
    fullscreen,
    toggleFullscreen,
}) => {
    return (
        <ul className="h-full flex relative">
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

export default EditorToolbar;
