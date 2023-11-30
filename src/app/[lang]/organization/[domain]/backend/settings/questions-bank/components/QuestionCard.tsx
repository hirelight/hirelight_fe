"use client";

import React, { useMemo, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
    PencilIcon as PencilSolid,
    TrashIcon as TrashSolid,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { IQuestionAnswerDto } from "@/services/questions/questions.interface";
import {
    QuestionAnswerContentJson,
    QuestionDifficulty,
    QuestionTypes,
} from "@/interfaces/questions.interface";
import questionAnswerServices from "@/services/questions/questions.service";
import { DeleteModal, Portal } from "@/components";

import styles from "./QuestionCard.module.scss";

type QuestionCardProps = {
    data: IQuestionAnswerDto;
    index: number;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ data, index }) => {
    const { content, tagList, difficulty, id, organizationId } = data;
    const parsedContent = useMemo(
        () => JSON.parse(content),
        [content]
    ) as QuestionAnswerContentJson;

    const queryClient = useQueryClient();
    const deleteMutation = useMutation({
        mutationFn: (id: string) => questionAnswerServices.deleteByIdAsync(id),
        onSuccess: res => {
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["questions"] });
        },
        onError: err => {
            toast.error(err.message ? err.message : "Delete question failure");
        },
    });

    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    const handleDeleteQuestion = async (id: string) => {
        deleteMutation.mutate(id);
    };

    return (
        <>
            <Portal>
                <DeleteModal
                    title="Delete question"
                    description="Are you sure you want to delete this question? All of your data will be permanently removed. This action cannot be undone."
                    show={showDeleteAlert}
                    loading={deleteMutation.isPending}
                    onClose={() => setShowDeleteAlert(false)}
                    onConfirm={() => handleDeleteQuestion(id)}
                />
            </Portal>
            <div className="bg-white p-4 flex items-stretch">
                <div className="flex-1">
                    <h3 className="text-neutral-700 font-semibold mb-4 flex gap-1">
                        <p className="whitespace-nowrap">
                            Question {index + 1}:{" "}
                        </p>
                        <span
                            dangerouslySetInnerHTML={{
                                __html: parsedContent.name,
                            }}
                        ></span>
                    </h3>
                    {parsedContent.type !== "essay" && (
                        <div
                            className={`grid grid-cols-1 md:grid-cols-${
                                parsedContent.answers.length > 4 ? 1 : 2
                            } gap-6`}
                        >
                            {parsedContent.answers?.map((answer, index) => (
                                <div
                                    key={index}
                                    className={`${styles.answer__wrapper}`}
                                >
                                    <input
                                        type={
                                            parsedContent.type === "one-answer"
                                                ? "radio"
                                                : "checkbox"
                                        }
                                        checked={answer.correct}
                                        name={
                                            parsedContent.type === "one-answer"
                                                ? id
                                                : answer.name
                                        }
                                        value={answer.name}
                                        className={`${styles.answer__input}`}
                                        readOnly
                                    />
                                    <label
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
                    )}
                    {parsedContent.type === "essay" &&
                        parsedContent.description && (
                            <p
                                dangerouslySetInnerHTML={{
                                    __html: parsedContent.description,
                                }}
                                className="md:col-span-1 text-sm text-gray-600"
                            ></p>
                        )}
                </div>
                <div className="hidden h-20 w-[1px] mx-6 self-center md:block"></div>
                <div className="w-[200px] text-sm text-neutral-500 flex flex-col">
                    <p className="font-semibold mb-2">
                        Type:{" "}
                        <span className="font-normal">
                            {QuestionTypes.get(parsedContent.type)}
                        </span>
                    </p>
                    <p className="font-semibold mb-2">
                        Difficulty:{" "}
                        <span className="font-normal">
                            {QuestionDifficulty[difficulty - 1]}
                        </span>
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
                    <div className="flex gap-4 mt-10">
                        {organizationId ? (
                            <>
                                <Link
                                    href={`questions-bank/${id}/edit`}
                                    className="group"
                                >
                                    <PencilIcon className="w-5 h-5 text-blue_primary_700 group-hover:hidden" />

                                    <PencilSolid className="w-5 h-5 hidden text-blue_primary_700 group-hover:block" />
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => setShowDeleteAlert(true)}
                                    className="group"
                                >
                                    <TrashIcon className="w-5 h-5 text-red-500 group-hover:hidden" />
                                    <TrashSolid className="w-5 h-5 text-red-500 hidden group-hover:block" />
                                </button>
                            </>
                        ) : (
                            <span className="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                Default
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuestionCard;
