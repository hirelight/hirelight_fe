import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { IJobDto, JobContentJson } from "@/services";
import { IAppFormSection } from "@/interfaces";
import { AppFormView } from "@/components";

import AppFormDesktopView from "../AppFormDesktopView/AppFormDesktopView";

import styles from "./ApplyFormModal.module.scss";

type ApplyFormModalProps = {
    job: Omit<IJobDto, "content" | "applicationForm"> & {
        content: JobContentJson;
        applicationForm: IAppFormSection[];
    };
    close: () => void;
};

const ApplyFormModal: React.FC<ApplyFormModalProps> = ({ job, close }) => {
    return (
        <div className="fixed inset-0 z-50">
            <motion.div
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                }}
                exit={{
                    opacity: 0,
                }}
                className="absolute inset-0 bg-gray-600 bg-opacity-70"
            ></motion.div>
            <motion.div
                initial={{
                    height: "calc(100vh - 400px)",
                }}
                animate={{
                    height: "calc(100vh - 48px)",
                }}
                exit={{
                    height: "calc(100vh - 400px)",
                }}
                className={styles.modal__wrapper}
            >
                <AppFormView data={job} onApply={() => close()} />
                <button
                    type="button"
                    className="absolute -top-4 right-3 -translate-y-full"
                    onClick={close}
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </motion.div>
        </div>
    );
};

export default ApplyFormModal;
