"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import {
    Button,
    ButtonOutline,
    CustomInput,
    Modal,
    Portal,
    Selection,
} from "@/components";
import { Logo } from "@/icons";
import { IEditAssessmentDto, IQuestionAnswerDto } from "@/services";
import QuestionPickerCard from "@/components/QuestionPicker/QuestionPickerCard";
import assessmentsServices from "@/services/assessments/assessments.service";

import styles from "./CreateAssessment.module.scss";
import QuestionPickerModal from "./QuestionPickerModal";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

type ICreateMCAssessment = Omit<IEditAssessmentDto, "content" | "query"> & {
    content: {
        welcomeNote: string;
        questions: IQuestionAnswerDto[];
        shuffleQuestion: boolean;
        shuffleAnswer: boolean;
        autoEvaluate: {
            enabled: boolean;
            accuracy: string | null;
        };
    };
    query: {
        numOfQuestions: {
            easy: number;
            medium: number;
            hard: number;
            advance: number;
        };
    };
};

const CreateAssessment = () => {
    const { assessmentId } = useParams();

    const [showQuestionPicker, setShowQuestionPicker] = useState(false);
    const [pickedQuestions, setPickedQuestions] = useState<
        IQuestionAnswerDto[]
    >([]);
    const [formState, setFormState] = useState<ICreateMCAssessment>({
        id: parseInt(assessmentId as string),
        name: "",
        description: "",
        content: {
            welcomeNote: "",
            questions: [],
            shuffleQuestion: false,
            shuffleAnswer: false,
            autoEvaluate: {
                enabled: false,
                accuracy: "",
            },
        },
        query: {
            numOfQuestions: {
                easy: 0,
                medium: 0,
                hard: 0,
                advance: 0,
            },
        },
        duration: 0,
        index: 0,
        assessmentQuestionAnswerSetContent: "",
    });

    const handleCreateMCAssessment = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await assessmentsServices.editAsync({
                ...formState,
                content: JSON.stringify(formState.content),
                query: JSON.stringify(formState.query),
            });
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const getById = async (id: number) => {
            try {
                const res = await assessmentsServices.getById(id);
                setFormState(prev => ({
                    ...prev,
                    id: res.data.id,
                    name: res.data.name,
                    description: res.data.description ?? "",
                    content: res.data.content
                        ? JSON.parse(res.data.content)
                        : prev.content,
                    query: res.data.query
                        ? JSON.parse(res.data.query)
                        : prev.query,
                    duration: res.data.duration ?? 0,
                    index: res.data.index,
                    assessmentQuestionAnswerSetContent:
                        res.data.assessmentQuestionAnswerSetContent ?? "",
                }));
            } catch (error) {
                console.error(error);
            }
        };

        getById(parseInt(assessmentId as string));
    }, [assessmentId]);

    return (
        <>
            <Portal>
                <QuestionPickerModal
                    isOpen={showQuestionPicker}
                    onClose={() => setShowQuestionPicker(false)}
                    pickedQuestions={formState.content.questions}
                    onPickedChange={questions => {
                        setFormState(prev => ({
                            ...prev,
                            content: {
                                ...prev.content,
                                questions: questions,
                            },
                        }));
                        setShowQuestionPicker(false);
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
                            onChange={e =>
                                setFormState({
                                    ...formState,
                                    name: e.target.value,
                                })
                            }
                            required
                        />

                        <div className="w-1/3">
                            <Selection
                                title="Duration"
                                items={[
                                    "15 minutes",
                                    "30 minutes",
                                    "1 hour",
                                    "2 hour",
                                    "In 3 days",
                                ].map(item => ({ label: item, value: item }))}
                                placeholder="The duration for assessment"
                                onChange={() => {}}
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mb-6 px-4 xl:px-6">
                        <h3 className="text-neutral-700 font-medium">
                            Welcome note
                        </h3>
                        <QuillEditorNoSSR
                            placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                            className="min-h-[320px]"
                            theme="snow"
                            value={formState.content.welcomeNote}
                            onChange={(value: string) =>
                                setFormState({
                                    ...formState,
                                    content: {
                                        ...formState.content,
                                        welcomeNote: value,
                                    },
                                })
                            }
                        />
                    </div>
                </section>

                <section>
                    <h3 className={styles.section__h3}>
                        <Logo className="w-6 h-6 text-blue_primary_300" />
                        Question
                    </h3>
                    <ul className={"flex flex-col gap-2 mb-4 px-4 xl:px-6"}>
                        {formState.content.questions.map((item, index) => (
                            <li key={item.id}>
                                <QuestionPickerCard
                                    data={item}
                                    questionNo={index}
                                    pickedQuestions={
                                        formState.content.questions
                                    }
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
                                Create new topic
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
                                    items={["80%", "50%", "25%"].map(item => ({
                                        label: item,
                                        value: item,
                                    }))}
                                    value={
                                        formState.content.autoEvaluate
                                            .accuracy ?? ""
                                    }
                                    onChange={value =>
                                        setFormState({
                                            ...formState,
                                            content: {
                                                ...formState.content,
                                                autoEvaluate: {
                                                    enabled: true,
                                                    accuracy: value,
                                                },
                                            },
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between items-start">
                            <strong>Duration</strong>
                            <div className="max-w-[400px] w-1/2">
                                <Selection
                                    title=""
                                    items={[120, 60, 30].map(item => ({
                                        label: `${item} minutes`,
                                        value: item,
                                    }))}
                                    value={formState.duration.toString()}
                                    onChange={value =>
                                        setFormState({
                                            ...formState,
                                            duration: value,
                                        })
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
                                    <Selection
                                        title=""
                                        items={[1, 5, 10, 15].map(item => ({
                                            label: item.toString(),
                                            value: item,
                                        }))}
                                        value={formState.query.numOfQuestions.easy.toString()}
                                        onChange={value =>
                                            setFormState({
                                                ...formState,
                                                query: {
                                                    ...formState.query,
                                                    numOfQuestions: {
                                                        ...formState.query
                                                            .numOfQuestions,
                                                        easy: value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Medium
                                    </span>
                                    <Selection
                                        title=""
                                        items={[1, 5, 10, 15].map(item => ({
                                            label: item.toString(),
                                            value: item,
                                        }))}
                                        value={formState.query.numOfQuestions.medium.toString()}
                                        onChange={value =>
                                            setFormState({
                                                ...formState,
                                                query: {
                                                    ...formState.query,
                                                    numOfQuestions: {
                                                        ...formState.query
                                                            .numOfQuestions,
                                                        medium: value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Hard
                                    </span>
                                    <Selection
                                        title=""
                                        items={[1, 5, 10, 15].map(item => ({
                                            label: item.toString(),
                                            value: item,
                                        }))}
                                        value={formState.query.numOfQuestions.hard.toString()}
                                        onChange={value =>
                                            setFormState({
                                                ...formState,
                                                query: {
                                                    ...formState.query,
                                                    numOfQuestions: {
                                                        ...formState.query
                                                            .numOfQuestions,
                                                        hard: value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                </div>
                                <div className="relative">
                                    <span className={styles.selection__label}>
                                        Advance
                                    </span>
                                    <Selection
                                        title=""
                                        items={[1, 5, 10, 15].map(item => ({
                                            label: item.toString(),
                                            value: item,
                                        }))}
                                        value={formState.query.numOfQuestions.advance.toString()}
                                        onChange={value =>
                                            setFormState({
                                                ...formState,
                                                query: {
                                                    ...formState.query,
                                                    numOfQuestions: {
                                                        ...formState.query
                                                            .numOfQuestions,
                                                        advance: value,
                                                    },
                                                },
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        {/* <div className="flex justify-between items-start">
                            <strong>Time</strong>
                            <div className="max-w-[400px] w-1/2">
                                <Selection
                                    title=""
                                    items={[
                                        "120 minutes",
                                        "60 minutes",
                                        "30 minutes",
                                    ].map(item => ({
                                        label: item,
                                        value: item,
                                    }))}
                                    onChange={() => {}}
                                />
                            </div>
                        </div> */}
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
                                    checked={formState.content.shuffleQuestion}
                                    onChange={e =>
                                        setFormState({
                                            ...formState,
                                            content: {
                                                ...formState.content,
                                                shuffleQuestion:
                                                    e.target.checked,
                                            },
                                        })
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
                                    checked={formState.content.shuffleAnswer}
                                    onChange={e =>
                                        setFormState({
                                            ...formState,
                                            content: {
                                                ...formState.content,
                                                shuffleAnswer: e.target.checked,
                                            },
                                        })
                                    }
                                />
                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                        </div>
                    </div>
                </section>
                <div className="flex items-center justify-end gap-4 p-4 xl:px-6">
                    <ButtonOutline type="button">Save & continue</ButtonOutline>
                    <Button type="submit">Save all changes</Button>
                </div>
            </form>
        </>
    );
};

export default CreateAssessment;
