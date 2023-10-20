"use client";

import React from "react";

import { delayFunc } from "@/helpers/shareHelpers";

import { Button } from "..";

import styles from "./styles.module.scss";

interface IPopoverWarning {
    show?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    content: string;
    children: React.ReactNode;
    confirmButton?: React.ReactNode;
    cancelButton?: React.ReactNode;
}

const PopoverWarning: React.FC<IPopoverWarning> = ({
    show,
    onConfirm,
    onCancel,
    content,
    children,
    confirmButton,
    cancelButton,
}) => {
    const popoverRef = React.useRef<HTMLDivElement>(null);

    const handleConfirm = async () => {
        if (popoverRef.current)
            popoverRef.current.classList.replace(
                styles.entering,
                styles.leaving
            );

        await delayFunc(50);
        onConfirm();
    };

    const handleCancel = async () => {
        if (popoverRef.current)
            popoverRef.current.classList.replace(
                styles.entering,
                styles.leaving
            );

        await delayFunc(50);
        onCancel();
    };

    return (
        <div className="relative">
            {children}
            {show && (
                <div
                    ref={popoverRef}
                    className={`${styles.popover__wrapper} ${styles.entering}`}
                >
                    <div>
                        <p className="text-center">{content}</p>
                    </div>

                    <div className="flex items-center justify-between gap-6 text-sm mt-4">
                        {confirmButton ? (
                            <div onClick={handleConfirm}>{confirmButton}</div>
                        ) : (
                            <Button className="px-10" onClick={handleConfirm}>
                                Proceed
                            </Button>
                        )}
                        {cancelButton ? (
                            <div onClick={handleCancel}>{cancelButton}</div>
                        ) : (
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="border border-gray-600 py-2.5 px-10 rounded-md hover:bg-slate-200 text-neutral-700"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                    <div className="absolute top-0 right-2 -translate-y-full border-[9px] border-transparent border-b-white"></div>
                </div>
            )}
        </div>
    );
};

export default PopoverWarning;
