"use client";

import React, { useCallback, useRef } from "react";
import Link from "next/link";
import moment from "moment";

import { CountdownTimer } from "@/components";
import {
    ICandidateMCDto,
    QuestionAnswerContentJson,
} from "@/interfaces/questions.interface";
import { getReturnValues } from "@/components/CountdownTimer/useCountDown";
import { hhmmss } from "@/helpers";
import { ApplicantAssessmentDetailStatus } from "@/interfaces/assessment.interface";

import QuestionCard from "./QuestionCard";
import { useMultipleChoiceAssessment } from "./MultipleChoiceAssessment";

const QuestionList = () => {
    const { assesmentData, answers, handleSubmitTest } =
        useMultipleChoiceAssessment();

    const targetDate = useRef<Date>(
        moment
            .utc(assesmentData?.startTime)
            .add(assesmentData?.assessment.duration, "s")
            .toDate()
    );

    const onEnd = useCallback(() => {
        handleSubmitTest();
    }, [handleSubmitTest]);

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
                <div className="text-center text-xl font-semibold">
                    {assesmentData?.status ===
                    ApplicantAssessmentDetailStatus.IN_PROGRESS ? (
                        <CountdownTimer
                            targetDate={targetDate.current ?? new Date()}
                            onEnd={onEnd}
                        />
                    ) : (
                        <div>
                            {hhmmss(
                                moment
                                    .utc(assesmentData?.startTime)
                                    .add(1800, "s")
                                    .diff(
                                        moment.utc(assesmentData?.updatedTime),
                                        "seconds"
                                    )
                            )}
                        </div>
                    )}
                </div>
                <div className="bg-white p-4 rounded-md shadow-md grid grid-cols-5 gap-2">
                    {answers.map((item, index) => {
                        let haveAns = false;
                        if (
                            (
                                JSON.parse(
                                    item.content
                                ) as QuestionAnswerContentJson
                            ).answers.some(ans => ans.isChosen)
                        )
                            haveAns = true;
                        return (
                            <Link
                                key={item.id}
                                href={`#${item.id}`}
                                className={`p-2 rounded-md text-sm  flex justify-center items-center ${
                                    haveAns ? "bg-blue-200" : "bg-slate-100"
                                }`}
                            >
                                <span className="font-semibold text-sm">
                                    {index + 1}
                                </span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuestionList;
