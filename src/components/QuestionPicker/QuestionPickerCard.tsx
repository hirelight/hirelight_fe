"use client";

import React, { useMemo, useState } from "react";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { EyeIcon, PlusIcon } from "@heroicons/react/24/outline";
import { MinusIcon } from "@heroicons/react/24/solid";
import { useParams } from "next/navigation";

import { IQuestionAnswerDto } from "@/services/questions/questions.interface";
import {
    QuestionAnswerContentJson,
    QuestionDifficulty,
} from "@/interfaces/questions.interface";
import { sanitizeHtml } from "@/helpers/sanitizeHTML";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import DifficultyBadge from "../DifficultyBadge";

import styles from "./QuestionPickerCard.module.scss";

type QuestionPickerCardProps = {
    data: IQuestionAnswerDto;
    questionNo: number;
    pickedQuestions: IQuestionAnswerDto[];
    onChange?: (questions: IQuestionAnswerDto[]) => void;
};

const QuestionPickerCard: React.FC<QuestionPickerCardProps> = ({
    data,
    questionNo,
    pickedQuestions,
    onChange,
}) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "assessment");

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
                            {t("common:question")} {questionNo + 1}:
                        </p>
                        <div
                            className="inline-block"
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(parsedContent.name),
                            }}
                        ></div>
                    </h3>
                    <LazyMotion features={domAnimation}>
                        <AnimatePresence>
                            {showDetail && (
                                <m.div
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
                                                            checked={
                                                                answer.correct
                                                            }
                                                            value={answer.name}
                                                            name="question1-answer"
                                                            className={`${styles.answer__input}`}
                                                            readOnly
                                                        />
                                                        <label
                                                            htmlFor={`answerno-${index}-${parsedContent.name}`}
                                                            className={`${styles.answer__label}`}
                                                            dangerouslySetInnerHTML={{
                                                                __html: sanitizeHtml(
                                                                    answer.name
                                                                ),
                                                            }}
                                                        ></label>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                                    {parsedContent.type === "essay" &&
                                        parsedContent.description && (
                                            <div>
                                                <h4 className="font-medium text-sm mb-1">
                                                    {t("common:description")}
                                                </h4>
                                                <p
                                                    dangerouslySetInnerHTML={{
                                                        __html: sanitizeHtml(
                                                            parsedContent.description
                                                        ),
                                                    }}
                                                    className="md:col-span-1 text-sm text-gray-600"
                                                ></p>
                                            </div>
                                        )}
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm text-gray-500">
                                            {t("common:difficulty")}:
                                        </h4>
                                        <span>
                                            <DifficultyBadge
                                                difficulty={data.difficulty}
                                            />
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                                        <h4 className="text-sm text-gray-500">
                                            {t("common:tags")}:
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
                                </m.div>
                            )}
                        </AnimatePresence>
                    </LazyMotion>
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

export default QuestionPickerCard;
