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
        try {
            const res = await asyncAssessmentServices.submitAsyncAssessment({
                applicantAssessmentDetailId: data.id,
                assessmentSubmissions: JSON.stringify(submitedAns),
            });
            toast.success(res.message);
            queryClient.invalidateQueries({
                queryKey: [`my-assessment-${data.id}`],
            });
            localStorage.removeItem(data.id);
        } catch (error: any) {
            toast.error(
                error.message ? error.message : "Some thing went wrong"
            );
        }
    };

    return (
        <main className={styles.wrapper}>
            <div
                className={`bg-white w-full max-w-screen-xl mx-auto rounded-md drop-shadow-lg ${
                    [
                        ApplicantAssessmentDetailStatus.PENDING_EVALUATION,
                        ApplicantAssessmentDetailStatus.EVALUATED,
                    ].includes(data.status)
                        ? "pointer-events-auto"
                        : ""
                }`}
            >
                <div className={styles.chat_container}>
                    <div className={styles.content_container}>
                        {parseAnswerSet.map((answer, ansIndx) => (
                            <div
                                key={answer.id}
                                className={styles.content_container}
                            >
                                <div
                                    className="text-lg font-semibold mb-4"
                                    dangerouslySetInnerHTML={{
                                        __html: answer.content.name,
                                    }}
                                ></div>

                                <div className={styles.takes_wrapper}>
                                    {answer.content.files?.map(vid => (
                                        <div
                                            key={vid.name}
                                            className={`flex-shirnk-0 flex justify-center items-center relative rounded-md overflow-hidden border`}
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
                                            <div className="absolute top-3 right-3 z-40">
                                                <input
                                                    id={vid.name}
                                                    type="radio"
                                                    defaultChecked={
                                                        submitedAns[ansIndx]
                                                            .content.files!![0]
                                                            ? submitedAns[
                                                                  ansIndx
                                                              ].content
                                                                  .files!![0]
                                                                  .name ===
                                                              vid.name
                                                            : false
                                                    }
                                                    name={answer.id}
                                                    className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={e => {
                                                        setSubmitedAns(prev =>
                                                            produce(
                                                                prev,
                                                                draft => {
                                                                    if (
                                                                        draft[
                                                                            ansIndx
                                                                        ]
                                                                            .content
                                                                            .files!!
                                                                            .length &&
                                                                        e
                                                                            .currentTarget
                                                                            .checked
                                                                    ) {
                                                                        draft[
                                                                            ansIndx
                                                                        ].content.files =
                                                                            [
                                                                                vid,
                                                                            ];
                                                                    }
                                                                }
                                                            )
                                                        );
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {data.status ===
                            ApplicantAssessmentDetailStatus.IN_PROGRESS && (
                            <>
                                <div>
                                    <CountdownTimerNoSSR
                                        targetDate={moment
                                            .utc(data.startTime)
                                            .add(
                                                data.assessment.duration,
                                                "seconds"
                                            )
                                            .toDate()}
                                        onEnd={handleSubmitTest}
                                    />
                                </div>
                                <Button onClick={handleSubmitTest}>
                                    Submit answer
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AsyncReviewPage;
