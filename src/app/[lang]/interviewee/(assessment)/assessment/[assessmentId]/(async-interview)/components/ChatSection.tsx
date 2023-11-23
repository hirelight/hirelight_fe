"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";

import { VideoWrapper } from "@/components";
import { videoJsOptions } from "@/components/VideoWrapper";
import LoadingIndicator from "@/components/LoadingIndicator";

import styles from "./ChatSection.module.scss";
import { useAsyncVideoAssessment } from "./AsyncVideoAssessment";

const ChatSection = () => {
    const { answers, curPos, setupLoading } = useAsyncVideoAssessment();

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
                Start interview
            </div>
        );

    console.log(
        answers[curPos].content.config!!.numOfTakes,
        answers[curPos].content.files?.length ?? 0
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
                                    __html: answers[curPos].content.name,
                                }}
                            ></div>
                        }
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                        <span>Answertime: </span>{" "}
                        <span className={styles.message_card_badge}>
                            <strong>
                                {answers[curPos].content.config!!.thinkTime
                                    ? answers[curPos].content.config!!
                                          .thinkTime /
                                          60 +
                                      "minutes"
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
