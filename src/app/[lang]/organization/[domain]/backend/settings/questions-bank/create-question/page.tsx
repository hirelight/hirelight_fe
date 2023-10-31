"use client";

import React, { FormEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, ButtonOutline, CustomInput, Selection } from "@/components";
import { delayFunc } from "@/helpers/shareHelpers";
import questionAnswerServices from "@/services/questions/questions.service";
import {
    ICreateQuestionDto,
    IQuestionTagDto,
} from "@/services/questions/questions.interface";
import { CreateQuestionForm } from "@/interfaces/questions.interface";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => (
        <div className="min-h-[200px] border border-gray-200 rounded-sm"></div>
    ),
});

const difficulties = ["Easy", "Medium", "Hard", "Advance"];

const CreateQuestionPage = () => {
    const { lang } = useParams();
    const router = useRouter();
    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: (createDto: ICreateQuestionDto) =>
            questionAnswerServices.createAsync(createDto),
        onSuccess: res => {
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
                difficulty: 0,
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

    const [tagList, setTagList] = useState<IQuestionTagDto[]>([]);

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
                tagList: [...formState.tagList, value],
            });
    };

    const handleCreateQuestion = async (e: FormEvent) => {
        e.preventDefault();

        createMutation.mutate({
            ...formState,
            content: JSON.stringify(formState.content),
            tagIdList: formState.tagList.map(tag => tag.id),
        });
    };

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const res = await questionAnswerServices.getTagListAsync();
                console.log(res);
                setTagList(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchTags();
    }, []);

    return (
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
                    items={["Easy", "Medium", "Hard", "Advance"].map(
                        (item, index) => ({
                            label: item,
                            value: {
                                name: item,
                                value: index,
                            },
                        })
                    )}
                    value={difficulties[formState.difficulty]}
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
                    items={[
                        { label: "One answer", value: "one-answer" },
                        {
                            label: "Multiple answers",
                            value: "multiple-answers",
                        },
                    ].map(item => ({
                        label: item.label,
                        value: item,
                    }))}
                    value={formState.content.type}
                    onChange={value =>
                        setFormState({
                            ...formState,
                            content: {
                                ...formState.content,
                                type: value.value as
                                    | "one-answer"
                                    | "multiple-answers",
                            },
                        })
                    }
                />
            </div>

            <div className="mb-4 flex gap-4">
                <Selection
                    title="Tags"
                    placeholder="Example: Frontend, C#, Spring,..."
                    items={tagList.map(item => ({
                        label: item.name,
                        value: item,
                    }))}
                    onChange={handleModifyTagList}
                />

                <button
                    type="button"
                    className="rounded-md h-[42px] aspect-square flex items-center justify-center self-end border-2 border-blue_primary_600 text-blue_primary_600 hover:bg-blue_primary_700 hover:border-blue_primary_700 hover:text-white transition-all"
                >
                    <PlusIcon className="w-5 h-5" />
                </button>
            </div>

            <div className="mb-6">
                <label className="text-neutral-700 text-sm font-semibold block mb-2">
                    Question
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
                                        formState.content.type === "one-answer"
                                            ? "radio"
                                            : "checkbox"
                                    }
                                    value={index}
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    checked={item.correct}
                                    onChange={e => {
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
                                                                    correct:
                                                                        e
                                                                            .currentTarget
                                                                            .checked,
                                                                };
                                                            return answer;
                                                        }
                                                    ),
                                            },
                                        });
                                    }}
                                />
                                <label
                                    htmlFor={`answer-${index}`}
                                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                >
                                    Answer number {index + 1}
                                </label>
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
                                                    (answer, answerIndex) => {
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

            <div className="flex gap-2 justify-end">
                <Link href={"/en/backend/settings/questions-bank"}>
                    <ButtonOutline type="button">Cancel</ButtonOutline>
                </Link>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
};

export default CreateQuestionPage;
