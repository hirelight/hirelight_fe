import {
    ArrowDownTrayIcon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import React, { FormEvent } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import { v4 as uuid } from "uuid";
import dynamic from "next/dynamic";

import { Button, CustomInput, Selection } from "@/components";
import { DragIndicatorIcon } from "@/icons";
import questionAnswerServices from "@/services/questions/questions.service";
import { humanReadable } from "@/helpers";

import { AsyncQuestionType } from "../new/components/AsyncVideoForm";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => (
        <div className="h-36 w-full border border-gray-200">Loading ...</div>
    ),
});

export const thinkTime = new Map<number, string>([
    [-1, "Unlimited time to think"],
    [180, "3 minutes"],
    [600, "10 minutes"],
]);

type AddNewQuestionSectionProps = {
    data?: AsyncQuestionType;
    onFinish: () => void;
    onSaveTopic: (section: AsyncQuestionType) => void;
};

const AddNewQuestionSection = ({
    onFinish,
    onSaveTopic,
    data,
}: AddNewQuestionSectionProps) => {
    const [question, setQuestion] = React.useState<AsyncQuestionType>(
        data
            ? data
            : {
                  id: uuid(),
                  content: {
                      name: "",
                      config: {
                          thinkTime: 0,
                          numOfTakes: 0,
                          duration: 0,
                      },
                      type: "essay",
                      answers: [],
                  },
                  difficulty: 1,
                  tagList: [],
                  organizationId: "",
                  updaterId: "",
                  createdTime: new Date(),
                  updatedTime: new Date(),
                  status: "",
              }
    );

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
    };

    const handleAddNewSection = async () => {
        try {
            if (!question.status) {
                const res = await questionAnswerServices.createAsync({
                    content: JSON.stringify(question.content),
                    difficulty: question.difficulty,
                    tagIdList: [],
                });
                onSaveTopic({
                    ...res.data,
                    content: {
                        ...JSON.parse(res.data.content),
                        config: question.content.config,
                    },
                });
            } else {
                const res = await questionAnswerServices.editAsync({
                    id: question.id,
                    content: JSON.stringify(question.content),
                    difficulty: question.difficulty,
                    tagIdList: [],
                });
                onSaveTopic({
                    ...res.data,
                    content: {
                        ...JSON.parse(res.data.content),
                        config: question.content.config,
                    },
                });
            }
        } catch (error) {
            console.error(error);
        }
        onFinish();
    };

    return (
        <div className="border border-gray-300 rounded-md">
            <div className="border-b border-gray-300 p-4 text-xl text-neutral-700">
                <h4>New Question</h4>
            </div>
            <div className="p-4 bg-blue_primary_050">
                <div className={`flex gap-2 items-stretch h-full mb-4`}>
                    <div className="min-w-[400px] flex-1">
                        <QuillEditorNoSSR
                            placeholder={"Question number "}
                            onChange={(value: string) =>
                                setQuestion({
                                    ...question,
                                    content: {
                                        ...question.content,
                                        name: value,
                                    },
                                })
                            }
                            value={question.content.name}
                            className="min-h-[144px] h-full bg-white"
                        />
                    </div>
                    <div className="border border-dashed border-gray-300 bg-white rounded-md flex items-center justify-center p-4 hover:border-blue_primary_800 cursor-pointer">
                        <h3 className="text-blue_primary_800 font-medium">
                            Add a video to this question
                        </h3>
                    </div>
                    <div className="flex flex-col gap-2 justify-between">
                        <Selection
                            title=""
                            items={Array.from(thinkTime.keys()).map(key => ({
                                label: thinkTime.get(key)!!,
                                value: key,
                            }))}
                            placeholder="Think time"
                            onChange={value =>
                                setQuestion({
                                    ...question,
                                    content: {
                                        ...question.content,
                                        config: {
                                            ...question.content.config,
                                            thinkTime: value,
                                        },
                                    },
                                })
                            }
                            labelClassName="bg-white"
                            value={thinkTime.get(
                                question.content.config.thinkTime
                            )}
                        />
                        <Selection
                            title=""
                            items={[3, 10, 30].map(item => ({
                                label: item.toString(),
                                value: item,
                            }))}
                            labelClassName="bg-white"
                            placeholder="Duration"
                            value={
                                question.content.config.duration.toString()
                                    ? question.content.config.duration.toString()
                                    : ""
                            }
                            onChange={(value: number) =>
                                setQuestion({
                                    ...question,
                                    content: {
                                        ...question.content,
                                        config: {
                                            ...question.content.config,
                                            duration: value,
                                        },
                                    },
                                })
                            }
                        />
                        <Selection
                            title=""
                            items={[1, 3, 5].map(item => ({
                                label: item + " takes",
                                value: item,
                            }))}
                            onChange={() => {}}
                            placeholder="Num of takes"
                            labelClassName="bg-white"
                            value={
                                question.content.config.numOfTakes
                                    ? question.content.config.numOfTakes +
                                      " takes"
                                    : ""
                            }
                        />
                    </div>
                </div>
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
