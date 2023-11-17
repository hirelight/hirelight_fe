"use client";

import {
    ArchiveBoxIcon,
    ArrowPathIcon,
    ChatBubbleLeftRightIcon,
    ClipboardDocumentListIcon,
    ClockIcon,
    CurrencyDollarIcon,
    PencilIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import dynamic from "next/dynamic";
import moment from "moment";

import { Selection } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import currencies from "@/utils/shared/currencies.json";
import { CurrencyKey } from "@/interfaces/job-post.interface";

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
    const { assessmentId } = useParams();
    const job = useAppSelector(state => state.job.data);
    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);

    return (
        <div className="bg-white shadow-md mt-8 mb-6">
            <div className="max-w-screen-xl mx-auto py-6 px-4 xl:px-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="inline text-blue-800 text-4xl font-medium mr-2">
                            {job.title ? job.title : "Job title"}
                        </h1>
                        <span className="text-sm text-gray-500">
                            {job.area
                                ? job.area
                                : "Quận 9, TP Hồ Chí Minh, Hồ Chí Minh(Location)"}
                        </span>
                    </div>
                    <div className="inline-flex items-center gap-8">
                        <ul className="flex gap-6">
                            <li>
                                <Tooltip content="Edit job">
                                    <Link href={`/backend/jobs/${job.id}/edit`}>
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
                            items={["Add resume", "Add manually"].map(item => ({
                                label: item,
                                value: item,
                            }))}
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
                            <span>{job.workModality ?? "Work modality"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CurrencyDollarIcon className="w-4 h-4" />
                            <span>
                                {job.minSalary === 0 && job.maxSalary === 0
                                    ? "Negotiate"
                                    : `${job.minSalary}${
                                          currencies[
                                              job.currency as CurrencyKey
                                          ].symbol
                                      } - ${job.maxSalary}${
                                          currencies[
                                              job.currency as CurrencyKey
                                          ].symbol
                                      }`}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ArrowPathIcon className="w-4 h-4" />
                            <span>{moment(job.updatedTime).fromNow()}</span>
                        </div>
                    </div>
                </div>

                {assessmentFlow.id && (
                    <div className="w-full">
                        <div role="tablist" className="flex">
                            <div role="tab" className="flex-1 text-center">
                                <Link
                                    href={`/backend/jobs/${job.id}/hiring-process/all`}
                                    className={`${styles.assessment__btn}`}
                                >
                                    <span
                                        className={`${
                                            styles.assessment__btn__text
                                        } ${
                                            "all" === (assessmentId as string)
                                                ? styles.active
                                                : ""
                                        }`}
                                    >
                                        All
                                    </span>
                                </Link>
                            </div>
                            {assessmentFlow?.assessments?.map(assessment => {
                                return (
                                    <div
                                        role="tab"
                                        key={assessment.id}
                                        className="flex-1 text-center"
                                    >
                                        <Link
                                            href={`/backend/jobs/${job.id}/hiring-process/${assessment.id}`}
                                            className={`${styles.assessment__btn}`}
                                        >
                                            <span
                                                className={`${
                                                    styles.assessment__btn__text
                                                } ${
                                                    assessment.id.toString() ===
                                                    (assessmentId as string)
                                                        ? styles.active
                                                        : ""
                                                }`}
                                            >
                                                {assessment.name}
                                            </span>
                                        </Link>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssessmentInfoHeader;
