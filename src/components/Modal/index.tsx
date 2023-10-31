"use client";

import React from "react";

import { delayFunc } from "@/helpers/shareHelpers";
import { useOutsideClick } from "@/hooks/useClickOutside";

import styles from "./Modal.module.scss";

export interface IModalProps {
    children?: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    position?: "top" | "center" | "bottom";
    className?: string;
}

const Modal = ({
    isOpen = false,
    onClose,
    children,
    position = "center",
    className,
}: IModalProps) => {
    const modalRef = useOutsideClick<HTMLDivElement>(() => {
        closeModal();
    });
    const backdropRef = React.useRef<HTMLDivElement>(null);

    const closeModal = async () => {
        if (backdropRef.current)
            backdropRef.current.classList.replace(
                styles.entering,
                styles.leaving
            );

        if (modalRef.current)
            modalRef.current.classList.toggle(styles.entering);
        await delayFunc(200);
        onClose();
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            {/* <!--
      Background backdrop, show/hide based on modal state.
  
      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    --> */}
            <div
                ref={backdropRef}
                className={`${styles.backdrop} ${styles.entering}`}
            ></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div
                    className={`flex min-h-full justify-center md:p-4 text-center sm:p-0 ${
                        position === "center"
                            ? "items-center"
                            : position === "bottom"
                            ? "items-end"
                            : ""
                    }`}
                >
                    {/* <!--
          Modal panel, show/hide based on modal state.
  
          Entering: "ease-out duration-300"
            From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            To: "opacity-100 translate-y-0 sm:scale-100"
          Leaving: "ease-in duration-200"
            From: "opacity-100 translate-y-0 sm:scale-100"
            To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        --> */}
                    <div
                        ref={modalRef}
                        className={`${styles.modal__panel} ${styles.entering} ${
                            className ? className : ""
                        }`}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
