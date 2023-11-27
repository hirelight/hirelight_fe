"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import questionAnswerServices from "@/services/questions/questions.service";
import { MinusBigIcon, SearchIcon } from "@/icons";
import {
    QuestionAnswerContentJson,
    QuestionDifficulty,
} from "@/interfaces/questions.interface";
import { IQuestionAnswerDto } from "@/services";
import { Button, ButtonOutline } from "@/components";

import QuestionPickerCard from "./QuestionPickerCard";
import styles from "./styles.module.scss";

type QuestionPickerProps = {
    query?: {
        type: "one-answer" | "multiple-answers" | "essay";
        video?: any;
    };
    pickedQuestions: IQuestionAnswerDto[];
    onPickedChange: (questions: IQuestionAnswerDto[]) => void;
};

const QuestionPicker: React.FC<QuestionPickerProps> = ({
    query,
    pickedQuestions,
    onPickedChange,
}) => {
    const {
        data: questionsRes,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["questions"],
        queryFn: questionAnswerServices.getListAsync,
        select(data) {
            return data.data.filter(item =>
                query
                    ? (JSON.parse(item.content) as QuestionAnswerContentJson)
                          .type === query.type
                    : true
            );
        },
    });
    const [search, setSearch] = useState("");
    const [curPicks, setCurPicks] = useState<IQuestionAnswerDto[]>([]);

    const filterOnSearch = (question: IQuestionAnswerDto): boolean => {
        const parsedContent = JSON.parse(
            question.content
        ) as QuestionAnswerContentJson;

        return (
            parsedContent.name.toLowerCase().includes(search) ||
            question.tagList.some(tag =>
                tag.name.toLowerCase().includes(search)
            ) ||
            QuestionDifficulty[question.difficulty - 1]
                .toLowerCase()
                .includes(search)
        );
    };

    useEffect(() => {
        setCurPicks(pickedQuestions);
    }, [pickedQuestions]);

    return (
        <>
            <div className="mb-4">
                <label
                    htmlFor={"question-set-search"}
                    className="block mb-2 text-sm font-medium text-neutral-900 dark:text-white"
                >
                    Search
                </label>
                <div className="flex items-center gap-6">
                    <div className="flex-1 relative rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                            <SearchIcon className="w-4 h-4" />
                        </div>
                        <input
                            id="question-set-search"
                            type="text"
                            className="block w-full rounded-md border-0 py-2.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_700 sm:sm:leading-6"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <label className="w-5 h-5 text-sm font-medium text-neutral-900 dark:text-gray-300 pr-9 pl-4 relative">
                        <input
                            id="select-all-candidates"
                            type="checkbox"
                            value="all"
                            checked={curPicks.length > 0}
                            className="absolute w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 cursor-pointer "
                            onChange={e => {
                                if (e.currentTarget.checked && questionsRes) {
                                    setCurPicks(questionsRes);
                                } else {
                                    setCurPicks([]);
                                }
                            }}
                        />

                        {questionsRes &&
                            curPicks.length > 0 &&
                            curPicks.length < questionsRes.length && (
                                <MinusBigIcon
                                    strokeWidth={2.2}
                                    className="absolute w-5 h-5 text-white bg-blue-600 border border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-0 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                                    onClick={() => setCurPicks([])}
                                />
                            )}
                    </label>
                </div>
            </div>
            {!isLoading ? (
                <ul className={styles.set__list__wrapper}>
                    {questionsRes
                        ?.filter(item => filterOnSearch(item))
                        .map((item, index) => (
                            <li key={item.id}>
                                <QuestionPickerCard
                                    data={item}
                                    questionNo={index}
                                    pickedQuestions={curPicks}
                                    onChange={questions =>
                                        setCurPicks(questions)
                                    }
                                />
                            </li>
                        ))}
                </ul>
            ) : (
                <LoadingSkeleton />
            )}
            <div>
                <Button
                    className="mr-4"
                    onClick={() => onPickedChange(curPicks)}
                >
                    Save
                </Button>
                <ButtonOutline onClick={() => onPickedChange(curPicks)}>
                    Cancel
                </ButtonOutline>
            </div>
        </>
    );
};

export default QuestionPicker;

const LoadingSkeleton = () => {
    return (
        <div className="animate-pulse space-y-3 my-4">
            {new Array(8).fill("").map((_, index) => (
                <div key={index} className="flex gap-4">
                    <div className="h-7 w-96 bg-slate-200"></div>
                    <div className="h-7 w-14 bg-slate-200"></div>
                </div>
            ))}
        </div>
    );
};
