"use client";

import React, { FormEvent, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button, ButtonOutline, CustomInput, Selection } from "@/components";
import { delayFunc } from "@/helpers/shareHelpers";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => (
        <div className="min-h-[200px] border border-gray-200 rounded-sm"></div>
    ),
});

const CreateQuestionPage = () => {
    const router = useRouter();

    const [formState, setFormState] = useState({
        difficulty: "",
        type: "One Answer",
        tags: "",
        name: "",
        answers: {
            1: "",
            2: "",
            3: "",
            4: "",
        },
        correctAnswer: [0],
    });

    const handleCreateQuestion = async (e: FormEvent) => {
        e.preventDefault();
        toast.info(`Create new question`);
        await delayFunc(1000);
        router.replace("/en/backend/settings/questions-bank");
    };

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
                    datas={["Easy", "Medium", "Hard", "Super Hard"]}
                    value={formState.difficulty}
                    onChange={value =>
                        setFormState({ ...formState, difficulty: value })
                    }
                />
            </div>
            <div className="mb-4">
                <Selection
                    title="Type"
                    datas={["One answer", "Multiple answers"]}
                    value={formState.difficulty}
                    onChange={value =>
                        setFormState({
                            ...formState,
                            type: value,
                            correctAnswer: [0],
                        })
                    }
                />
            </div>

            <div className="mb-4">
                <CustomInput
                    title="Tags"
                    placeholder="Example: Frontend, C#, Spring,..."
                    value={formState.tags}
                    onChange={(e: any) =>
                        setFormState({ ...formState, tags: e.target.value })
                    }
                />
            </div>

            <div className="mb-6">
                <label className="text-neutral-700 text-sm font-semibold">
                    Question
                </label>
                <QuillEditorNoSSR
                    className="min-h-[200px]"
                    value={formState.name}
                    onChange={content =>
                        setFormState(prev => ({
                            ...prev,
                            name: content,
                        }))
                    }
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {new Array(4).fill("").map((item, index) => {
                    return (
                        <div key={index} className="mb-4">
                            <div className="flex items-center mb-4">
                                <input
                                    id={`answer-${index}`}
                                    type={
                                        formState.type === "One answer"
                                            ? "radio"
                                            : "checkbox"
                                    }
                                    value={index}
                                    checked={
                                        formState.correctAnswer.find(
                                            corAns => corAns === index
                                        ) !== undefined
                                    }
                                    name="default-radio"
                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    onChange={e => {
                                        if (e.currentTarget.checked) {
                                            if (formState.type === "One answer")
                                                setFormState({
                                                    ...formState,
                                                    correctAnswer: [index],
                                                });
                                            else
                                                setFormState({
                                                    ...formState,
                                                    correctAnswer:
                                                        formState.correctAnswer.concat(
                                                            [index]
                                                        ),
                                                });
                                        } else {
                                            setFormState({
                                                ...formState,
                                                correctAnswer:
                                                    formState.correctAnswer.filter(
                                                        corAns =>
                                                            corAns !== index
                                                    ),
                                            });
                                        }
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
                                value={
                                    formState.answers[
                                        (index +
                                            1) as keyof typeof formState.answers
                                    ]
                                }
                                onChange={content =>
                                    setFormState(prev => ({
                                        ...prev,
                                        answers: {
                                            ...prev.answers,
                                            [index + 1]: content,
                                        },
                                    }))
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
