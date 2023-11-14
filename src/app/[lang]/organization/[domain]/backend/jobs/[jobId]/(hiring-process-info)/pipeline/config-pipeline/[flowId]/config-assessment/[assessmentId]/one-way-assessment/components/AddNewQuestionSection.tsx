import {
    ArrowDownTrayIcon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import React, { FormEvent } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import { v4 as uuid } from "uuid";

import { Button, CustomInput } from "@/components";

import QuestionItem from "./QuestionItem";

type QuestionSection = {
    id?: string;
    topic: string;
    questions: {
        id: string;
        name: string;
        config: {
            thinkTime: string;
            numOfTakes: string;
            duration: string;
        };
    }[];
};

type AddNewQuestionSectionProps = {
    data?: QuestionSection;
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
            id: uuid(),
            name: "",
            config: {
                thinkTime: "Unlimited time to think",
                duration: "",
                numOfTakes: "3",
            },
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
                                    onDelete={() =>
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
                        onClick={() => onFinish()}
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
