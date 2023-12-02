"use client";

import React, { useMemo, useRef, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
    PencilIcon as PencilSolid,
    TrashIcon as TrashSolid,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { produce } from "immer";

import { IQuestionAnswerDto } from "@/services/questions/questions.interface";
import {
    ICandidateMCContentJson,
    ICandidateMCDto,
    QuestionAnswerContentJson,
    QuestionDifficulty,
    QuestionTypes,
} from "@/interfaces/questions.interface";
import questionAnswerServices from "@/services/questions/questions.service";
import { DeleteModal, Portal } from "@/components";

import styles from "./QuestionCard.module.scss";
import { useMultipleChoiceAssessment } from "./MultipleChoiceAssessment";

const answers = [
    "Hyper Text Markup Language",
    "High Tech Modern Language",
    "Hyperlink and Text Markup Language",
    "Hyperlink Text Mode Language",
];

type QuestionCardProps = {
    data: ICandidateMCDto;
    index: number;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ data, index }) => {
    const { content, tagList, difficulty, id } = data;
    const parsedContent = useRef<ICandidateMCContentJson>(JSON.parse(content));
    const { answers, setAnswers } = useMultipleChoiceAssessment();

    const handleChooseAnswer = (
        e: React.ChangeEvent<HTMLInputElement>,
        content: string
    ) => {
        setAnswers(
            answers.map(item => {
                if (item.id === id) {
                    return {
                        ...data,
                        content: JSON.stringify({
                            ...parsedContent.current,
                            answers: parsedContent.current.answers.map(
                                choice => {
                                    if (choice.name === content) {
                                        return {
                                            ...choice,
                                            isChosen: e.target.checked,
                                        };
                                    }

                                    return {
                                        ...choice,
                                        isChosen:
                                            parsedContent.current.type ===
                                            "one-answer"
                                                ? false
                                                : choice.isChosen,
                                    };
                                }
                            ),
                        }),
                    };
                }
                return item;
            })
        );
    };

    return (
        <>
            <div id={id} className="bg-white p-4 flex items-stretch">
                <div className="flex-1">
                    <h3 className="text-neutral-700 font-semibold mb-4 flex flex-wrap gap-1">
                        <p className="whitespace-nowrap">
                            Question {index + 1}:{" "}
                        </p>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: parsedContent.current.name,
                            }}
                        ></span>
                    </h3>
                    {parsedContent.current.type !== "essay" && (
                        <div className={`grid grid-cols-1 gap-4`}>
                            {parsedContent.current.answers?.map(
                                (answer, index) => (
                                    <div
                                        key={index}
                                        className={`${styles.answer__wrapper}`}
                                    >
                                        <input
                                            type={
                                                parsedContent.current.type ===
                                                "one-answer"
                                                    ? "radio"
                                                    : "checkbox"
                                            }
                                            id={`answer-${index}-${id}`}
                                            name={
                                                parsedContent.current.type ===
                                                "one-answer"
                                                    ? id
                                                    : answer.name
                                            }
                                            value={answer.name}
                                            defaultChecked={answer.isChosen}
                                            className={`${styles.answer__input}`}
                                            onChange={e =>
                                                handleChooseAnswer(
                                                    e,
                                                    answer.name
                                                )
                                            }
                                        />
                                        <label
                                            htmlFor={`answer-${index}-${id}`}
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
                    {parsedContent.current.type === "essay" &&
                        parsedContent.current.description && (
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: parsedContent.current.description,
                                }}
                                className="md:col-span-1 text-sm text-gray-600"
                            ></p>
                        )}
                </div>
            </div>
        </>
    );
};

export default QuestionCard;
