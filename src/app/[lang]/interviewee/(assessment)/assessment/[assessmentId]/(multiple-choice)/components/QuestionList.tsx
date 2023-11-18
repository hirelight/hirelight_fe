"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Link from "next/link";

import questionAnswerServices from "@/services/questions/questions.service";
import { Pagination } from "@/components";
import {
    ICandidateMCContentJson,
    ICandidateMCDto,
} from "@/interfaces/questions.interface";

import QuestionCard from "./QuestionCard";
import { useMultipleChoiceAssessment } from "./MultipleChoiceAssessment";

const QuestionList = () => {
    const { assesmentData, answers } = useMultipleChoiceAssessment();
    const questions = JSON.parse(
        assesmentData!!.questionAnswerSet
    ) as ICandidateMCDto[];
    return (
        <div className="flex gap-6 relative">
            <ul className="space-y-4 mb-6">
                {answers?.map((item, index) => (
                    <li key={item.id}>
                        <QuestionCard data={item} index={index} />
                    </li>
                ))}
            </ul>
            <div className="w-80 h-fit sticky top-4 bg-white border border-gray-200 rounded-md drop-shadow-lg">
                <div className="text-center text-xl font-semibold p-6">
                    <h3>59:30</h3>
                </div>
                <div className="bg-white p-4 rounded-md shadow-md grid grid-cols-5 gap-2">
                    {answers.map((item, index) => (
                        <Link
                            key={item.id}
                            href={`#${item.id}`}
                            className="p-2 rounded-md text-sm bg-slate-100 flex justify-center items-center"
                        >
                            <span className="font-semibold text-sm">
                                {index + 1}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
            {/* {res?.data && res.data.length > 10 && <Pagination />} */}
        </div>
    );
};

export default QuestionList;
