"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import React from "react";
import videojs from "video.js";
import Player from "video.js/dist/types/player";

import { VideoWrapper } from "@/components";
import { videoJsOptions } from "@/components/VideoWrapper";

import styles from "./ChatSection.module.scss";
import { useAsyncVideoAssessment } from "./AsyncVideoAssessment";

const ChatSection = () => {
    const { answers, assessmentData, curPos } = useAsyncVideoAssessment();

    return (
        <div className={styles.chat_container}>
            <div className="w-12 h-12 rounded-full text-neutral-700">
                <UserCircleIcon />
            </div>
            <div className={styles.content_container}>
                <div className={styles.message_card}>
                    <div className={styles.message_card_title}>
                        {answers[curPos] ? (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: answers[curPos].content.name,
                                }}
                            ></div>
                        ) : (
                            <span>
                                What inspired you to pursue this career?
                            </span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                        <span>Answertime: </span>{" "}
                        <span className={styles.message_card_badge}>
                            <strong>
                                {answers[curPos]
                                    ? answers[curPos].content.config!!
                                          .thinkTime / 60
                                    : 3}{" "}
                                minutes
                            </strong>
                        </span>
                    </p>
                    <p className="text-sm text-gray-500 mb-2">
                        <span>Number of takes: </span>{" "}
                        <span className={styles.message_card_badge}>
                            <strong>
                                {answers[curPos]
                                    ? answers[curPos].content.config!!
                                          .numOfTakes
                                    : 3}
                            </strong>
                        </span>
                    </p>
                </div>
                <div className={styles.takes_wrapper}>
                    {answers[curPos] &&
                        new Array(answers[curPos].content.config!!.numOfTakes)
                            .fill("")
                            .map((_, index) => {
                                const dump = answers[curPos];
                                if (
                                    dump.content.files &&
                                    dump.content.files.length
                                ) {
                                    const isExist = dump.content.files[index];

                                    if (isExist)
                                        return (
                                            <div
                                                className="flex justify-center items-center relative"
                                                key={isExist.name}
                                            >
                                                <div className="absolute inset-0 max-w-full">
                                                    <VideoWrapper
                                                        options={{
                                                            ...videoJsOptions,
                                                            sources: [
                                                                {
                                                                    src: isExist.src,
                                                                    type: isExist.type,
                                                                },
                                                            ],
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                }

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
