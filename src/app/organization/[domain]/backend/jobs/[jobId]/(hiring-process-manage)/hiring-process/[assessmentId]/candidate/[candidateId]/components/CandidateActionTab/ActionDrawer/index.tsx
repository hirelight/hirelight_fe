"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

import { Portal } from "@/components";
import { delayFunc } from "@/helpers/shareHelpers";
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

const ActionDrawer = ({ onClose, show = true }: IActionDrawer) => {
    const { assessmentId } = useParams();

    const [open, setOpen] = useState(show);

    const closeDrawer = async () => {
        setOpen(false);
        await delayFunc(200);
        onClose();
    };

    useEffect(() => {
        setOpen(show);
    }, [show]);

    if (!show) return null;

    return (
        <Portal>
            <dialog open className="relative z-[9999] h-screen">
                <button
                    type="button"
                    className="fixed top-0 z-10"
                    onClick={closeDrawer}
                >
                    toggle
                </button>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={open ? "backdropOpen" : "backdropClose"}
                    className="fixed inset-0 bg-gray-500 bg-opacity-75"
                    transition={{
                        ease: open ? "easeOut" : "easeIn",
                    }}
                    variants={backdropVariants}
                    onClick={closeDrawer}
                ></motion.div>
                <motion.div
                    initial={{
                        translateX: "100%",
                    }}
                    animate={open ? "drawerEnter" : "drawerLeave"}
                    variants={drawerVariants}
                    transition={{
                        ease: open ? "easeOut" : "easeIn",
                        duration: 0.15,
                    }}
                    className="fixed top-0 right-0 z-40 w-[640px] h-screen overflow-y-auto translate-x-full bg-white dark:bg-gray-800"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6 border-b border-gray-300 flex justify-between items-center">
                        <strong className="inline-flex items-center gap-1 text-2xl font-semibold text-neutral-700 dark:text-gray-400 ">
                            <span
                                id="drawer-label"
                                className="after:content-['\2022'] after:my-0 after:ml-1"
                            >
                                Add evaluation
                            </span>
                            <span>
                                {(assessmentId as string)
                                    .charAt(0)
                                    .toLocaleUpperCase() +
                                    assessmentId.slice(1, assessmentId.length)}
                            </span>
                        </strong>
                        <button type="button" onClick={closeDrawer}>
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>
                </motion.div>
            </dialog>
        </Portal>
    );
};

export default ActionDrawer;
