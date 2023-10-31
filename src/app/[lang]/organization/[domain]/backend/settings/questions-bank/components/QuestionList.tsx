"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import questionAnswerServices from "@/services/questions/questions.service";

import QuestionCard from "./QuestionCard";
import Pagination from "./Pagination";

type QuestionListProps = {};

const QuestionList: React.FC<QuestionListProps> = ({}) => {
    const queryClient = useQueryClient();
    const {
        data: res,
        error,
        isFetched,
    } = useQuery({
        queryKey: ["questions"],
        queryFn: questionAnswerServices.getListAsync,
    });

    return (
        <div>
            <ul className="flex flex-col gap-2 mb-6">
                {res?.data?.map((item, index) => (
                    <li key={item.id}>
                        <QuestionCard data={item} index={index} />
                    </li>
                ))}
            </ul>
            <Pagination />
        </div>
    );
};

export default QuestionList;
