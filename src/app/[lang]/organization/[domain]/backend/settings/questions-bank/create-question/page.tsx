"use client";

import React, { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import { Tooltip } from "flowbite-react";
import Link from "next/link";

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
import { checkResErr, handleError } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import AddQuestionTagModal from "./components/AddQuestionTagModal";

const initialAnswers = new Array(4).fill({
    name: "",
    correct: false,
});

const intialData: CreateQuestionForm = {
    content: {
        name: "",
        type: "one-answer",
        answers: initialAnswers,
    },
    difficulty: 1,
    tagList: [],
};

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => (
        <div className="min-h-[200px] border border-gray-200 rounded-sm"></div>
    ),
});

const CreateQuestionPage = () => {
    const { lang } = useParams();
    const router = useRouter();

    const { t } = useI18NextTranslation(lang as I18Locale, "question-bank");

    const queryClient = useQueryClient();
    const createMutation = useMutation({
        mutationFn: (createDto: ICreateQuestionDto) =>
            questionAnswerServices.createAsync(createDto),
        onSuccess: res => {
            checkResErr(res);
            toast.success(res.message);

            setFormState(intialData);

            queryClient.invalidateQueries({ queryKey: ["questions"] });
            router.push(`/${lang}/backend/settings/questions-bank`);
        },
        onError: err => {
            handleError(err);
        },
    });
    const { data: tagListRes, error } = useQuery({
        queryKey: ["question-tags"],
        queryFn: questionAnswerServices.getTagListAsync,
    });
    const [showAddTag, setShowAddTag] = useState(false);
    const [formState, setFormState] = useState<CreateQuestionForm>(intialData);
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
            err.difficultyErr = t("difficulty_between_1_to_5");

        if (data.content.name === "")
            err.contentErr.nameErr = t("question_name_required");

        if (data.content.type.toString() === "")
            err.contentErr.typeErr = t("select_at_least_one_type");

        if (
            data.content.type === "one-answer" ||
            data.content.type === "multiple-answers"
        ) {
            if (data.content.answers.length < 2)
                err.contentErr.answersErr = t("at_least_two_ans_for_mcq");
            if (data.content.answers.every(ans => ans.correct === false))
                err.contentErr.correctAnswer = t("select_at_least_one_correct");
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
        else alert(t("question_has_at_least_4_ans"));
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
            await toast.promise(
                questionAnswerServices.uploadQuestionsAsync(formData),
                {
                    pending: t("uploading_question"),
                    success: t("upload_question_successfully"),
                }
            );
        } catch (error: any) {
            handleError(error);
        }
    };

    return (
        <>
            <form
                onSubmit={handleCreateQuestion}
                className="w-full bg-white rounded-md shadow-md p-4 xl:px-6"
            >
                <h1 className="text-xl text-blue_primary_800 font-semibold text-center mb-4 relative">
                    {t("add_new_question")}
                    <div className="flex gap-4 absolute top-1/2 right-0 -translate-y-1/2">
                        <Tooltip content={t("download_file_template")}>
                            <a
                                href={`/questions-template.xlsx`}
                                download
                                className="w-6 h-6 block"
                            >
                                <ArrowDownTrayIcon />
                            </a>
                        </Tooltip>
                        <Tooltip content={t("upload_ques_file")}>
                            <label className="w-6 h-6 block cursor-pointer">
                                <ArrowUpTrayIcon />
                                <input
                                    type="file"
                                    className="sr-only"
                                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                                    onChange={e => {
                                        const files = e.target.files;
                                        if (files && files.length > 0)
                                            handleUploadQuestions(files[0]);
                                    }}
                                />
                            </label>
                        </Tooltip>
                    </div>
                </h1>

                <div className="mb-4">
                    <Selection
                        title={t("difficulty")}
                        items={QuestionDifficulty.map((item, index) => ({
                            label: item,
                            value: {
                                name: item,
                                value: index + 1,
                            },
                        }))}
                        required
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
                        title={t("type")}
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
                            {formErr.contentErr.typeErr}
                        </p>
                    )}
                </div>

                <div className="mb-4 flex gap-4">
                    <Selection
                        title={t("tags")}
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
                        <span className="text-red-500 mr-1">*</span>{" "}
                        {t("common:question")}
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
                            {formErr.contentErr.nameErr}
                        </p>
                    )}
                </div>

                {formState.content.type === "essay" && (
                    <div className="mb-6">
                        <label className="text-neutral-700 text-sm font-semibold block mb-2">
                            {t("common:description")}{" "}
                            <span className="text-gray-500 mr-1 font-normal">
                                ({t("common:optional")})
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
                                            {t("answer_number")} {index + 1}
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
                                        placeholder={`${t("answer_number")}${
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
                            {formErr.contentErr.answersErr}
                        </p>
                    )}
                    {formErr.contentErr.correctAnswer && (
                        <p className="md:col-span-2 mt-2 text-sm text-red-600 dark:text-red-500">
                            {formErr.contentErr.correctAnswer}
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
                            {t("add_more_answer")}
                        </Button>
                    )}
                    <div>
                        <ButtonOutline
                            type="button"
                            className="mr-2"
                            onClick={() => router.back()}
                        >
                            {t("common:save")}
                        </ButtonOutline>
                        <Button
                            type="submit"
                            disabled={createMutation.isPending}
                            isLoading={createMutation.isPending}
                        >
                            {t("common:save")}
                        </Button>
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
