"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { BookmarkSlashIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, LazyMotion, domAnimation } from "framer-motion";

import evaluationServices from "@/services/evaluation/evaluation.service";
import { Button } from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./styles.module.scss";
import AddEvaluationSection from "./AddEvaluationSection";
import EvaluationCard, { getRating } from "./EvaluationCard";

const ReviewContent = () => {
    const { candidateId, lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "candidate");

    const [showAdd, setShowAdd] = useState(false);
    const applicantAssessmentDetail = useAppSelector(
        state => state.applicantAssessmentDetail.data!!
    );
    const [selectedDetailId, setSelectedDetailId] = useState(
        applicantAssessmentDetail.id as string
    );
    const { data: querRes, isLoading: otherLoading } = useQuery({
        queryKey: ["profile-evaluations", candidateId],
        queryFn: () =>
            evaluationServices.getListByProfileId(candidateId as string),
    });
    const { data: curDetailEvaluate, isLoading: curLoading } = useQuery({
        queryKey: ["assessment-evaluations", applicantAssessmentDetail.id],
        queryFn: () =>
            evaluationServices.getListByApplicantAssessmentDetailId(
                applicantAssessmentDetail.id as string
            ),
    });

    const handleShowAddEvaluation = async (id: string) => {
        setSelectedDetailId(id);
        setShowAdd(true);
    };

    if (curLoading || otherLoading)
        return (
            <div className="mt-4">
                <EvaluationSkeleton />
            </div>
        );

    return (
        <div className="mt-4 space-y-6">
            {!curDetailEvaluate?.data.length ? (
                <div className="flex justify-center items-center p-6">
                    <BookmarkSlashIcon className="w-16 h-16 text-neutral-700" />
                    <div className="ml-6 p-2">
                        <h3 className="mb-2 text-lg font-semibold">
                            {t("there_is_no_evaluations")}
                        </h3>
                        <p className="mb-6 text-sm">
                            {t("evaluations_you_or_other")}
                        </p>
                        <Button onClick={() => setShowAdd(true)}>
                            {t("add_evaluation")}
                        </Button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3 className="text-lg text-neutral-700 mb-2 font-semibold">
                        {t("current_submission")}
                    </h3>
                    <section
                        key={applicantAssessmentDetail.id}
                        className="text-sm"
                    >
                        <div className="pb-6 pt-4 border-b border-gray-300 flex gap-4">
                            <h4 className="text-base font-semibold">
                                {applicantAssessmentDetail.assessment.name}
                            </h4>

                            <div>
                                {Array.from(
                                    curDetailEvaluate.data
                                        ?.reduce((prev, cur) => {
                                            if (!prev.has(cur.rating)) {
                                                prev.set(cur.rating, {
                                                    value: cur,
                                                    count: 1,
                                                });
                                            } else {
                                                prev.set(cur.rating, {
                                                    value: cur,
                                                    count:
                                                        prev.get(cur.rating)
                                                            .count + 1,
                                                });
                                            }

                                            return prev;
                                        }, new Map())
                                        .values()
                                ).map(item => (
                                    <div
                                        key={item.value.rating}
                                        className="inline-flex gap-1 mr-3"
                                    >
                                        {getRating(
                                            item.value.rating,
                                            <span>{item.count}</span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <ul>
                            {curDetailEvaluate.data?.map(evaluation => (
                                <li
                                    key={evaluation.id}
                                    className="py-6 border-b border-gray-300"
                                >
                                    <EvaluationCard data={evaluation} />
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            )}

            <ul>
                {querRes &&
                    querRes.data.filter(
                        item =>
                            item.assessmentEvaluations.length > 0 &&
                            item.id !== applicantAssessmentDetail.id
                    ).length > 0 && (
                        <h3 className="text-lg text-neutral-700 mb-2 font-semibold">
                            {t("prev_submissions")}
                        </h3>
                    )}
                <div className="space-y-4">
                    {querRes?.data
                        .filter(
                            item =>
                                item.assessmentEvaluations.length > 0 &&
                                item.id !== applicantAssessmentDetail.id
                        )
                        .map(item => (
                            <section key={item.id} className="text-sm ">
                                <div className="pb-6 pt-4 border-b border-gray-300 flex gap-4">
                                    <h4 className="text-base font-semibold">
                                        {item.assessment.name}
                                    </h4>
                                    <div>
                                        {Array.from(
                                            item.assessmentEvaluations
                                                ?.reduce((prev, cur) => {
                                                    if (!prev.has(cur.rating)) {
                                                        prev.set(cur.rating, {
                                                            value: cur,
                                                            count: 1,
                                                        });
                                                    } else {
                                                        prev.set(cur.rating, {
                                                            value: cur,
                                                            count:
                                                                prev.get(
                                                                    cur.rating
                                                                ).count + 1,
                                                        });
                                                    }
                                                    return prev;
                                                }, new Map())
                                                .values()
                                        ).map(item => (
                                            <div
                                                key={item.value.rating}
                                                className="inline-flex gap-1 mr-3"
                                            >
                                                {getRating(
                                                    item.value.rating,
                                                    <span>{item.count}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <ul>
                                    {item.assessmentEvaluations?.map(
                                        evaluation => (
                                            <li
                                                key={evaluation.id}
                                                className="py-6 border-b border-gray-300"
                                            >
                                                <EvaluationCard
                                                    data={evaluation}
                                                />
                                            </li>
                                        )
                                    )}
                                </ul>
                            </section>
                        ))}
                </div>
            </ul>

            <button
                type="button"
                className="text-sm text-blue_primary_600 font-semibold hover:underline hover:text-blue_primary_800"
                onClick={handleShowAddEvaluation.bind(
                    null,
                    applicantAssessmentDetail.id
                )}
            >
                {t("add_evaluation_for_candidate")}
            </button>

            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {showAdd && (
                        <AddEvaluationSection
                            applicantAssessmentDetailId={selectedDetailId}
                            close={() => setShowAdd(false)}
                        />
                    )}
                </AnimatePresence>
            </LazyMotion>
        </div>
    );
};

export default ReviewContent;

const EvaluationSkeleton = () => {
    return (
        <ul>
            {new Array(2).fill("").map((_, index) => (
                <section key={index} className="animate-pulse">
                    <div className="pb-6 pt-4 border-b border-gray-300 flex gap-4">
                        <h4 className="text-base font-semibold h-6 w-20 bg-slate-300"></h4>

                        <div className="h-5 w-14"></div>
                    </div>

                    <ul>
                        {new Array(4).fill("").map((x, xIndex) => (
                            <li
                                key={xIndex}
                                className="py-6 border-b border-gray-300"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-300"></div>
                                    <div className="flex-1">
                                        <div className="h-5 w-14 bg-slate-200"></div>
                                        <div className="h-5 w-10 bg-slate-200"></div>
                                    </div>
                                </div>
                                <p className="h-5 w-[330px] bg-slate-200"></p>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </ul>
    );
};
