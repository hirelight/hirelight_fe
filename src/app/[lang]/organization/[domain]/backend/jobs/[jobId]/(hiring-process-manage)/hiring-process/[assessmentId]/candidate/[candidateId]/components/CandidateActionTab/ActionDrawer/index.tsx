"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";

import { delayFunc } from "@/helpers/shareHelpers";
import { CustomInput, DatePicker, Portal } from "@/components";
import { CloseIcon } from "@/icons";

const backdropVariants = {
    backdropOpen: { opacity: 1 },
    backdropClose: { opacity: 0 },
};

const drawerVariants = {
    drawerEnter: { translateX: 0 },
    drawerLeave: { translateX: "100%" },
};

interface IActionDrawer {
    title?: string;
    description?: string;
    onCancel?: () => void;
    onConfirm?: () => void;
    show?: boolean;
    onClose: () => void;
    loading?: boolean;
}

const ActionDrawer = ({ onClose, show }: IActionDrawer) => {
    return (
        <Transition appear show={show} as={React.Fragment}>
            <Dialog as="div" onClose={onClose} className="relative z-[9999]">
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div>
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="ease-in duration-200"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Panel className="fixed top-0 right-0 z-40 w-[640px] h-screen overflow-y-auto bg-white dark:bg-gray-800">
                                <Dialog.Title
                                    as="h3"
                                    className="p-6 border-b border-gray-300 flex justify-between items-center"
                                >
                                    <strong className="inline-flex items-center gap-1 text-2xl font-semibold text-neutral-700 dark:text-gray-400 ">
                                        <span id="drawer-label">
                                            Schedule face-to-face interview
                                        </span>
                                    </strong>
                                    <button type="button" onClick={onClose}>
                                        <CloseIcon className="w-6 h-6" />
                                    </button>
                                </Dialog.Title>
                                <div className="p-6 flex-1 space-y-6">
                                    <CustomInput
                                        title="Subject"
                                        placeholder="Interview with candidate - Position"
                                        required
                                    />
                                    <DatePicker
                                        title="Date"
                                        onChange={() => {}}
                                        required
                                    />
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default ActionDrawer;
