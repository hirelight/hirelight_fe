"use client";

import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MinusIcon } from "@heroicons/react/24/solid";

import { IQuestionAnswerDto } from "@/services/questions/questions.interface";
import {
    QuestionAnswerContentJson,
    QuestionDifficulty,
} from "@/interfaces/questions.interface";
import questionAnswerServices from "@/services/questions/questions.service";
import { Button, ButtonOutline } from "@/components";

import styles from "./QuestionCard.module.scss";

type QuestionCardProps = {
    data: IQuestionAnswerDto;
    questionNo: number;
    pickedQuestions: IQuestionAnswerDto[];
    onChange?: (questions: IQuestionAnswerDto[]) => void;
};

const QuestionCard: React.FC<QuestionCardProps> = ({
    data,
    questionNo,
    pickedQuestions,
    onChange,
}) => {
    const { content, tagList, difficulty, id } = data;
    const parsedContent = useMemo(
        () => JSON.parse(content),
        [content]
    ) as QuestionAnswerContentJson;
    const [showDetail, setShowDetail] = useState(false);
    const isExisting = useMemo(
        () => pickedQuestions.find(picked => picked.id === data.id),
        [data.id, pickedQuestions]
    );

    const returnBadgeOnDifficulty = (dif: number) => {
        switch (dif) {
            case 1:
                return (
                    <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                        {QuestionDifficulty[dif - 1]}
                    </span>
                );
            case 2:
                return (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                        {QuestionDifficulty[dif - 1]}
                    </span>
                );

            case 3:
                return (
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                        {QuestionDifficulty[dif - 1]}
                    </span>
                );
            case 4:
                return (
                    <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                        {QuestionDifficulty[dif - 1]}
                    </span>
                );
        }
    };

    const handleChangePicked = (question: IQuestionAnswerDto) => {
        if (!onChange) return;

        if (isExisting)
            onChange(pickedQuestions.filter(item => item.id !== data.id));
        else onChange(pickedQuestions.concat([data]));
    };

    return (
        <>
            <div className="bg-white p-2 flex gap-4">
                <div className="flex-1">
                    <h3 className="text-neutral-700 font-semibold flex flex-wrap gap-1">
                        <p className="whitespace-nowrap">
                            Question {questionNo + 1}:
                        </p>
                        <div
                            className="inline-block"
                            dangerouslySetInnerHTML={{
                                __html: parsedContent.name,
                            }}
                        ></div>
                    </h3>
                    <AnimatePresence>
                        {showDetail && (
                            <motion.div
                                initial={{
                                    height: 0,
                                }}
                                animate={{
                                    height: "auto",
                                    marginTop: "1rem",
                                }}
                                exit={{
                                    marginTop: 0,
                                    height: 0,
                                }}
                                className=" flex flex-col gap-3 overflow-hidden"
                            >
                                {parsedContent.type !== "essay" && (
                                    <div
                                        className={`grid grid-cols-1 md:grid-cols-${
                                            parsedContent.answers.length > 4
                                                ? 1
                                                : 2
                                        } gap-6`}
                                    >
                                        {parsedContent.answers?.map(
                                            (answer, index) => (
                                                <div
                                                    key={index}
                                                    className={`${styles.answer__wrapper}`}
                                                >
                                                    <input
                                                        id={`answerno-${index}-${parsedContent.name}`}
                                                        type={
                                                            parsedContent.type ===
                                                            "one-answer"
                                                                ? "radio"
                                                                : "checkbox"
                                                        }
                                                        checked={answer.correct}
                                                        value={answer.name}
                                                        name="question1-answer"
                                                        className={`${styles.answer__input}`}
                                                        readOnly
                                                    />
                                                    <label
                                                        htmlFor={`answerno-${index}-${parsedContent.name}`}
                                                        className={`${styles.answer__label}`}
                                                        dangerouslySetInnerHTML={{
                                                            __html: answer.name,
                                                        }}
                                                    >
                                                        {/* {answer.name} */}
                                                    </label>
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                                {parsedContent.type === "essay" &&
                                    parsedContent.description && (
                                        <div>
                                            <h4 className="font-medium text-sm mb-1">
                                                Description
                                            </h4>
                                            <p
                                                dangerouslySetInnerHTML={{
                                                    __html: parsedContent.description,
                                                }}
                                                className="md:col-span-1 text-sm text-gray-600"
                                            ></p>
                                        </div>
                                    )}
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm text-gray-500">
                                        Difficulty:
                                    </h4>
                                    <span>
                                        {returnBadgeOnDifficulty(difficulty)}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-neutral-500">
                                    <h4 className="text-sm text-gray-500">
                                        Tags:
                                    </h4>
                                    {tagList.map(tag => (
                                        <span
                                            key={tag.id}
                                            className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
                <button
                    type="button"
                    className="w-6 h-6 text-blue_primary_600 hover:text-blue_primary_800"
                    onClick={() => setShowDetail(!showDetail)}
                >
                    <EyeIcon />
                </button>
                {onChange && (
                    <button
                        type="button"
                        className="w-6 h-6 text-blue_primary_600 hover:text-blue_primary_800"
                        onClick={handleChangePicked.bind(null, data)}
                    >
                        {isExisting ? <MinusIcon /> : <PlusIcon />}
                    </button>
                )}
            </div>
        </>
    );
};

export default QuestionCard;
