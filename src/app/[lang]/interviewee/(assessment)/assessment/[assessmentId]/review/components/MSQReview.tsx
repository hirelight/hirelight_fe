"use client";

import React, { createContext, useRef, useState } from "react";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

import {
    ICandidateMCContentJson,
    ICandidateMCDto,
    QuestionAnswerContentJson,
} from "@/interfaces/questions.interface";
import {
    ICandidateAssessmentDetailDto,
    IMCAppliAssessmentDto,
} from "@/services";
import { hhmmss } from "@/helpers";
import { sanitizeHtml } from "@/helpers/sanitizeHTML";

import styles from "./MSQReview.module.scss";

import logo from "/public/images/logo.svg";

type MCQReviewPageProps = {
    data: ICandidateAssessmentDetailDto;
};

const MCQReviewPage: React.FC<MCQReviewPageProps> = ({ data }) => {
    return (
        <div>
            <div className={styles.banner}>
                <div className="w-40 aspect-square p-6 rounded-full bg-white overflow-hidden drop-shadow-lg">
                    <Image
                        src={logo}
                        alt="Company logo"
                        width={180}
                        height={180}
                        className="w-full h-auto object-cover"
                    />
                </div>
            </div>
            <main className="max-w-screen-xl mx-auto p-4 xl:px-6">
                <div className="mb-4 flex flex-col items-center">
                    <h3 className="text-2xl text-center font-semibold">
                        Assessment {data.assessment.name}
                    </h3>
                    <p className="text-center text-base text-gray-500 font-medium mb-6">
                        {data.applicantProfile.jobPost.title}
                    </p>
                    {/* <div
                        dangerouslySetInnerHTML={{
                            __html: data.assessment.description ?? "",
                        }}
                        className="max-w-[40%]"
                    ></div> */}
                </div>

                <div className={`pointer-events-none`}>
                    <QuestionList
                        assesmentData={data as IMCAppliAssessmentDto}
                        answers={JSON.parse(data.questionAnswerSet!!)}
                    />
                </div>
            </main>
        </div>
    );
};

export default MCQReviewPage;

const QuestionList = ({
    assesmentData,
    answers,
}: {
    assesmentData: IMCAppliAssessmentDto;
    answers: ICandidateMCDto[];
}) => {
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

type QuestionCardProps = {
    data: ICandidateMCDto;
    index: number;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ data, index }) => {
    const { content, tagList, difficulty, id } = data;
    const parsedContent = useRef<ICandidateMCContentJson>(JSON.parse(content));

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
                                __html: sanitizeHtml(
                                    parsedContent.current.name
                                ),
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
                                            readOnly={true}
                                        />
                                        <label
                                            htmlFor={`answer-${index}-${id}`}
                                            className={`${styles.answer__label}`}
                                            dangerouslySetInnerHTML={{
                                                __html: sanitizeHtml(
                                                    answer.name
                                                ),
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
                                    __html: sanitizeHtml(
                                        parsedContent.current.description
                                    ),
                                }}
                                className="md:col-span-1 text-sm text-gray-600"
                            ></p>
                        )}
                </div>
            </div>
        </>
    );
};
