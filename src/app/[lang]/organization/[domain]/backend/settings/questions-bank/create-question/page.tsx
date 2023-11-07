"use client";

import React, { FormEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "@heroicons/react/24/outline";

import {
    Button,
    ButtonOutline,
    CustomInput,
    Portal,
    Selection,
} from "@/components";
import { delayFunc } from "@/helpers/shareHelpers";
import questionAnswerServices from "@/services/questions/questions.service";
import {
    ICreateQuestionDto,
    IQuestionTagDto,
} from "@/services/questions/questions.interface";
import {
    CreateQuestionForm,
    QuestionDifficulty,
    QuestionTypes,
} from "@/interfaces/questions.interface";
import { IResponse } from "@/interfaces/service.interface";
import { checkResErr } from "@/helpers";

import AddQuestionTagModal from "./components/AddQuestionTagModal";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => (
        <div className="min-h-[200px] border border-gray-200 rounded-sm"></div>
    ),
});

const CreateQuestionPage = () => {
    const { lang } = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: (createDto: ICreateQuestionDto) =>
            questionAnswerServices.createAsync(createDto),
        onSuccess: res => {
            checkResErr(res);
            toast.success(res.message);

            setFormState({
                content: {
                    name: "",
                    type: "one-answer",
                    answers: new Array(4).fill({
                        name: "",
                        correct: false,
                    }),
                },
                difficulty: 1,
                tagList: [],
            });

            queryClient.invalidateQueries({ queryKey: ["questions"] });
            router.push(`/${lang}/backend/settings/questions-bank`);
        },
        onError: err => {
            console.error(err);
            toast.error("Create question failure");
        },
    });

    const { data: tagListRes, error } = useQuery({
        queryKey: ["question-tags"],
        queryFn: questionAnswerServices.getTagListAsync,
    });
    const [showAddTag, setShowAddTag] = useState(false);
    const [formState, setFormState] = useState<CreateQuestionForm>({
        content: {
            name: "",
            type: "one-answer",
            answers: new Array(4).fill({
                name: "",
                correct: false,
            }),
        },
        difficulty: 0,
        tagList: [],
    });

    const [formErr, setFormErr] = useState({
        difficultyErr: "",
        tagListErr: "",
        contentErr: {
            nameErr: "",
            typeErr: "",
        },
    });

    const validateForm = () => {};

    const handleModifyTagList = (value: IQuestionTagDto) => {
        const isExisting = formState.tagList.indexOf(value);

        if (isExisting !== -1)
            setFormState({
                ...formState,
                tagList: formState.tagList.filter(item => item.id !== value.id),
            });
        else
            setFormState({
                ...formState,
                tagList: formState.tagList.concat([value]),
            });
    };

    const handleSelectCorrectAnswer = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        setFormState({
            ...formState,
            content: {
                ...formState.content,
                answers: formState.content.answers.map(
                    (answer, answerIndex) => {
                        if (answerIndex === index)
                            return {
                                ...answer,
                                correct: e.currentTarget.checked,
                            };
                        return answer;
                    }
                ),
            },
        });
    };

    const handleDeleteAnswer = (index: number) => {
        if (formState.content.answers.length > 4)
            setFormState(prev => ({
                ...prev,
                content: {
                    ...prev.content,
                    answers: prev.content.answers.filter(
                        (_, ansIndex) => ansIndex !== index
                    ),
                },
            }));
        else alert("Question has at least 4 answers");
    };

    const handleCreateQuestion = async (e: FormEvent) => {
        e.preventDefault();

        createMutation.mutate({
            ...formState,
            content: JSON.stringify(formState.content),
            tagIdList: formState.tagList.map(tag => tag.id),
        });
    };

    return (
        <>
            <form
                onSubmit={handleCreateQuestion}
                className="w-full bg-white rounded-md shadow-md p-4 xl:px-6"
            >
                <h1 className="text-xl text-blue_primary_800 font-semibold text-center mb-4">
                    Create multiple choice question
                </h1>

                <div className="mb-4">
                    <Selection
                        title="Difficulty"
                        items={QuestionDifficulty.map((item, index) => ({
                            label: item,
                            value: {
                                name: item,
                                value: index + 1,
                            },
                        }))}
                        required
                        value={QuestionDifficulty[formState.difficulty]}
                        onChange={value =>
                            setFormState({
                                ...formState,
                                difficulty: value.value,
                            })
                        }
                    />
                </div>
                <div className="mb-4">
                    <Selection
                        title="Type"
                        items={Array.from(QuestionTypes.entries()).map(
                            ([key, value]) => ({ label: value, value: key })
                        )}
                        value={QuestionTypes.get(formState.content.type)}
                        onChange={value =>
                            setFormState({
                                ...formState,
                                content: {
                                    ...formState.content,
                                    type: value as
                                        | "one-answer"
                                        | "multiple-answers",
                                },
                            })
                        }
                        required
                    />
                </div>

                <div className="mb-4 flex gap-4">
                    <Selection
                        title="Tags"
                        multiple={true}
                        placeholder="Example: Frontend, C#, Spring,..."
                        items={
                            tagListRes?.data.map(item => ({
                                label: item.name,
                                value: item,
                            })) ?? []
                        }
                        onChange={handleModifyTagList}
                    />

                    <button
                        type="button"
                        className="rounded-md h-[42px] aspect-square flex items-center justify-center self-end border-2 border-blue_primary_600 text-blue_primary_600 hover:bg-blue_primary_700 hover:border-blue_primary_700 hover:text-white transition-all"
                        onClick={() => setShowAddTag(true)}
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                </div>

                <div className="mb-6">
                    <label className="text-neutral-700 text-sm font-semibold block mb-2">
                        <span className="text-red-500 mr-1">*</span> Question
                    </label>
                    <QuillEditorNoSSR
                        className="min-h-[200px]"
                        value={formState.content.name}
                        onChange={content =>
                            setFormState(prev => ({
                                ...prev,
                                content: { ...prev.content, name: content },
                            }))
                        }
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {formState.content.answers.map((item, index) => {
                        return (
                            <div key={index} className="mb-4">
                                <div className="flex items-center mb-4">
                                    <input
                                        id={`answer-${index}`}
                                        type={
                                            formState.content.type ===
                                            "one-answer"
                                                ? "radio"
                                                : "checkbox"
                                        }
                                        value={index}
                                        name="default-radio"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        checked={item.correct}
                                        onChange={e =>
                                            handleSelectCorrectAnswer(e, index)
                                        }
                                    />
                                    <label
                                        htmlFor={`answer-${index}`}
                                        className="flex-1 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Answer number {index + 1}
                                    </label>
                                    {index > 3 && (
                                        <button
                                            type="button"
                                            onClick={handleDeleteAnswer.bind(
                                                null,
                                                index
                                            )}
                                        >
                                            <TrashIcon className="w-5 h-5 text-red-500" />
                                        </button>
                                    )}
                                </div>
                                <QuillEditorNoSSR
                                    className="min-h-[150px]"
                                    placeholder={`Answer number ${index + 1}`}
                                    onChange={content =>
                                        setFormState({
                                            ...formState,
                                            content: {
                                                ...formState.content,
                                                answers:
                                                    formState.content.answers.map(
                                                        (
                                                            answer,
                                                            answerIndex
                                                        ) => {
                                                            if (
                                                                answerIndex ===
                                                                index
                                                            )
                                                                return {
                                                                    ...answer,
                                                                    name: content,
                                                                };
                                                            return answer;
                                                        }
                                                    ),
                                            },
                                        })
                                    }
                                />
                            </div>
                        );
                    })}
                </div>

                <div className="flex gap-2 justify-between">
                    <Button
                        type="button"
                        onClick={() =>
                            setFormState(prev => ({
                                ...prev,
                                content: {
                                    ...prev.content,
                                    answers: prev.content.answers.concat([
                                        {
                                            name: "",
                                            correct: false,
                                        },
                                    ]),
                                },
                            }))
                        }
                    >
                        Add more answer
                    </Button>
                    <div>
                        <Link
                            href={"/en/backend/settings/questions-bank"}
                            className="mr-2"
                        >
                            <ButtonOutline type="button">Cancel</ButtonOutline>
                        </Link>
                        <Button type="submit">Save</Button>
                    </div>
                </div>
            </form>
            <Portal>
                <AddQuestionTagModal
                    isOpen={showAddTag}
                    onClose={() => setShowAddTag(false)}
                />
            </Portal>
        </>
    );
};

export default CreateQuestionPage;
