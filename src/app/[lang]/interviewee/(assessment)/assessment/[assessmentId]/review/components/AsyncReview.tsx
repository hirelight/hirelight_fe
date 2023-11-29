"use client";

import React, { useMemo, useRef, useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import moment from "moment";
import { produce } from "immer";
import dynamic from "next/dynamic";

import {
    IAssessmentDto,
    IAsyncAnswer,
    ICandidateAssessmentDetailDto,
    asyncAssessmentServices,
} from "@/services";
import { Button, VideoWrapper } from "@/components";
import { videoJsOptions } from "@/components/VideoWrapper";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import styles from "./AsyncReview.module.scss";

const CountdownTimerNoSSR = dynamic(
    () => import("@/components/CountdownTimer"),
    {
        ssr: false,
    }
);

type ReviewPageProps = {
    data: Omit<ICandidateAssessmentDetailDto, "assessment"> & {
        assessment: IAssessmentDto;
    };
};

const AsyncReviewPage: React.FC<ReviewPageProps> = ({ data }) => {
    const queryClient = useQueryClient();

    const parseAnswerSet = useMemo<IAsyncAnswer[]>(
        () => JSON.parse(data.questionAnswerSet!!),
        [data]
    );
    const [loading, setLoading] = useState(false);
    const [submitedAns, setSubmitedAns] = useState<IAsyncAnswer[]>(
        parseAnswerSet.map(item => ({
            ...item,
            content: {
                ...item.content,
                files: item.content.files
                    ? item.content.files.length > 0
                        ? [item.content.files[item.content.files.length - 1]]
                        : [item.content.files[0]]
                    : [],
            },
        }))
    );

    const handleSubmitTest = async () => {
        setLoading(true);
        try {
            const res = await asyncAssessmentServices.submitAsyncAssessment({
                applicantAssessmentDetailId: data.id,
                assessmentSubmissions: JSON.stringify(submitedAns),
            });
            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: [`my-assessment`, data.id],
            });
            localStorage.removeItem(data.id);
        } catch (error: any) {
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
        }
        setLoading(false);
    };

    return (
        <main className={styles.wrapper}>
            <div
                className={`bg-white w-full max-w-screen-xl mx-auto p-6 border border-gray-300 rounded-md drop-shadow-lg ${
                    [
                        ApplicantAssessmentDetailStatus.PENDING_EVALUATION,
                        ApplicantAssessmentDetailStatus.EVALUATED,
                    ].includes(data.status)
                        ? "pointer-events-auto"
                        : ""
                }`}
            >
                <div className="py-6 border-b border-gray-300">
                    <h1 className="text-2xl font-medium mb-2">
                        {data.status ===
                        ApplicantAssessmentDetailStatus.IN_PROGRESS
                            ? "Choose your best takes"
                            : "Your chosen takes"}
                    </h1>
                    <p className="text-gray-500">
                        {data.status ===
                        ApplicantAssessmentDetailStatus.IN_PROGRESS
                            ? "You can select your favorite take for each question"
                            : "Your favorite takes have been sent to the recruiter"}
                    </p>
                </div>
                <div className={styles.content_container}>
                    {parseAnswerSet.map((answer, ansIndx) => (
                        <div
                            key={answer.id}
                            className={styles.content_container}
                        >
                            <div className="flex items-start gap-2 mb-4 max-w-[50%]">
                                <span>{ansIndx + 1}.</span>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: answer.content.name,
                                    }}
                                    className="ql-editor !p-0"
                                ></div>
                            </div>

                            <div className={styles.takes_wrapper}>
                                {answer.content.files?.map((vid, vidIndex) => (
                                    <div
                                        key={vid.name}
                                        className={`flex-shirnk-0 flex flex-col justify-center items-center relative p-2 rounded-md overflow-hidden border  ${
                                            submitedAns[ansIndx].content
                                                .files!![0] &&
                                            submitedAns[ansIndx].content
                                                .files!![0].name === vid.name
                                                ? "border-blue_primary_700"
                                                : "border-gray-300"
                                        }`}
                                    >
                                        <VideoWrapper
                                            options={{
                                                ...videoJsOptions,
                                                sources: [
                                                    {
                                                        src: vid.src,
                                                        type: vid.type,
                                                    },
                                                ],
                                            }}
                                        />
                                        <div className="w-full pt-4 flex justify-between items-center">
                                            <div className="py-1 px-3 bg-slate-200/80 rounded uppercase font-semibold text-sm">
                                                {answer.content.files
                                                    ? answer.content.files
                                                          ?.length < 2
                                                        ? "Your only take"
                                                        : `Take ${vidIndex + 1}`
                                                    : ""}
                                            </div>
                                            <input
                                                id={vid.name}
                                                type="radio"
                                                defaultChecked={
                                                    submitedAns[ansIndx].content
                                                        .files!![0]
                                                        ? submitedAns[ansIndx]
                                                              .content
                                                              .files!![0]
                                                              .name === vid.name
                                                        : false
                                                }
                                                name={answer.id}
                                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                onChange={e => {
                                                    setSubmitedAns(prev =>
                                                        produce(prev, draft => {
                                                            if (
                                                                draft[ansIndx]
                                                                    .content
                                                                    .files!!
                                                                    .length &&
                                                                e.currentTarget
                                                                    .checked
                                                            ) {
                                                                draft[
                                                                    ansIndx
                                                                ].content.files =
                                                                    [vid];
                                                            }
                                                        })
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="h-[1px] w-full my-10 bg-gray-300"></div>

                    {data.status ===
                        ApplicantAssessmentDetailStatus.IN_PROGRESS && (
                        <div className="flex justify-between items-center">
                            <Button
                                disabled={loading}
                                isLoading={loading}
                                onClick={handleSubmitTest}
                            >
                                Submit answer
                            </Button>
                            <CountdownTimerNoSSR
                                targetDate={moment
                                    .utc(data.startTime)
                                    .add(data.assessment.duration, "seconds")
                                    .toDate()}
                                onEnd={handleSubmitTest}
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AsyncReviewPage;
