import React from "react";
import { motion } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { ApplicationFormJSON, IJobDto, JobContentJson } from "@/services";
import { AppFormView } from "@/components";

import styles from "./ApplyFormModal.module.scss";

type ApplyFormModalProps = {
    job: Omit<IJobDto, "content" | "applicationForm"> & {
        content: JobContentJson;
        applicationForm: ApplicationFormJSON;
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
                    className="absolute -top-3 right-3 -translate-y-full"
                    onClick={close}
                >
                    <XMarkIcon className="w-8 h-8 text-white" />
                </button>
            </motion.div>
        </div>
    );
};

export default ApplyFormModal;
