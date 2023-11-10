"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import questionAnswerServices from "@/services/questions/questions.service";
import { SearchIcon } from "@/icons";
import {
    QuestionAnswerContentJson,
    QuestionDifficulty,
} from "@/interfaces/questions.interface";
import { IQuestionAnswerDto } from "@/services";
import { Button, ButtonOutline } from "@/components";

import QuestionPickerCard from "./QuestionPickerCard";
import styles from "./styles.module.scss";

type QuestionPickerProps = {
    pickedQuestions: IQuestionAnswerDto[];
    onPickedChange: (questions: IQuestionAnswerDto[]) => void;
};

const QuestionPicker: React.FC<QuestionPickerProps> = ({
    pickedQuestions,
    onPickedChange,
}) => {
    const { data: questionsRes, error } = useQuery({
        queryKey: ["questions"],
        queryFn: questionAnswerServices.getListAsync,
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
                <div className="relative rounded-md shadow-sm">
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
            </div>
            <ul className={styles.set__list__wrapper}>
                {questionsRes?.data
                    ?.filter(item => filterOnSearch(item))
                    .map((item, index) => (
                        <li key={item.id}>
                            <QuestionPickerCard
                                data={item}
                                questionNo={index}
                                pickedQuestions={curPicks}
                                onChange={questions => setCurPicks(questions)}
                            />
                        </li>
                    ))}
            </ul>
            <div>
                <Button
                    className="mr-4"
                    onClick={() => onPickedChange(curPicks)}
                >
                    Save
                </Button>
                <ButtonOutline>Cancel</ButtonOutline>
            </div>
        </>
    );
};

export default QuestionPicker;
