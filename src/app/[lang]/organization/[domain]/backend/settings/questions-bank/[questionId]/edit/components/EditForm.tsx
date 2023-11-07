"use client";

import React, { FormEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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
    IEditQuestionAnswerDto,
    IQuestionAnswerDto,
    IQuestionTagDto,
} from "@/services/questions/questions.interface";
import {
    QuestionAnswerContentJson,
    QuestionDifficulty,
    QuestionTypes,
} from "@/interfaces/questions.interface";

import AddQuestionTagModal from "../../../create-question/components/AddQuestionTagModal";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => (
        <div className="min-h-[200px] border border-gray-200 rounded-sm"></div>
    ),
});
type EditQuestionFormProps = {
    data: IQuestionAnswerDto;
};

const EditQuestionForm: React.FC<EditQuestionFormProps> = ({ data }) => {
    const router = useRouter();
    const { lang } = useParams();

    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: (updateDto: IEditQuestionAnswerDto) =>
            questionAnswerServices.editAsync(updateDto),
        onSuccess: async res => {
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["questions"] });
            await delayFunc(500);
            router.replace(`/${lang}/backend/settings/questions-bank`);
        },
        onError: err => {
            console.error(err);
            toast.error("Update question failure");
        },
    });

    const [showAddTag, setShowAddTag] = useState(false);
    const [formState, setFormState] = useState<
        Omit<IQuestionAnswerDto, "content"> & {
            content: QuestionAnswerContentJson;
        }
    >({
        ...data,
        content: JSON.parse(data.content) as QuestionAnswerContentJson,
    });

    const { data: tagListRes, error } = useQuery({
        queryKey: ["question-tags"],
        queryFn: questionAnswerServices.getTagListAsync,
    });

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

    const handleEditQuestion = async (e: FormEvent) => {
        e.preventDefault();

        updateMutation.mutate({
            ...formState,
            content: JSON.stringify(formState.content),
            tagIdList: formState.tagList.map(item => item.id),
        });
    };

    return (
        <>
            <Portal>
                <AddQuestionTagModal
                    isOpen={showAddTag}
                    onClose={() => setShowAddTag(false)}
                />
            </Portal>
            <form onSubmit={handleEditQuestion}>
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
                    />
                </div>

                <div className="mb-4 flex gap-4">
                    <Selection
                        title="Tags"
                        placeholder="Example: Frontend, C#, Spring,..."
                        multiple={true}
                        value={data.tagList.map(tag => tag.name)}
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
                    {formState.content.answers.map((answer, index) => {
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
                                        name="question-answers"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        checked={answer.correct}
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
                                    value={answer.name}
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
                        <Button type="submit">Save changes</Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditQuestionForm;
