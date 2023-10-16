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
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";

import { Selection } from "@/components";
import { SpinLoading } from "@/icons";

import styles from "./AssessmentInfoHeader.module.scss";

const Tooltip = dynamic(
    () => import("flowbite-react").then(mod => mod.Tooltip),
    {
        ssr: false,
        loading: () => (
            <div className="w-8 h-8 rounded-md animate-pulse bg-slate-200"></div>
        ),
    }
);

const AssessmentInfoHeader = () => {
    const { jobId, assessmentId } = useParams();

    return (
        <div className="bg-white shadow-md mt-8 mb-6">
            <div className="max-w-screen-xl mx-auto py-6 px-4 xl:px-6">
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
                <div className="mb-8">
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
                    <div role="tablist" className="flex">
                        {[
                            "All",
                            "Sourced",
                            "Applied",
                            "Phone screen",
                            "Assessment",
                            "Interview",
                            "Offer",
                            "Hired",
                        ].map((item, index) => (
                            <div
                                role="tab"
                                key={item}
                                className="flex-1 text-center"
                            >
                                <Link
                                    href={`/backend/jobs/${jobId}/hiring-process/${item
                                        .toLowerCase()
                                        .replace(" ", "-")}`}
                                    className={styles.assessment__btn}
                                >
                                    <span
                                        className={`${
                                            styles.assessment__btn__text
                                        } ${
                                            item
                                                .toLowerCase()
                                                .replace(" ", "-") ===
                                            (assessmentId as string)
                                                .toLowerCase()
                                                .replace(" ", "-")
                                                ? styles.active
                                                : ""
                                        }`}
                                    >
                                        {item}{" "}
                                        <span className="ml-1 text-neutral-400">
                                            {index === 0 ? "-" : index}
                                        </span>
                                    </span>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentInfoHeader;
