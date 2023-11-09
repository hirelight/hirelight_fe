"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";

import questionAnsSetServices from "@/services/question-sets/question-sets.service";

import QuestionSetCard from "./QuestionSetCard";

const QuestionSetList = () => {
    const { data } = useQuery({
        queryKey: ["question-sets"],
        queryFn: questionAnsSetServices.getListAsync,
    });
    return (
        <ul className="flex flex-col gap-4">
            {data?.data.map(item => (
                <li key={item.id}>
                    <QuestionSetCard
                        data={{
                            ...item,
                            questions: JSON.parse(item.content),
                        }}
                    />
                </li>
            ))}
        </ul>
    );
};

export default QuestionSetList;
