"use client";

import {
    ArrowPathIcon,
    ChatBubbleBottomCenterTextIcon,
    ClockIcon,
    CurrencyDollarIcon,
    PencilIcon,
    PresentationChartLineIcon,
    FlagIcon,
    ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import { useAppSelector } from "@/redux/reduxHooks";
import currencies from "@/utils/shared/currencies.json";
import { CurrencyKey } from "@/interfaces/job-post.interface";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";

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
    const { assessmentId, jobId, lang } = useParams();

    const job = useAppSelector(state => state.job.data);
    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);
    const { data: profileList } = useQuery({
        queryKey: ["job-profiles", jobId],
        queryFn: () =>
            applicantAssessmentDetailServices.employeeGetJobPostProfile(
                jobId as string
            ),
    });

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
                                    <Link
                                        href={`/${lang}/backend/jobs/${job.id}/edit`}
                                    >
                                        <PencilIcon className="w-6 h-6" />
                                    </Link>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content="Reports">
                                    <Link
                                        href={`/${lang}/backend/jobs/${job.id}/reports`}
                                    >
                                        <FlagIcon className="w-6 h-6" />
                                    </Link>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content="Feedbacks">
                                    <Link
                                        href={`/${lang}/backend/jobs/${job.id}/feedbacks`}
                                    >
                                        <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                                    </Link>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content="Activities">
                                    <Link
                                        href={`/${lang}/backend/jobs/${job.id}/activities`}
                                    >
                                        <PresentationChartLineIcon className="w-6 h-6" />
                                    </Link>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content="Recruitment process">
                                    <Link
                                        href={`/${lang}/backend/jobs/${job.id}/hiring-process`}
                                    >
                                        <ClipboardDocumentListIcon className="w-6 h-6" />
                                    </Link>
                                </Tooltip>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mb-8 w-full flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-4 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                        Num of candidates:{" "}
                        <span>{profileList?.data.length ?? 0}</span>
                    </span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-4 py-1 rounded dark:bg-green-900 dark:text-green-300">
                        In progress:{" "}
                        <span>
                            {profileList?.data.filter(
                                candidate =>
                                    candidate.assessment.assessmentTypeName !==
                                    "SOURCED_ASSESSMENT"
                            ).length ?? 0}
                        </span>
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
                                          job.currency
                                              ? currencies[
                                                    job.currency as CurrencyKey
                                                ].symbol
                                              : ""
                                      } - ${job.maxSalary}${
                                          job.currency
                                              ? currencies[
                                                    job.currency as CurrencyKey
                                                ].symbol
                                              : ""
                                      }`}
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <ArrowPathIcon className="w-4 h-4" />
                            <span>
                                {moment
                                    .utc(job.updatedTime)
                                    .locale(lang as string)
                                    .fromNow()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentInfoHeader;
