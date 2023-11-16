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
import { AnimatePresence, motion } from "framer-motion";

import { IQuestionAnswerDto } from "@/services/questions/questions.interface";
import {
    QuestionAnswerContentJson,
    QuestionDifficulty,
    QuestionTypes,
} from "@/interfaces/questions.interface";
import questionAnswerServices from "@/services/questions/questions.service";
import { DeleteModal, Portal } from "@/components";

import styles from "./QuestionCard.module.scss";

const answers = [
    "Hyper Text Markup Language",
    "High Tech Modern Language",
    "Hyperlink and Text Markup Language",
    "Hyperlink Text Mode Language",
];

type QuestionCardProps = {
    data: IQuestionAnswerDto;
    index: number;
};

const QuestionCard: React.FC<QuestionCardProps> = ({ data, index }) => {
    const { content, tagList, difficulty, id } = data;
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
            console.error(err);
            toast.error("Delete question failure");
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
                    onClose={() => setShowDeleteAlert(false)}
                    onConfirm={() => handleDeleteQuestion(id)}
                />
            </Portal>
            <div id={id} className="bg-white p-4 flex items-stretch">
                <div className="flex-1">
                    <h3 className="text-neutral-700 font-semibold mb-4 flex flex-wrap gap-1">
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
                        <div className={`grid grid-cols-1 gap-4`}>
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
                                        id={`answer-${index}-${id}`}
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
                                        htmlFor={`answer-${index}-${id}`}
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
            </div>
        </>
    );
};

export default QuestionCard;
