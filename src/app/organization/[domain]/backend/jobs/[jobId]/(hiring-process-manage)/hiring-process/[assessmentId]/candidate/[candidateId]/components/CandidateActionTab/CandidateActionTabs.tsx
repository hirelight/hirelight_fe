"use client";

import React from "react";
import {
    EllipsisHorizontalIcon,
    EnvelopeIcon,
    HandRaisedIcon,
    ChatBubbleOvalLeftIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Tooltip } from "flowbite-react";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";

import MoveCandidateDialog from "./MoveCandidateDialog";
import styles from "./CandidateActionTabs.module.scss";

const CandidateActionTabs = () => {
    return (
        <div className="sticky -top-4">
            <div className="bg-white absolute top-6 right-3 py-2 px-4 flex items-center gap-4 rounded-md shadow-md text-neutral-600">
                <button type="button" className={styles.candidate__action__btn}>
                    <EllipsisHorizontalIcon className="w-5 h-5" />
                </button>
                <div className="w-[1px] h-8 bg-gray-300"></div>
                <Tooltip content="Send email">
                    <button
                        type="button"
                        className={styles.candidate__action__btn}
                    >
                        <EnvelopeIcon className="w-5 h-5" />
                    </button>
                </Tooltip>
                <Tooltip content="Create event">
                    <button
                        type="button"
                        className={styles.candidate__action__btn}
                    >
                        <CalendarDaysIcon className="w-5 h-5" />
                    </button>
                </Tooltip>
                <div className="w-[1px] h-8 bg-gray-300"></div>
                <Tooltip content="Send email">
                    <button
                        type="button"
                        className={styles.candidate__action__btn}
                    >
                        <ChatBubbleOvalLeftIcon className="w-5 h-5" />
                    </button>
                </Tooltip>
                <Tooltip content="Add evaluation">
                    <button
                        type="button"
                        className={styles.candidate__action__btn}
                    >
                        <PencilSquareIcon className="w-5 h-5" />
                    </button>
                </Tooltip>
                <div className="w-[1px] h-8 bg-gray-300"></div>
                <Tooltip content="Disqualified candidate">
                    <button
                        type="button"
                        className={styles.candidate__action__btn}
                    >
                        <HandRaisedIcon className="w-5 h-5 text-red-600" />
                    </button>
                </Tooltip>
                <div className="flex items-center ">
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm w-auto px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 rounded-tl-md rounded-bl-md border-r border-blue-800 transition-all duration-300"
                    >
                        Move to assessment
                    </button>
                    <MoveCandidateDialog />
                </div>
            </div>
        </div>
    );
};

export default CandidateActionTabs;
