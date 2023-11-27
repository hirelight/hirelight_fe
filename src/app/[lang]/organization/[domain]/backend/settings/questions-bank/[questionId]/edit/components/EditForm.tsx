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
import LoadingIndicator from "@/components/LoadingIndicator";

import AddQuestionTagModal from "../../../create-question/components/AddQuestionTagModal";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => (
        <div className="min-h-[200px] border border-gray-200 rounded-sm"></div>
    ),
});
type EditQuestionFormProps = {
    questionId: string;
};

const EditQuestionForm: React.FC<EditQuestionFormProps> = ({ questionId }) => {
    const router = useRouter();
    const { lang } = useParams();

    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: (updateDto: IEditQuestionAnswerDto) =>
            questionAnswerServices.editAsync(updateDto),
        onSuccess: async res => {
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["questions"] });
            router.replace(`/${lang}/backend/settings/questions-bank`);
        },
        onError: err => {
            console.error(err);
            toast.error("Update question failure");
        },
    });

    const [showAddTag, setShowAddTag] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState<
        Omit<IQuestionAnswerDto, "content"> & {
            content: QuestionAnswerContentJson;
        }
    >({
        id: "",
        updaterId: "",
        organizationId: "",
        content: {
            name: "",
            type: "one-answer",
            description: "",
            answers: [],
        },
        difficulty: 0,
        tagList: [],
        createdTime: new Date(),
        updatedTime: new Date(),
        status: "",
    });

    const [formErr, setFormErr] = useState({
        difficultyErr: "",
        tagListErr: "",
        contentErr: {
            nameErr: "",
            typeErr: "",
            answersErr: "",
            correctAnswer: "",
        },
    });

    const { data: tagListRes, error } = useQuery({
        queryKey: ["question-tags"],
        queryFn: questionAnswerServices.getTagListAsync,
    });

    const handleModifyTagList = (value: IQuestionTagDto) => {
        const isExisting = formState.tagList.find(tag => tag.id === value.id);
        if (isExisting)
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

    const handleSwitchType = (
        value: "one-answer" | "multiple-answers" | "essay"
    ) => {
        setFormState({
            ...formState,
            content: {
                ...formState.content,
                type: value,
                answers: formState.content.answers.map(i => ({
                    ...i,
                    correct: false,
                })),
            },
        });
    };

    const validateForm = (
        data: Omit<IQuestionAnswerDto, "content"> & {
            content: QuestionAnswerContentJson;
        }
    ): boolean => {
        const err = {
            difficultyErr: "",
            tagListErr: "",
            contentErr: {
                nameErr: "",
                typeErr: "",
                answersErr: "",
                correctAnswer: "",
            },
        };
        if (data.difficulty === 0)
            err.difficultyErr = "Difficulty must between 1 and 5";

        if (data.content.name === "")
            err.contentErr.nameErr = "Question name required!";

        if (data.content.type.toString() === "")
            err.contentErr.typeErr = "Select at least one type of question!";

        if (
            data.content.type === "one-answer" ||
            data.content.type === "multiple-answers"
        ) {
            if (data.content.answers.length < 2)
                err.contentErr.answersErr =
                    "At least 2 answer for multiple choice question";
            if (data.content.answers.every(ans => ans.correct === false))
                err.contentErr.correctAnswer =
                    "Select at least on correct answer";
        }

        let isErr = false;
        function checkIfErr(val: any) {
            for (let i = 0; i < Object.keys(val).length; i++) {
                if (typeof val[Object.keys(val)[i]] === "object")
                    checkIfErr(val[Object.keys(val)[i]]);
                else if (val[Object.keys(val)[i]] !== "") {
                    isErr = true;
                    break;
                }
            }
        }
        checkIfErr(err);
        setFormErr(err);
        return isErr;
    };

    const handleEditQuestion = async (e: FormEvent) => {
        e.preventDefault();

        if (validateForm(formState)) return;
        updateMutation.mutate({
            ...formState,
            content: JSON.stringify(formState.content),
            tagIdList: formState.tagList.map(item => item.id),
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

    useEffect(() => {
        const getQuestionById = async () => {
            setIsLoading(true);
            try {
                const res =
                    await questionAnswerServices.getByIdAsync(questionId);
                setFormState({
                    ...res.data,
                    content: JSON.parse(res.data.content),
                });
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        getQuestionById();
    }, [questionId]);

    if (isLoading)
        return (
            <div className="p-6 flex justify-center items-center">
                <LoadingIndicator />
            </div>
        );

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
                        value={QuestionDifficulty[formState.difficulty - 1]}
                        onChange={value => {
                            setFormState({
                                ...formState,
                                difficulty: value.value,
                            });
                            setFormErr({
                                ...formErr,
                                difficultyErr: "",
                            });
                        }}
                    />
                    {formErr.difficultyErr && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Op, snapp!</span>
                            {formErr.difficultyErr}
                        </p>
                    )}
                </div>
                <div className="mb-4">
                    <Selection
                        title="Type"
                        items={Array.from(QuestionTypes.entries()).map(
                            ([key, value]) => ({ label: value, value: key })
                        )}
                        value={QuestionTypes.get(formState.content.type)}
                        onChange={(value: any) => {
                            handleSwitchType(value);
                            setFormErr({
                                ...formErr,
                                contentErr: {
                                    ...formErr.contentErr,
                                    typeErr: "",
                                },
                            });
                        }}
                    />
                    {formErr.contentErr.typeErr && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Op, snapp!</span>
                            {formErr.contentErr.typeErr}
                        </p>
                    )}
                </div>

                <div className="mb-4 flex gap-4">
                    <Selection
                        title="Tags"
                        placeholder="Example: Frontend, C#, Spring,..."
                        multiple={true}
                        value={formState.tagList.map(tag => tag.name)}
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
                        onChange={content => {
                            setFormState(prev => ({
                                ...prev,
                                content: { ...prev.content, name: content },
                            }));
                            setFormErr({
                                ...formErr,
                                contentErr: {
                                    ...formErr.contentErr,
                                    nameErr: "",
                                },
                            });
                        }}
                    />
                    {formErr.contentErr.nameErr && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Op, snapp!</span>
                            {formErr.contentErr.nameErr}
                        </p>
                    )}
                </div>

                {formState.content.type === "essay" && (
                    <div className="mb-6">
                        <label className="text-neutral-700 text-sm font-semibold block mb-2">
                            Description{" "}
                            <span className="text-gray-500 mr-1 font-normal">
                                (Optional)
                            </span>
                        </label>
                        <QuillEditorNoSSR
                            className="min-h-[200px]"
                            value={formState.content.description}
                            onChange={content =>
                                setFormState(prev => ({
                                    ...prev,
                                    content: {
                                        ...prev.content,
                                        description: content,
                                    },
                                }))
                            }
                        />
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {formState.content.type !== "essay" &&
                        formState.content.answers.map((answer, index) => {
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
                                                handleSelectCorrectAnswer(
                                                    e,
                                                    index
                                                );
                                                setFormErr({
                                                    ...formErr,
                                                    contentErr: {
                                                        ...formErr.contentErr,
                                                        correctAnswer: "",
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
                                        placeholder={`Answer number ${
                                            index + 1
                                        }`}
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
                    {formErr.contentErr.answersErr && (
                        <p className="md:col-span-2 mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Op, snapp!</span>
                            {formErr.contentErr.answersErr}
                        </p>
                    )}
                    {formErr.contentErr.correctAnswer && (
                        <p className="md:col-span-2 mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">Op, snapp!</span>
                            {formErr.contentErr.answersErr}
                        </p>
                    )}
                </div>
                <div className="flex gap-2 justify-between">
                    {formState.content.type !== "essay" && (
                        <Button
                            type="button"
                            onClick={() => {
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
                                }));
                                setFormErr({
                                    ...formErr,
                                    contentErr: {
                                        ...formErr.contentErr,
                                        answersErr: "",
                                    },
                                });
                            }}
                        >
                            Add more answer
                        </Button>
                    )}
                    <div>
                        <ButtonOutline
                            type="button"
                            onClick={() => router.back()}
                            className="mr-2"
                        >
                            Cancel
                        </ButtonOutline>
                        <Button
                            type="submit"
                            isLoading={updateMutation.isPending}
                        >
                            Save changes
                        </Button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default EditQuestionForm;
