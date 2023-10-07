"use client";

import {
    ArchiveBoxIcon,
    ArrowPathIcon,
    ChatBubbleLeftRightIcon,
    ClipboardDocumentListIcon,
    ClockIcon,
    CurrencyDollarIcon,
    PencilIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

import { Selection } from "@/components";

const AssessmentInfoHeader = () => {
    const { jobId } = useParams();

    return (
        <div className="bg-white shadow-md mt-8 mb-12">
            <div className="max-w-screen-xl mx-auto p-4 xl:px-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="inline text-blue-800 text-4xl font-medium mr-2">
                            Frontend Dev
                        </h1>
                        <span className="text-sm text-gray-500">
                            Quận 9, TP Hồ Chí Minh, Hồ Chí Minh(Location)
                        </span>
                    </div>
                    <div className="inline-flex items-center gap-8">
                        <ul className="flex gap-6">
                            <li>
                                <Tooltip content="Edit job">
                                    <Link href={`/backend/jobs/${jobId}/edit`}>
                                        <PencilIcon className="w-5 h-5" />
                                    </Link>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content="Activity logs">
                                    <Link href={"#"}>
                                        <ClipboardDocumentListIcon className="w-5 h-5" />
                                    </Link>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content="Achive this job">
                                    <Link href={"#"}>
                                        <ArchiveBoxIcon className="w-5 h-5" />
                                    </Link>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content="Group chat">
                                    <Link href={"#"}>
                                        <ChatBubbleLeftRightIcon className="w-5 h-5" />
                                    </Link>
                                </Tooltip>
                            </li>
                        </ul>
                        <Selection
                            title=""
                            placeholder="Add candidates"
                            datas={["Add resume", "Add manually"]}
                            onChange={() => {}}
                        />
                    </div>
                </div>
                <div>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-4 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                        Num of candidates: <span>7</span>
                    </span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-4 py-1 rounded dark:bg-green-900 dark:text-green-300">
                        In progress: <span>5</span>
                    </span>
                    <div className="inline-flex items-center gap-2 text-sm text-neutral-500">
                        <div className="flex items-center gap-1">
                            <ClockIcon className="w-4 h-4" />
                            <span>Full time(workModality)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CurrencyDollarIcon className="w-4 h-4" />
                            <span>Negotiate</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ArrowPathIcon className="w-4 h-4" />
                            <span>19 minutes ago(Updated time)</span>
                        </div>
                    </div>
                </div>

                <div className="w-full">
                    <div className="flex justify-between"></div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentInfoHeader;
