"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";

import {
    Button,
    ButtonOutline,
    CustomInput,
    Modal,
    Portal,
    Selection,
    Timer,
} from "@/components";
import { Logo, SpinLoading } from "@/icons";
import { IEditAssessmentDto, IQuestionAnswerDto } from "@/services";
import QuestionPickerCard from "@/components/QuestionPicker/QuestionPickerCard";
import assessmentsServices from "@/services/assessments/assessments.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { extractTextFromHtml, isInvalidForm } from "@/helpers";

import styles from "./CreateAssessment.module.scss";
import QuestionPickerModal from "./QuestionPickerModal";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <div className="min-h-[300px] border border-gray-300"></div>,
});

type ICreateMCAssessment = Omit<IEditAssessmentDto, "content" | "query"> & {
    content: {
        welcomeNote: string;
        config: {
            shuffleQuestion: boolean;
            shuffleAnswer: boolean;
            autoEvaluate: {
                enabled: boolean;
                accuracy: number | null;
            };
        };
    };
    query: {
        numOfQuestions: {
            easy?: number;
            medium?: number;
            hard?: number;
            advance?: number;
        };
    } | null;
};

const CreateAssessment = () => {
    const { assessmentId, flowId } = useParams();

    const assessment = useAppSelector(state => state.assessment.data);
    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(false);
    const [showQuestionPicker, setShowQuestionPicker] = useState(false);
    const [pickedQuestions, setPickedQuestions] = useState<
        IQuestionAnswerDto[]
    >(
        assessment.assessmentQuestionAnswerSetContent
            ? JSON.parse(assessment.assessmentQuestionAnswerSetContent)
            : []
    );
    const [formErr, setFormErr] = useState({
        nameErr: "",
        durationErr: "",
        questionsErr: "",
        descriptionErr: "",
    });
    const [formState, setFormState] = useState<ICreateMCAssessment>({
        id: assessmentId as string,
        name: assessment.name,
        description: assessment.description ?? "",
        content: assessment.content
            ? JSON.parse(assessment.content)
            : {
                  welcomeNote: "",
                  config: {
                      shuffleQuestion: false,
                      shuffleAnswer: false,
                      autoEvaluate: {
                          enabled: false,
                          accuracy: "",
                      },
                  },
              },
        query: assessment.query ? JSON.parse(assessment.query) : null,
        duration: assessment.duration ?? 0,
        index: assessment.index,
        assessmentQuestionAnswerSetContent:
            assessment.assessmentQuestionAnswerSetContent ?? "",
    });

    const validation = (): boolean => {
        const { name, duration, description } = formState;

        let error = formErr;

        if (duration < 60)
            error.durationErr = "Duration must at least 1 minute";

        if (pickedQuestions.length < 5)
            error.questionsErr = "Please select at least 5 question";

        if (extractTextFromHtml(description).length < 100)
            error.descriptionErr = "Description must at least 100 characters";

        if (isInvalidForm(error)) {
            setFormErr({ ...error });
            toast.error(
                <div>
                    <p>Invalid input</p>
                    <p>Check issue in red!</p>
                </div>,
                {
                    position: "top-center",
                    autoClose: 1500,
                }
            );
            return true;
        }
        return false;
    };

    const handleCreateMCAssessment = async (e: FormEvent) => {
        e.preventDefault();

        if (validation()) return;
        setIsLoading(true);
        try {
            const res = await assessmentsServices.editAsync({
                ...formState,
                content: JSON.stringify(formState.content),
                query: JSON.stringify(formState.query),
                assessmentQuestionAnswerSetContent:
                    JSON.stringify(pickedQuestions),
            });
            queryClient.invalidateQueries({
                queryKey: [`assessmentFlow`, flowId],
            });
            toast.success(res.message);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const handleNumQuestion = (key: string, value: string, max: number) => {
        setFormState({
            ...formState,
            query: {
                ...formState.query,
                numOfQuestions: {
                    ...(formState.query?.numOfQuestions ?? {}),
                    [key]: !value
                        ? undefined
                        : parseInt(value) > max
                        ? max
                        : parseInt(value),
                },
            },
        });
    };

    return (
        <>
            <Portal>
                <QuestionPickerModal
                    isOpen={showQuestionPicker}
                    onClose={() => setShowQuestionPicker(false)}
                    pickedQuestions={pickedQuestions}
                    onPickedChange={questions => {
                        setPickedQuestions(questions);
                        setShowQuestionPicker(false);
                        setFormErr({
                            ...formErr,
                            questionsErr: "",
                        });
                        setFormState({
                            ...formState,
                            query: null,
                        });
                    }}
                />
            </Portal>
            <form onSubmit={handleCreateMCAssessment}>
                <section>
                    <h3 className={styles.section__h3}>
                        <Logo className="w-6 h-6 text-blue_primary_300" />
                        Welcome page info
                    </h3>

                    <div className="flex items-start gap-6 mb-6 px-4 xl:px-6">
                        <CustomInput
                            title="Title"
                            id="multiple-choice-assessment__title"
                            name="multiple-choice-assessment__title"
                            type="text"
                            placeholder="Assessment title"
                            value={formState.name}
                            onChange={e => {
                                setFormState({
                                    ...formState,
                                    name: e.target.value,
                                });
                                setFormErr({
                                    ...formErr,
                                    nameErr: "",
                                });
                            }}
                            required
                            errorText={formErr.nameErr}
                        />

                        <div>
                            <Timer
                                title="Duration"
                                data={formState.duration}
                                onChange={second => {
                                    setFormState(prev => ({
                                        ...prev,
                                        duration: second,
                                    }));
                                    setFormErr({
                                        ...formErr,
                                        durationErr: "",
                                    });
                                }}
                                required
                                errorText={formErr.durationErr}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-6 px-4 xl:px-6">
                        <h3 className="text-neutral-700 font-medium">
                            Description
                        </h3>
                        <QuillEditorNoSSR
                            placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                            className="min-h-[320px]"
                            theme="snow"
                            value={formState.description}
                            onChange={(value: string) => {
                                setFormState({
                                    ...formState,
                                    description: value,
                                });
                                setFormErr({
                                    ...formErr,
                                    descriptionErr: "",
                                });
                            }}
                        />
                        {formErr.descriptionErr !== "" && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">
                                    {formErr.descriptionErr}
                                </span>
                            </p>
                        )}
                    </div>
                </section>

                <section>
                    <h3 className={`${styles.section__h3} w-full`}>
                        <Logo className="w-6 h-6 text-blue_primary_300" />
                        Question
                        {formErr.questionsErr !== "" && (
                            <p className="ml-auto text-sm text-red-600 dark:text-red-500">
                                <span className="font-medium">
                                    {formErr.questionsErr}
                                </span>
                            </p>
                        )}
                    </h3>
                    <ul className={"flex flex-col gap-2 mb-4 px-4 xl:px-6"}>
                        {pickedQuestions.map((item, index) => (
                            <li key={item.id}>
                                <QuestionPickerCard
                                    data={item}
                                    questionNo={index}
                                    pickedQuestions={pickedQuestions}
                                />
                            </li>
                        ))}
                    </ul>
                    <div className="mb-4 px-4 xl:px-6">
                        <button
                            type="button"
                            className="relative flex items-center justify-center overflow-hidden text-sm font-medium text-blue_primary_600 rounded-lg group border border-dashed border-gray-400 transition-all ease-in duration-75 w-full hover:border-blue_primary_800 hover:text-blue_primary_800"
                            onClick={() => setShowQuestionPicker(true)}
                        >
                            <span className="relative py-4 px-5 flex items-center">
                                <PlusCircleIcon className="w-5 h-5 mr-1" />
                                Choose questions
                            </span>
                        </button>
                    </div>
                </section>
                <section>
                    <h3 className={styles.section__h3}>
                        <Logo className="w-6 h-6 text-blue_primary_300" />
                        Configuration
                    </h3>
                    <div className="flex flex-col gap-8 mb-4 px-4 xl:px-6">
                        <div className="flex justify-between items-start">
                            <strong>Accuracy</strong>
                            <div className="max-w-[400px] w-1/2">
                                <Selection
                                    title=""
                                    items={[
                                        {
                                            label: "Disable evaluated",
                                            value: 0,
                                        },
                                    ].concat(
                                        new Array(10)
                                            .fill("")
                                            .map((item, index) => ({
                                                label: `${(index + 1) * 10}%`,
                                                value: (index + 1) * 10,
                                            }))
                                    )}
                                    value={
                                        formState.content.config.autoEvaluate
                                            .accuracy
                                            ? formState.content.config
                                                  .autoEvaluate.accuracy + "%"
                                            : undefined
                                    }
                                    onChange={value =>
                                        setFormState(prev =>
                                            produce(prev, draft => {
                                                draft.content.config.autoEvaluate =
                                                    {
                                                        enabled:
                                                            value === 0
                                                                ? false
                                                                : true,
                                                        accuracy: value,
                                                    };
                                            })
                                        )
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <strong>Number of questions</strong>
                            <div className="max-w-[400px] w-1/2 flex flex-col gap-6">
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Easy
                                    </span>
                                    <CustomInput
                                        title=""
                                        type="number"
                                        value={
                                            formState.query
                                                ? formState.query.numOfQuestions
                                                      .easy ?? ""
                                                : ""
                                        }
                                        max={
                                            pickedQuestions.filter(
                                                item => item.difficulty === 1
                                            ).length
                                        }
                                        min={0}
                                        placeholder="Enter a quantity"
                                        onChange={e => {
                                            handleNumQuestion(
                                                "easy",
                                                e.currentTarget.value,
                                                pickedQuestions.filter(
                                                    item =>
                                                        item.difficulty === 1
                                                ).length
                                            );
                                        }}
                                    />
                                </div>
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Medium
                                    </span>
                                    <CustomInput
                                        title=""
                                        type="number"
                                        value={
                                            formState.query
                                                ? formState.query.numOfQuestions
                                                      .medium ?? ""
                                                : ""
                                        }
                                        max={
                                            pickedQuestions.filter(
                                                item => item.difficulty === 2
                                            ).length
                                        }
                                        min={0}
                                        placeholder="Enter a quantity"
                                        onChange={e => {
                                            handleNumQuestion(
                                                "medium",
                                                e.currentTarget.value,
                                                pickedQuestions.filter(
                                                    item =>
                                                        item.difficulty === 2
                                                ).length
                                            );
                                        }}
                                    />
                                </div>
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Hard
                                    </span>

                                    <CustomInput
                                        title=""
                                        type="number"
                                        value={
                                            formState.query
                                                ? formState.query.numOfQuestions
                                                      .hard ?? ""
                                                : ""
                                        }
                                        max={
                                            pickedQuestions.filter(
                                                item => item.difficulty === 3
                                            ).length
                                        }
                                        min={0}
                                        placeholder="Enter a quantity"
                                        onChange={e => {
                                            handleNumQuestion(
                                                "hard",
                                                e.currentTarget.value,
                                                pickedQuestions.filter(
                                                    item =>
                                                        item.difficulty === 3
                                                ).length
                                            );
                                        }}
                                    />
                                </div>
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Advance
                                    </span>
                                    <CustomInput
                                        title=""
                                        type="number"
                                        placeholder="Enter a quantity"
                                        value={
                                            formState.query
                                                ? formState.query.numOfQuestions
                                                      .advance ?? ""
                                                : ""
                                        }
                                        max={
                                            pickedQuestions.filter(
                                                item => item.difficulty === 4
                                            ).length
                                        }
                                        min={0}
                                        onChange={e => {
                                            handleNumQuestion(
                                                "advance",
                                                e.currentTarget.value,
                                                pickedQuestions.filter(
                                                    item =>
                                                        item.difficulty === 4
                                                ).length
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-start">
                            <label
                                htmlFor="shuffle-questions"
                                className="cursor-pointer"
                            >
                                <strong>Shuffle questions</strong>
                            </label>
                            <label
                                htmlFor="shuffle-questions"
                                className="relative inline-flex items-center cursor-pointer"
                            >
                                <input
                                    id="shuffle-questions"
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    checked={
                                        formState.content.config.shuffleQuestion
                                    }
                                    onChange={e =>
                                        setFormState(prev =>
                                            produce(prev, draft => {
                                                draft.content.config.shuffleQuestion =
                                                    e.target.checked;
                                            })
                                        )
                                    }
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                        <div className="flex justify-between items-start">
                            <label
                                htmlFor="shuffle-answers"
                                className="cursor-pointer"
                            >
                                <strong>Shuffle answers</strong>
                            </label>
                            <label
                                htmlFor="shuffle-answers"
                                className="relative inline-flex items-center cursor-pointer"
                            >
                                <input
                                    id="shuffle-answers"
                                    type="checkbox"
                                    value=""
                                    className="sr-only peer"
                                    checked={
                                        formState.content.config.shuffleAnswer
                                    }
                                    onChange={e => {
                                        setFormState(prev =>
                                            produce(prev, draft => {
                                                draft.content.config.shuffleAnswer =
                                                    e.target.checked;
                                            })
                                        );
                                    }}
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </section>
                <div className="flex items-center justify-end gap-4 p-4 xl:px-6">
                    <ButtonOutline type="button">Save & continue</ButtonOutline>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        isLoading={isLoading}
                    >
                        Save all changes
                    </Button>
                </div>
            </form>
        </>
    );
};

export default CreateAssessment;
