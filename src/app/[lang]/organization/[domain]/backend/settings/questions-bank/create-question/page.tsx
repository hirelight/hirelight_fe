"use client";

import React, { FormEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

import {
    Button,
    ButtonOutline,
    CustomInput,
    Portal,
    Selection,
} from "@/components";
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
import { checkResErr } from "@/helpers";

import AddQuestionTagModal from "./components/AddQuestionTagModal";

const templateFile = `http://${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/questions-template.xlsx`;

const initialAnswers = new Array(4).fill({
    name: "",
    correct: false,
});

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
            answers: initialAnswers,
        },
        difficulty: 1,
        tagList: [],
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

    const validateForm = (data: CreateQuestionForm): boolean => {
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

    const handleSwitchType = (
        value: "one-answer" | "multiple-answers" | "essay"
    ) => {
        setFormState({
            ...formState,
            content: {
                ...formState.content,
                type: value,
            },
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
        if (formState.content.answers.length > 2)
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

        if (validateForm(formState)) return;
        createMutation.mutate({
            ...formState,
            content: JSON.stringify(formState.content),
            tagIdList: formState.tagList.map(tag => tag.id),
        });
    };

    const handleUploadQuestions = async (file: File) => {
        const formData = new FormData();

        formData.append("formFile", file);

        try {
            const res =
                await questionAnswerServices.uploadQuestionsAsync(formData);
            toast.success(res.message);
        } catch (error) {
            console.error(error);
        }
    };

    const downloadFileAtUrl = () => {
        const fileName = templateFile.split("/").pop();
        const aTag = document.createElement("a");
        aTag.href = templateFile;
        aTag.setAttribute("download", fileName!!);
        document.body.appendChild(aTag);

        aTag.click();
        aTag.remove();
    };

    return (
        <>
            <form
                onSubmit={handleCreateQuestion}
                className="w-full bg-white rounded-md shadow-md p-4 xl:px-6"
            >
                <h1 className="text-xl text-blue_primary_800 font-semibold text-center mb-4 relative">
                    Create multiple choice question
                    {/* <button
                        type="button"
                        className="w-6 h-6 absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer target:"
                        onClick={customImageHandler}
                    >
                        <ArrowUpTrayIcon />
                    </button> */}
                    <div className="flex gap-4 absolute top-1/2 right-0 -translate-y-1/2">
                        <button
                            type="button"
                            onClick={downloadFileAtUrl}
                            className="w-6 h-6 block"
                        >
                            <ArrowDownTrayIcon />
                        </button>
                        <label className="w-6 h-6 block">
                            <ArrowUpTrayIcon />
                            <input
                                type="file"
                                className="sr-only"
                                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                onChange={e => {
                                    const files = e.target.files;
                                    if (files) handleUploadQuestions(files[0]);
                                }}
                            />
                        </label>
                    </div>
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
                        required
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
                        formState.content.answers?.map((item, index) => {
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
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            checked={item.correct}
                                            onChange={e =>
                                                handleSelectCorrectAnswer(
                                                    e,
                                                    index
                                                )
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
                                        placeholder={`Answer number ${
                                            index + 1
                                        }`}
                                        value={item.name}
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
