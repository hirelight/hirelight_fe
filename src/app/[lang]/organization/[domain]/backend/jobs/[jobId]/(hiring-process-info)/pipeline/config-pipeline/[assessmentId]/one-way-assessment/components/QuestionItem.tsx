"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import {
    Reorder,
    motion,
    useDragControls,
    useMotionValue,
} from "framer-motion";

import { DragIndicatorIcon } from "@/icons";
import { Selection } from "@/components";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => (
        <div className="h-36 w-full border border-gray-200">Loading ...</div>
    ),
});

type QuestionItemProps = {
    data: {
        id: number;
        description: string;
        thinkLength: string;
        answerLength: string;
        numOfTakes: number;
    };
    onChange: (value: {
        description: string;
        thinkLength: string;
        answerLength: string;
        numOfTakes: number;
    }) => void;
    onDelete: (id: number) => void;
};

// setQuestionSection(prev => ({
//     ...prev,
//     questions: prev.questions.map(i => {
//         if (i.id === data.id) {
//             return { ...data, description: value };
//         }

//         return i;
//     }),
// }))

const QuestionItem: React.FC<QuestionItemProps> = ({
    data,
    onChange,
    onDelete,
}) => {
    const dragControls = useDragControls();
    const y = useMotionValue(0);

    return (
        <Reorder.Item
            value={data}
            dragListener={false}
            dragControls={dragControls}
            className="relative"
            style={{ y }}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
        >
            <div className={`flex gap-2 items-stretch h-full`}>
                <button
                    type="button"
                    className={`p-4 h-fit cursor-move`}
                    onPointerDown={event => dragControls.start(event)}
                >
                    <DragIndicatorIcon className="w-6 h-6 text-blue_primary_600 hover:text-blue_primary_800 focus:text-blue_primary_800" />
                </button>
                <div className="min-w-[400px] flex-1">
                    <QuillEditorNoSSR
                        placeholder={"Question number "}
                        onChange={(value: string) =>
                            onChange({
                                ...data,
                                description: value,
                            })
                        }
                        value={data.description || ""}
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
                        datas={[
                            "Unlimited time to think",
                            "3 minutes",
                            "10 minutes",
                        ]}
                        onChange={(value: string) =>
                            onChange({
                                ...data,
                                thinkLength: value,
                            })
                        }
                        labelClassName="bg-white"
                        value={data.thinkLength ? data.thinkLength : ""}
                    />
                    <Selection
                        title=""
                        datas={["3", "10", "30"]}
                        labelClassName="bg-white"
                        value={data.answerLength ? data.answerLength : ""}
                        onChange={(value: string) =>
                            onChange({
                                ...data,
                                answerLength: value,
                            })
                        }
                    />
                    <Selection
                        title=""
                        datas={["One take", "3 takes", "5 takes"]}
                        onChange={() => {}}
                        labelClassName="bg-white"
                        value={
                            data.numOfTakes ? data.numOfTakes.toString() : ""
                        }
                    />
                </div>
                <button
                    type="button"
                    className={`p-4 h-fit group`}
                    onClick={() => onDelete(data.id)}
                >
                    <TrashIcon className="w-6 h-6 text-red-400 group-hover:text-red-600" />
                </button>
            </div>
        </Reorder.Item>
    );
};

export default QuestionItem;
