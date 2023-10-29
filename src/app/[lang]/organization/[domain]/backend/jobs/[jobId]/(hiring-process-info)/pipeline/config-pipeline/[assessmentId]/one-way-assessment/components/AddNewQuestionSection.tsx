import {
    ArrowDownTrayIcon,
    Bars3Icon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import React, { FormEvent } from "react";
import { AnimatePresence, Reorder } from "framer-motion";

import { Button, CustomInput, Selection } from "@/components";

import QuestionItem from "./QuestionItem";

function generateNewId(existingIds: number[]): number {
    let newId: number;
    do {
        newId = Math.floor(Math.random() * 200);
    } while (existingIds.includes(newId));

    return newId;
}

type QuestionSection = {
    id?: number;
    topic: string;
    questions: {
        id: number;
        description: string;
        thinkLength: string;
        answerLength: string;
        numOfTakes: number;
    }[];
};

type AddNewQuestionSectionProps = {
    data?: {
        id?: number;
        topic: string;
        questions: {
            id: number;
            description: string;
            thinkLength: string;
            answerLength: string;
            numOfTakes: number;
        }[];
    };
    onFinish: () => void;
    onSaveTopic: (section: any) => void;
};

const AddNewQuestionSection = ({
    onFinish,
    onSaveTopic,
    data = {
        topic: "",
        questions: [],
    },
}: AddNewQuestionSectionProps) => {
    const [questionSection, setQuestionSection] =
        React.useState<QuestionSection>(data);

    const handleAddNewQuestion = (e: FormEvent) => {
        e.preventDefault();

        const newQuestion = {
            id: generateNewId(questionSection.questions.map(item => item.id)),
            description: "",
            thinkLength: "Unlimited time to think",
            answerLength: "",
            numOfTakes: 0,
        };

        setQuestionSection({
            ...questionSection,
            questions: [...questionSection.questions, newQuestion],
        });
    };

    const handleAddNewSection = () => {
        onSaveTopic(questionSection);
        onFinish();
    };

    return (
        <div className="border border-gray-300 rounded-md">
            <div className="border-b border-gray-300 p-4 text-xl text-neutral-700">
                <h4>
                    {questionSection.topic
                        ? questionSection.topic
                        : "New topic"}
                </h4>
            </div>
            <div className="p-4 bg-blue_primary_050">
                <div className="mb-4">
                    <CustomInput
                        title=""
                        type="text"
                        placeholder="Toppic"
                        value={questionSection.topic}
                        onChange={(e: any) =>
                            setQuestionSection({
                                ...questionSection,
                                topic: e.target.value,
                            })
                        }
                        className="bg-white"
                    />
                </div>
                <Reorder.Group
                    values={questionSection.questions}
                    onReorder={newOrder =>
                        setQuestionSection({
                            ...questionSection,
                            questions: newOrder,
                        })
                    }
                    className="space-y-4 mb-4"
                    axis="y"
                >
                    <AnimatePresence>
                        {questionSection.questions?.map(question => {
                            return (
                                <QuestionItem
                                    key={question.id}
                                    data={question}
                                    onChange={(value: any) => {
                                        setQuestionSection(prev => ({
                                            ...prev,
                                            questions: prev.questions.map(
                                                item => {
                                                    if (
                                                        item.id === question.id
                                                    ) {
                                                        return value;
                                                    }

                                                    return item;
                                                }
                                            ),
                                        }));
                                    }}
                                    onDelete={(id: number) =>
                                        setQuestionSection(prev => ({
                                            ...prev,
                                            questions: prev.questions.filter(
                                                item => item.id !== question.id
                                            ),
                                        }))
                                    }
                                />
                            );
                        })}
                    </AnimatePresence>
                </Reorder.Group>
                <div className="flex gap-6 px-4">
                    <button
                        type="button"
                        className="flex items-center gap-1 text-sm text-blue_primary_800 font-medium hover:underline"
                        onClick={handleAddNewQuestion}
                    >
                        <PlusCircleIcon className="w-4 h-4" />
                        <span>Add new question</span>
                    </button>
                    <button
                        type="button"
                        className="flex items-center gap-1 text-sm text-blue_primary_800 font-medium hover:underline"
                    >
                        <ArrowDownTrayIcon className="w-4 h-4" />
                        <span>Import questions from library</span>
                    </button>
                </div>
            </div>
            <div className="border-t border-gray-300 px-4 py-6 flex items-center justify-between">
                <div className="inline-flex items-center gap-2">
                    <Button type="button" onClick={handleAddNewSection}>
                        Save topic
                    </Button>
                    <button
                        type="button"
                        className="text-neutral-500 font-semibold text-sm hover:text-neutral-700"
                    >
                        Cancel
                    </button>
                </div>

                <button
                    type="button"
                    className="group"
                    onClick={() => onFinish()}
                >
                    <TrashIcon className="w-6 h-6 text-red-400 group-hover:text-red-600" />
                </button>
            </div>
        </div>
    );
};

export default AddNewQuestionSection;
