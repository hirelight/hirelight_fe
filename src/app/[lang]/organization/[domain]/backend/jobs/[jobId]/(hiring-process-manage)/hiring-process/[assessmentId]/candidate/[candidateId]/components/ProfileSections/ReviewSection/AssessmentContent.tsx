"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { EyeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

import applicantAssessmentDetailServices from "@/services/applicant-assessment-detail/applicant-assessment-detail.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { IJobPostAppAssDetailDto } from "@/services";
import { getIconBaseOnAssessmentType } from "@/helpers/getIconBaseType";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import ResultPreview from "./ResultPreview";

const AssessmentContent = () => {
    const { candidateId, jobId, lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "candidate");

    const applicantDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data!!
    );

    const {
        data: profileResults,
        isLoading,
        isFetching,
    } = useQuery({
        queryKey: ["profile-results", candidateId],
        queryFn: () =>
            applicantAssessmentDetailServices.employeeGetApplicantAssessDetailsList(
                applicantDetail.applicantProfile.candidateId,
                jobId as string
            ),
    });

    if (isLoading || isFetching) return <AssessmentSkeleton />;

    return (
        <div className="mt-8">
            {profileResults &&
                profileResults.data.find(
                    detail =>
                        detail.result !== null &&
                        detail.id === applicantDetail.id
                ) && (
                    <>
                        <h3 className="text-lg text-neutral-700 mb-2 font-semibold">
                            {t("current_submission")}
                        </h3>
                        <div>
                            <AssessmentCard
                                data={
                                    profileResults.data.find(
                                        detail =>
                                            detail.result !== null &&
                                            detail.id === applicantDetail.id
                                    )!!
                                }
                            />
                        </div>
                    </>
                )}

            {profileResults &&
                profileResults.data.filter(
                    detail =>
                        detail.result !== null &&
                        detail.id !== applicantDetail.id
                ).length > 0 && (
                    <h3 className="text-lg text-neutral-700 mb-2 mt-6 font-semibold">
                        {t("prev_submissions")}
                    </h3>
                )}
            <ul className="space-y-4">
                {profileResults?.data
                    ?.filter(
                        detail =>
                            detail.result !== null &&
                            detail.id !== applicantDetail.id
                    )

                    .map(detail => (
                        <li
                            key={detail.id}
                            className="border-b border-gray-300 last:border-b-0"
                        >
                            <AssessmentCard data={detail} />
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default AssessmentContent;

const AssessmentCard = ({ data }: { data: IJobPostAppAssDetailDto }) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "candidate");
    const [showPreview, setShowPreview] = useState(false);

    return (
        <>
            {data.questionAnswerSet && (
                <ResultPreview
                    data={data}
                    isOpen={showPreview}
                    close={() => setShowPreview(false)}
                />
            )}

            <div className="py-4 flex gap-4 relative">
                <div className="w-6 h-6">
                    {getIconBaseOnAssessmentType(
                        data.assessment.assessmentTypeName
                    )}
                </div>
                <h4 className="text-base font-semibold">
                    {data.assessment.name}
                </h4>
                <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    {!data.questionAnswerSet ? (
                        <div>
                            <strong>{t("non_attendance")}</strong>
                        </div>
                    ) : data.assessment.assessmentTypeName !==
                      "THIRD_PARTY_ASSESSMENT" ? (
                        <button
                            type="button"
                            onClick={() => setShowPreview(true)}
                        >
                            <EyeIcon className="text-neutral-700 w-6 h-6" />
                        </button>
                    ) : JSON.parse(data.questionAnswerSet).assessmentReport ? (
                        <Link
                            target="_blank"
                            rel="noopener noreferrer"
                            href={
                                JSON.parse(data.questionAnswerSet)
                                    .assessmentReport
                            }
                            title="Integration result"
                            className="text-sm font-semibold text-blue_primary_600 hover:text-blue_primary_800 hover:underline"
                        >
                            {t("common:report")}
                        </Link>
                    ) : null}
                </div>
            </div>
        </>
    );
};

const AssessmentSkeleton = () => {
    return (
        <div className="mt-8 space-y-4">
            {new Array(3).fill("").map((_, index) => (
                <div
                    key={index}
                    className="py-4 animate-pulse flex justify-between"
                >
                    <h4 className="h-8 w-80 bg-slate-300"></h4>
                    <div className="h-6 w-16 bg-slate-200"></div>
                </div>
            ))}
        </div>
    );
};
