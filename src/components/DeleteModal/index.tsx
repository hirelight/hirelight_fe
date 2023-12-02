"use client";

import React from "react";

import { delayFunc } from "@/helpers/shareHelpers";
import { SpinLoading } from "@/icons";

import styles from "./styles.module.scss";

interface IDeleteModal {
    title?: string;
    description?: string;
    onCancel?: () => void;
    onConfirm?: () => Promise<any> | any;
    show?: boolean;
    onClose: () => void;
    loading?: boolean;
}

const DeleteModal = ({
    onCancel,
    onConfirm,
    onClose,
    title,
    description,
    show = false,
    loading,
}: IDeleteModal) => {
    const backdropRef = React.useRef<HTMLDivElement>(null);
    const panelRef = React.useRef<HTMLDivElement>(null);

    const closeModal = async () => {
        if (backdropRef.current)
            backdropRef.current.classList.replace(
                styles.entering,
                styles.leaving
            );

        if (panelRef.current)
            panelRef.current.classList.toggle(styles.entering);
        await delayFunc(200);
        onClose();
    };

    const handleCancel = async () => {
        await closeModal();
        if (onCancel) onCancel();
    };

    const handleConfirm = async () => {
        if (onConfirm) await onConfirm();
        closeModal();
    };

    if (!show) {
        return null;
    }

    return (
        <div
            className="relative z-[2000]"
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

            <div
                className="fixed inset-0 z-10 w-screen overflow-y-auto"
                onClick={closeModal}
            >
                <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
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
                        ref={panelRef}
                        className={`${styles.modal__panel} ${styles.entering}`}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <svg
                                        className="h-6 w-6 text-red-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                                        />
                                    </svg>
                                </div>
                                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                    <h3
                                        className="text-base font-semibold leading-6 text-gray-900"
                                        id="modal-title"
                                    >
                                        {title ? title : "Deactivate account"}
                                    </h3>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            {description
                                                ? description
                                                : `Are you sure you want to deactivate
                                            your account? All of your data will
                                            be permanently removed. This action
                                            cannot be undone.`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                className="inline-flex w-full items-center justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto disabled:cursor-not-allowed disabled:opacity-80"
                                onClick={handleConfirm}
                                disabled={loading}
                            >
                                Proceed
                                {loading && <SpinLoading className="ml-2" />}
                            </button>
                            <button
                                type="button"
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
