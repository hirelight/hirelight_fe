"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

import { VideoWrapper } from "@/components";
import { videoJsOptions } from "@/components/VideoWrapper";
import LoadingIndicator from "@/components/LoadingIndicator";
import { sanitizeHtml } from "@/helpers/sanitizeHTML";

import styles from "./ChatSection.module.scss";
import { useAsyncVideoAssessment } from "./AsyncVideoAssessment";

const ChatSection = () => {
    const { answers, curPos, setupLoading, applicantDetail } =
        useAsyncVideoAssessment();

    if (setupLoading)
        return (
            <div
                className={
                    styles.chat_container + " flex justify-center !pt-[10%]"
                }
            >
                <div className="flex flex-col items-center gap-6">
                    <LoadingIndicator />
                    <p>
                        <strong>Hirelight</strong> is setting up device...
                    </p>
                </div>
            </div>
        );

    if (!answers[curPos])
        return (
            <div
                className={
                    styles.chat_container + " flex justify-center !pt-[10%]"
                }
            >
                <section className="w-full">
                    <h3 className="text-xl font-semibold mb-4">
                        {applicantDetail.assessment.name}
                    </h3>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: sanitizeHtml(
                                applicantDetail.assessment.description ?? ""
                            ),
                        }}
                        className="ql-editor h-fit !p-0"
                    ></div>

                    <div className="h-[1px] w-full bg-gray-300 my-6"></div>

                    <section>
                        <h3 className="text-xl font-semibold mb-4">Note</h3>

                        <ul className="list-disc ml-6 space-y-2">
                            <li>
                                When you start the interview the clock will auto
                                start
                            </li>
                            <li>
                                Each question will have different time settings:
                                think time, answer time and amount of retakes
                            </li>
                            <li>
                                After the assessment you can review your takes.
                                You can choose your best takes to send to the
                                recruitment team.
                            </li>
                        </ul>
                    </section>
                </section>
            </div>
        );

    return (
        <div className={styles.chat_container}>
            <div className="w-12 h-12 rounded-full text-neutral-700">
                <UserCircleIcon />
            </div>
            <div className={styles.content_container}>
                <div className={styles.message_card}>
                    <div className={styles.message_card_title}>
                        {
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: sanitizeHtml(
                                        answers[curPos].content.name
                                    ),
                                }}
                                className="ql-editor !p-0"
                            ></div>
                        }
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                        <span>Think time: </span>{" "}
                        <span className={styles.message_card_badge}>
                            <strong>
                                {answers[curPos].content.config!!.thinkTime
                                    ? answers[curPos].content.config!!
                                          .thinkTime /
                                          60 +
                                      " minutes"
                                    : "No think time"}
                            </strong>
                        </span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                        <span>Answer time: </span>{" "}
                        <span className={styles.message_card_badge}>
                            <strong>
                                {answers[curPos].content.config!!.duration
                                    ? answers[curPos].content.config!!
                                          .duration /
                                          60 +
                                      " minutes"
                                    : "No think time"}
                            </strong>
                        </span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                        <span>Number of takes: </span>{" "}
                        <span
                            className={styles.message_card_badge + " uppercase"}
                        >
                            <strong>
                                {answers[curPos].content.config!!.numOfTakes}{" "}
                                takes
                            </strong>
                        </span>
                    </p>
                </div>

                {/* ***************Question vide section*************** */}
                <div className={styles.takes_wrapper}>
                    {answers[curPos].content.video && (
                        <div className="flex justify-center items-center relative rounded-md overflow-hidden border border-slate-300">
                            <VideoWrapper
                                options={{
                                    ...{ ...videoJsOptions, autoplay: true },
                                    sources: [
                                        {
                                            src: answers[curPos].content.video!!
                                                .url,
                                            type: "video/mp4",
                                        },
                                    ],
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* ***************Takes Section*************** */}
                <div className={styles.takes_wrapper}>
                    {answers[curPos] &&
                        answers[curPos].content.files &&
                        answers[curPos].content.files?.map((vid, vidIndex) => (
                            <div
                                className="flex justify-center items-center relative rounded-md overflow-hidden border border-slate-300"
                                key={vidIndex}
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
                            </div>
                        ))}
                    {answers[curPos] &&
                        new Array(
                            answers[curPos].content.config!!.numOfTakes -
                                (answers[curPos].content.files?.length ?? 0)
                        )
                            .fill("")
                            .map((_, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles.takes_placeholder}
                                    >
                                        <span className={styles.takes_badge}>
                                            <strong>Takes {index + 1}</strong>
                                        </span>
                                    </div>
                                );
                            })}
                </div>
            </div>
        </div>
    );
};

export default ChatSection;
