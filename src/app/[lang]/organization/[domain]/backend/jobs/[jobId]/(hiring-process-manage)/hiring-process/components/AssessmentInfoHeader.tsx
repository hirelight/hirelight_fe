"use client";

import {
    ArrowPathIcon,
    ChatBubbleBottomCenterTextIcon,
    ClockIcon,
    CurrencyDollarIcon,
    PencilIcon,
    PresentationChartLineIcon,
    FlagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";

import { AvatarGroup, ButtonOutline } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import currencies from "@/utils/shared/currencies.json";
import { CurrencyKey } from "@/interfaces/job-post.interface";
import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import collaboratorsServices from "@/services/collaborators/collaborators.service";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./AssessmentInfoHeader.module.scss";
import AssignAssessorModal from "./AssignAssessorModal";

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
    const { t } = useI18NextTranslation(lang as I18Locale, "hiring-process");

    const [assignModal, setAssignModal] = useState(false);

    const job = useAppSelector(state => state.job.data);
    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);
    const { data: profileList } = useQuery({
        queryKey: ["job-profiles", jobId],
        queryFn: () =>
            applicantAssessmentDetailServices.employeeGetJobPostProfile(
                jobId as string
            ),
    });
    const { data: assignedAssessors } = useQuery({
        queryKey: ["assigned-assessors", assessmentId],
        queryFn: () =>
            collaboratorsServices.getAssignedCollaboratorList(
                jobId as string,
                assessmentId as string
            ),
    });

    return (
        <div className="bg-white shadow-md mt-8 mb-6">
            {assignedAssessors && (
                <AssignAssessorModal
                    isOpen={assignModal}
                    assessors={assignedAssessors.data}
                    closeModal={() => setAssignModal(false)}
                />
            )}
            <div className="max-w-screen-xl mx-auto py-6 px-4 xl:px-6">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h1 className="inline text-blue-800 text-4xl font-medium mr-2">
                            {job.title ? job.title : t("job_title")}
                        </h1>
                        <span className="text-sm text-gray-500">
                            {job.area ? job.area : ""}
                        </span>
                    </div>
                    <div className="inline-flex items-center gap-8">
                        <ul className="flex gap-6">
                            <li>
                                <Tooltip content={t("edit_job")}>
                                    <Link
                                        href={`/${lang}/backend/jobs/${job.id}/edit`}
                                    >
                                        <PencilIcon className="w-6 h-6" />
                                    </Link>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content={t("reports")}>
                                    <Link
                                        href={`/${lang}/backend/jobs/${job.id}/reports`}
                                    >
                                        <FlagIcon className="w-6 h-6" />
                                    </Link>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content={t("feedbacks")}>
                                    <Link
                                        href={`/${lang}/backend/jobs/${job.id}/feedbacks`}
                                    >
                                        <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                                    </Link>
                                </Tooltip>
                            </li>
                            <li>
                                <Tooltip content={t("activities")}>
                                    <Link
                                        href={`/${lang}/backend/jobs/${job.id}/activities`}
                                    >
                                        <PresentationChartLineIcon className="w-6 h-6" />
                                    </Link>
                                </Tooltip>
                            </li>
                        </ul>

                        {assessmentFlow.assessments.find(
                            item =>
                                item.id === assessmentId &&
                                ![
                                    "HIRED_ASSESSMENT",
                                    "SOURCED_ASSESSMENT",
                                ].includes(item.assessmentTypeName)
                        ) && (
                            <ButtonOutline onClick={() => setAssignModal(true)}>
                                {t("assign_assessors")}
                            </ButtonOutline>
                        )}
                    </div>
                </div>
                <div className="mb-8 w-full flex items-center">
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-4 py-1 rounded dark:bg-blue-900 dark:text-blue-300">
                        {t("num_of_candidates")}:{" "}
                        <span>{profileList?.data.length ?? 0}</span>
                    </span>
                    <span className="bg-green-100 text-green-800 text-sm font-medium mr-2 px-4 py-1 rounded dark:bg-green-900 dark:text-green-300">
                        {t("in_progress")}:{" "}
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
                            <span>{job.workModality ?? ""}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CurrencyDollarIcon className="w-4 h-4" />
                            <span>
                                {job.minSalary === 0 && job.maxSalary === 0
                                    ? t("negotiate")
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
                            <span>
                                {moment
                                    .utc(job.updatedTime)
                                    .locale(lang as string)
                                    .fromNow()}
                            </span>
                        </div>
                    </div>
                    {assignedAssessors && (
                        <div className="ml-auto inline-block">
                            <AvatarGroup
                                urls={assignedAssessors.data.map(
                                    item => item.employerDto.avatarUrl
                                )}
                            />
                        </div>
                    )}
                </div>

                {assessmentFlow.id && (
                    <div className="w-full">
                        <div
                            role="tablist"
                            className={styles.assessment_tab_wrapper}
                        >
                            <div
                                role="tab"
                                className="flex-1 flex-shrink-0 text-center"
                            >
                                <Link
                                    href={`/${lang}/backend/jobs/${job.id}/hiring-process/all`}
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
                                        {t("common:all")}
                                    </span>
                                </Link>
                            </div>
                            {assessmentFlow?.assessments?.map(assessment => {
                                return (
                                    <div
                                        role="tab"
                                        key={assessment.id}
                                        className="flex-1 flex-shrink-0 text-center"
                                    >
                                        <Link
                                            href={`/${lang}/backend/jobs/${job.id}/hiring-process/${assessment.id}`}
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
                                                {assessment.name}{" "}
                                                <span className="font-bold text-gray-400 ml-1">
                                                    {!profileList?.data.filter(
                                                        profile =>
                                                            profile.assessmentId ===
                                                            assessment.id
                                                    ).length
                                                        ? "-"
                                                        : profileList?.data.filter(
                                                              profile =>
                                                                  profile.assessmentId ===
                                                                  assessment.id
                                                          ).length}
                                                </span>
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
