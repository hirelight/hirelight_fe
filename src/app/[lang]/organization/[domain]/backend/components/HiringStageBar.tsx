"use client";

import React, { useMemo, useRef } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useOutsideClick } from "@/hooks/useClickOutside";
import { Plus } from "@/icons";
import { JobPostStatus } from "@/interfaces/job-post.interface";
import { IJobDto } from "@/services";

import styles from "./HiringStageBar.module.scss";

type HiringStageBarProps = {
    curStatus: JobPostStatus;
    onChange: (status: JobPostStatus) => void;
    jobList: IJobDto[];
};

const HiringStageBar: React.FC<HiringStageBarProps> = ({
    curStatus,
    onChange,
    jobList = [],
}) => {
    const { lang } = useParams();

    const numOfDrafts = useRef<number>(
        jobList.filter(job => job.status === JobPostStatus.DRAFT).length
    );
    const numOfPublished = useRef<number>(
        jobList.filter(job => job.status === JobPostStatus.ACTIVE).length
    );
    const numOfPending = useRef<number>(
        jobList.filter(job => job.status === JobPostStatus.PENDING_APPROVAL)
            .length
    );

    const stageBtnWrapperRef = useOutsideClick<HTMLUListElement>(() => {
        if (stageBtnWrapperRef.current) {
            if (
                !stageBtnWrapperRef.current.classList.contains("invisible") &&
                !stageBtnWrapperRef.current.classList.contains("opacity-0") &&
                window.innerWidth <= 480
            ) {
                stageBtnWrapperRef.current.classList.toggle("invisible");
                stageBtnWrapperRef.current.classList.toggle("opacity-0");
            }
        }
    });

    const handleShowBtnList = (stage?: JobPostStatus) => {
        if (stageBtnWrapperRef.current && window.innerWidth <= 480) {
            stageBtnWrapperRef.current.classList.toggle("invisible");
            stageBtnWrapperRef.current.classList.toggle("opacity-0");
        }
        if (stage) onChange(stage);
    };

    return (
        <div className="w-full flex items-center bg-white border border-slate-200 shadow-md rounded-lg py-6 px-8 -translate-y-1/2">
            <div className="relative">
                <button
                    type="button"
                    className="block sm:hidden text-blue_primary_800 font-medium"
                    onClick={handleShowBtnList.bind(null, undefined)}
                >
                    {JobPostStatus[curStatus]}
                </button>
                <ul
                    ref={stageBtnWrapperRef}
                    className="flex flex-col absolute top-full left-0 -translate-x-4  bg-white border border-slate-200 rounded-md mt-2 shadow-md invisible opacity-0 transition-all sm:border-none sm:mt-0 sm:shadow-none sm:bg-transparent sm:relative sm:translate-x-0 sm:visible sm:opacity-100 sm:inset-0 sm:flex-row sm:gap-6 sm:items-center md:gap-12"
                >
                    <li className="py-2 px-4 sm:py-0 sm:px-0 relative">
                        <button
                            type="button"
                            className={`${styles.stageButton} ${
                                curStatus === JobPostStatus.DRAFT
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={handleShowBtnList.bind(
                                null,
                                JobPostStatus.DRAFT
                            )}
                        >
                            Draft
                        </button>
                        {numOfDrafts.current > 0 && (
                            <span className={styles.stageButtonBadge}>
                                {numOfDrafts.current}
                            </span>
                        )}
                    </li>
                    <li className="py-2 px-4 sm:py-0 sm:px-0 relative">
                        <button
                            type="button"
                            className={`${styles.stageButton} ${
                                curStatus === JobPostStatus.ACTIVE
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={handleShowBtnList.bind(
                                null,
                                JobPostStatus.ACTIVE
                            )}
                        >
                            Published
                            {numOfPublished.current > 0 && (
                                <span className={styles.stageButtonBadge}>
                                    {numOfPublished.current}
                                </span>
                            )}
                        </button>
                    </li>
                    <li className="py-2 px-4 sm:py-0 sm:px-0 relative">
                        <button
                            type="button"
                            className={`${styles.stageButton} ${
                                curStatus === JobPostStatus.PENDING_APPROVAL
                                    ? styles.active
                                    : ""
                            }`}
                            onClick={handleShowBtnList.bind(
                                null,
                                JobPostStatus.PENDING_APPROVAL
                            )}
                        >
                            Pending approval
                            {numOfPending.current > 0 && (
                                <span className={styles.stageButtonBadge}>
                                    {numOfPending.current}
                                </span>
                            )}
                        </button>
                    </li>
                </ul>
            </div>
            <Link
                href={`/${lang}/backend/jobs/new`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 md:p-0 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-auto flex items-center gap-1"
            >
                <Plus className="w-6 h-6" />
                <span className="hidden md:inline-block">Create a new job</span>
            </Link>
        </div>
    );
};

export default HiringStageBar;
