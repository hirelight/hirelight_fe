"use client";

import React, { useMemo, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { toast } from "react-toastify";

import { IQuestionAnswerDto } from "@/services/questions/questions.interface";
import { QuestionAnswerContentJson } from "@/interfaces/questions.interface";
import questionAnswerServices from "@/services/questions/questions.service";

import styles from "./QuestionCard.module.scss";

const answers = [
    "Hyper Text Markup Language",
    "High Tech Modern Language",
    "Hyperlink and Text Markup Language",
    "Hyperlink Text Mode Language",
];

type QuestionCardProps = {
    data: IQuestionAnswerDto;
    index: number;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ data, index }) => {
    const { content, tagList, difficulty, id } = data;
    const parsedContent = useMemo(
        () => JSON.parse(content),
        [content]
    ) as QuestionAnswerContentJson;

    const handleDeleteQuestion = async (id: number) => {
        try {
            const res = await questionAnswerServices.deleteByIdAsync(id);

            toast.success(res.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white p-4 flex items-stretch">
            <div className="flex-1">
                <h3 className="text-neutral-700 font-semibold mb-4 flex gap-1">
                    <span>Question {index + 1}:</span>
                    <div
                        dangerouslySetInnerHTML={{ __html: parsedContent.name }}
                    ></div>
                </h3>
                <div
                    className={`grid grid-cols-1 md:grid-cols-${
                        answers.length > 4 ? 1 : 2
                    } gap-6`}
                >
                    {parsedContent.answers.map((answer, index) => (
                        <div
                            key={index}
                            className={`${styles.answer__wrapper}`}
                        >
                            <input
                                id={`question1-answer-${answer.name}`}
                                type={
                                    parsedContent.type === "one-answer"
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
                                htmlFor={`question1-answer-${answer.name}`}
                                className={`${styles.answer__label}`}
                                dangerouslySetInnerHTML={{
                                    __html: answer.name,
                                }}
                            >
                                {/* {answer.name} */}
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="hidden h-20 w-[1px] mx-6 self-center bg-gray-300 md:block"></div>
            <div className="w-[200px] text-sm text-neutral-500 flex flex-col">
                <p className="font-semibold mb-2">
                    Difficulty:{" "}
                    <span className="font-normal">{difficulty}</span>
                </p>
                <div>
                    <div className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold mr-2">Tags:</span>
                        {tagList.map(tag => (
                            <span
                                key={tag.id}
                                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                            >
                                {tag.name}
                            </span>
                        ))}
                    </div>
                </div>
                <div className="flex gap-4 mt-auto">
                    <Link href={`questions-bank/${id}/edit`}>
                        <PencilIcon className="w-5 h-5 text-blue_primary_700" />
                    </Link>
                    <button
                        type="button"
                        onClick={handleDeleteQuestion.bind(null, id)}
                    >
                        <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuestionCard;
