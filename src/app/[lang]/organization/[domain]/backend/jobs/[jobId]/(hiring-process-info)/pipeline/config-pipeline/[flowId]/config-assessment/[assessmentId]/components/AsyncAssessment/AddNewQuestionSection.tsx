import {
    ArrowDownTrayIcon,
    PlusCircleIcon,
    TrashIcon,
    XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { FormEvent, useState } from "react";
import { AnimatePresence, Reorder } from "framer-motion";
import { v4 as uuid } from "uuid";
import dynamic from "next/dynamic";
import { produce } from "immer";
import { toast } from "react-toastify";

import { Button, CustomInput, Selection } from "@/components";
import { DragIndicatorIcon } from "@/icons";
import questionAnswerServices from "@/services/questions/questions.service";
import { extractTextFromHtml, humanReadable } from "@/helpers";
import fileServices from "@/services/file-service/file.service";

import { AsyncQuestionType } from "./AsyncVideoForm";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => (
        <div className="h-36 w-full border border-gray-200">Loading ...</div>
    ),
});

export const thinkTime = new Map<number, string>([
    [0, "No think time"],
    [15, "15 seconds"],
    [30, "30 seconds"],
    [60, "1 minutes"],
    [180, "3 minutes"],
    [600, "10 minutes"],
]);

export const numOfTakes = new Map<number, string>([
    [0, "No takes"],
    [1, "One take"],
    [2, "2 takes"],
    [3, "3 takes"],
    [5, "5 takes"],
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
    const [error, setError] = React.useState({
        nameErr: "",
    });
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(false);
    const [question, setQuestion] = React.useState<AsyncQuestionType>(
        data
            ? data
            : {
                  id: uuid(),
                  content: {
                      name: "",
                      config: {
                          thinkTime: 0,
                          numOfTakes: 1,
                          duration: 60,
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

    const handleAddNewSection = async () => {
        if (extractTextFromHtml(question.content.name).length < 20) {
            setError({ ...error, nameErr: "Name is at least 20 letters!" });
            return toast.error("Invalid input!");
        }
        setLoading(true);
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
        setLoading(false);
        onFinish();
    };

    const handleUploadVideo = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const fileList = e.currentTarget.files;
        if (fileList && fileList.length) {
            const fileSize = fileList[0].size / 1024 / 1024;
            if (fileSize > 200) return toast.error("Maximum file is 200MB");
            const formData = new FormData();
            formData.append("formFile", fileList[0]);
            try {
                const res = await fileServices.uploadFile(formData, event => {
                    setProgress(
                        Math.round(100 * event.loaded) / (event.total ?? 1)
                    );
                });

                toast.success(res.message);
                setQuestion(prev =>
                    produce(prev, draft => {
                        draft.content.video = {
                            url: res.data,
                            fileName: fileList[0].name,
                        };
                    })
                );
            } catch (error: any) {
                toast.error(
                    error.message ? error.message : "Something went error"
                );
            }
        }
    };

    return (
        <div className="border border-gray-300 rounded-md">
            <div className="border-b border-gray-300 p-4 text-xl text-neutral-700">
                <h4>Questions</h4>
            </div>
            <div className="p-4 bg-blue_primary_050">
                <div className={`flex gap-2 items-stretch h-full mb-4`}>
                    <div className="min-w-[400px] flex-1">
                        <QuillEditorNoSSR
                            placeholder={"Question number "}
                            onChange={(value: string) => {
                                setQuestion({
                                    ...question,
                                    content: {
                                        ...question.content,
                                        name: value,
                                    },
                                });
                                setError({ nameErr: "" });
                            }}
                            value={question.content.name}
                            className="min-h-[144px] h-full bg-white"
                            errorText={error.nameErr}
                        />
                    </div>
                    <button
                        type="button"
                        className="border border-dashed border-gray-300 bg-white rounded-md flex items-center justify-center p-4 hover:border-blue_primary_800 cursor-pointer relative"
                        onClick={() => {
                            const inputTag = document.getElementById(
                                `question-file-${question.id}`
                            ) as HTMLInputElement;
                            if (inputTag) {
                                inputTag.click();
                            }
                        }}
                    >
                        <h3 className="text-blue_primary_800 font-medium">
                            Add a video to this question
                            <p className="text-gray-500 text-sm mt-1">
                                (File size maximum 200MB)
                            </p>
                            {progress > 0 && (
                                <div className="mt-1 w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                                    <div
                                        className="bg-blue-600 h-1.5 rounded-full"
                                        style={{
                                            width: `${progress}%`,
                                        }}
                                    ></div>
                                </div>
                            )}
                        </h3>
                        <input
                            id={`question-file-${question.id}`}
                            type="file"
                            accept="video/*"
                            className="sr-only"
                            onChange={handleUploadVideo}
                        />
                        {question.content.video && (
                            <div
                                className="absolute inset-0 z-50 bg-gray-900 rounded-md border border-gray-900"
                                onClick={e => e.stopPropagation()}
                            >
                                <video
                                    controls
                                    className="w-full h-full object-contain relative"
                                >
                                    <source src={question.content.video.url} />
                                </video>
                                <div
                                    role="button"
                                    className="absolute top-0 right-0 z-20 w-6 h-6 p-1 bg-white border border-gray-300 rounded-full translate-x-1/2 -translate-y-1/2"
                                    onClick={() => {
                                        const inputTag =
                                            document.getElementById(
                                                `question-file-${question.id}`
                                            ) as HTMLInputElement;
                                        if (inputTag) {
                                            inputTag.value = "";
                                            setQuestion(prev =>
                                                produce(prev, draft => {
                                                    draft.content.video =
                                                        undefined;
                                                })
                                            );
                                            setProgress(0);
                                        }
                                    }}
                                >
                                    <XMarkIcon />
                                </div>
                            </div>
                        )}
                    </button>
                    <div className="flex flex-col gap-2 justify-between">
                        <Selection
                            title=""
                            items={Array.from(thinkTime.keys()).map(key => ({
                                label: thinkTime.get(key)!!,
                                value: key,
                            }))}
                            placeholder="Think time"
                            onChange={value =>
                                setQuestion(prev =>
                                    produce(prev, draft => {
                                        if (draft.content.config)
                                            draft.content.config.thinkTime =
                                                value;
                                    })
                                )
                            }
                            labelClassName="bg-white"
                            value={
                                question.content.config
                                    ? thinkTime.get(
                                          question.content.config.thinkTime
                                      )
                                    : ""
                            }
                        />
                        <Selection
                            title=""
                            items={[1, 2, 3, 4, 5, 10].map(item => ({
                                label: item.toString() + " minutes",
                                value: item * 60,
                            }))}
                            labelClassName="bg-white"
                            placeholder="Duration"
                            value={
                                question.content.config
                                    ? (
                                          question.content.config.duration / 60
                                      ).toString() + " minutes"
                                    : ""
                            }
                            onChange={(value: number) =>
                                setQuestion(prev =>
                                    produce(prev, draft => {
                                        if (draft.content.config)
                                            draft.content.config.duration =
                                                value;
                                    })
                                )
                            }
                        />
                        <Selection
                            title=""
                            items={Array.from(numOfTakes.keys()).map(key => ({
                                label: numOfTakes.get(key)!!,
                                value: key,
                            }))}
                            onChange={value =>
                                setQuestion(prev =>
                                    produce(prev, draft => {
                                        if (draft.content.config)
                                            draft.content.config.numOfTakes =
                                                value;
                                    })
                                )
                            }
                            placeholder="Num of takes"
                            labelClassName="bg-white"
                            value={
                                question.content.config
                                    ? numOfTakes.get(
                                          question.content.config.numOfTakes
                                      )
                                    : ""
                            }
                        />
                    </div>
                </div>
            </div>
            <div className="border-t border-gray-300 px-4 py-6 flex items-center justify-between">
                <div className="inline-flex items-center gap-4">
                    <Button
                        type="button"
                        disabled={loading}
                        isLoading={loading}
                        onClick={handleAddNewSection}
                    >
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
            </div>
        </div>
    );
};

export default AddNewQuestionSection;
