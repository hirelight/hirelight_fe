import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { Button, ButtonOutline, Modal } from "@/components";
import { IModalProps } from "@/components/Modal";

import styles from "./QuestionPickerModal.module.scss";

interface QuestionPickerModalProps extends IModalProps {}

const QuestionPickerModal: React.FC<QuestionPickerModalProps> = ({
    isOpen,
    onClose,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="relative p-4 bg-white rounded-md">
                <button
                    type="button"
                    className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-8 h-8 p-1 bg-white rounded-full drop-shadow-md text-neutral-700"
                    onClick={onClose}
                >
                    <XMarkIcon />
                </button>

                <h3 className="text-xl font-semibold uppercase text-center text-blue_primary_800 mb-6">
                    Pick questions
                </h3>

                <div className="mb-4">
                    <label
                        htmlFor="default-search"
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                    >
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                            </svg>
                        </div>
                        <input
                            type="search"
                            id="default-search"
                            className="block w-full p-4 pl-10 text-sm border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search with title or tags..."
                        />
                    </div>
                </div>

                <ul className={styles.question__list__wrapper}>
                    {new Array(50).fill("").map((item, index) => (
                        <li key={index} className={styles.question__list__item}>
                            <div className="w-4 h-4 rounded-full bg-green-400"></div>
                            <label
                                htmlFor={`question-no-${index + 1}`}
                                className="cursor-pointer max-w-[60%]"
                            >
                                Question {index + 1}:{" "}
                                <span>HTML stand for?</span>
                            </label>
                            <input
                                id={`question-no-${index + 1}`}
                                type="checkbox"
                                value=""
                                className="w-4 h-4 ml-auto text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                            />
                        </li>
                    ))}
                </ul>
                <div className="">
                    <Button className="mr-2">Save</Button>
                    <ButtonOutline>Cancel</ButtonOutline>
                </div>
            </div>
        </Modal>
    );
};

export default QuestionPickerModal;
