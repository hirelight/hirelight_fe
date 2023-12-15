"use client";

import React from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import questionAnswerServices from "@/services/questions/questions.service";

import QuestionCard from "./QuestionCard";
import Pagination from "./Pagination";
import QuestionSkeleton from "./QuestionSkeleton";

type QuestionListProps = {};

const QuestionList: React.FC<QuestionListProps> = ({}) => {
    const {
        data: res,
        error,
        isLoading,
    } = useQuery({
        queryKey: ["questions"],
        queryFn: questionAnswerServices.getListAsync,
    });
    if (error) toast.error("Fetch question failure");

    if (isLoading)
        return (
            <ul className="flex flex-col gap-2 mb-6">
                {new Array(4).fill("").map((_, index) => (
                    <li key={index}>
                        <QuestionSkeleton />
                    </li>
                ))}
            </ul>
        );

    return (
        <>
            <ul className="flex flex-col gap-2 mb-6">
                {res?.data?.map((item, index) => (
                    <li key={item.id}>
                        <QuestionCard data={item} index={index} />
                    </li>
                ))}
            </ul>
            {/* {res?.data && res.data.length > 10 && <Pagination />} */}
        </>
    );
};

export default QuestionList;
