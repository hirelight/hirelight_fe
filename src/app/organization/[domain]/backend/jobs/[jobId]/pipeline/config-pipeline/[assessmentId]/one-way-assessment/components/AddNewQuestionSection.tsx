import {
    ArrowDownTrayIcon,
    Bars3Icon,
    PlusCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import dynamic from "next/dynamic";
import React, { FormEvent } from "react";

import { Button, CustomInput, Selection } from "@/components";
import { DragIndicatorIcon } from "@/icons";

import styles from "./AddNewQuestionSection.module.scss";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

const itemHeight = 220;
const padding = 24;

const reorderList = (array: any[], rowFrom: number, rowTo: number) => {
    const __array = [...array];

    const val = __array[rowFrom];
    if (rowTo >= array.length) {
        rowTo = array.length - 1;
    }

    __array.splice(rowFrom, 1);
    __array.splice(rowTo, 0, val);
    return __array;
};

interface IAddNewQuestionSection {
    data?: {
        id: number;
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
}

const AddNewQuestionSection = ({
    onFinish,
    onSaveTopic,
    data,
}: IAddNewQuestionSection) => {
    const [questionSection, setQuestionSection] = React.useState<{
        id?: number;
        topic: string;
        questions: {
            id: number;
            description: string;
            thinkLength: string;
            answerLength: string;
            numOfTakes: number;
        }[];
    }>(
        data
            ? data
            : {
                  topic: "",
                  questions: [],
              }
    );
    const [selected, setSelected] = React.useState<number>(0);
    const [itemPos, setItemPos] = React.useState({ x: 0, y: 0 });
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
    const [isPressing, setIsPressing] = React.useState(false);

    const handleAddNewQuestion = (e: FormEvent) => {
        e.preventDefault();

        const newQuestion = {
            id: questionSection.questions.length,
            description: "",
            thinkLength: "Unlimited time to think",
            answerLength: "",
            numOfTakes: 0,
        };
        if (questionSection && questionSection?.questions.length > 0)
            setQuestionSection({
                ...questionSection,
                questions: [...questionSection?.questions, newQuestion],
            });
        else
            setQuestionSection({
                topic: questionSection.topic,
                questions: [...questionSection.questions, newQuestion],
            });
    };

    const QuestionItem = (
        item: {
            id: number;
            description: string;
            thinkLength: string;
            answerLength: string;
            numOfTakes: number;
        },
        isActive: boolean,
        x: number,
        y: number
    ) => {
        return (
            <div className={`flex gap-2 items-stretch h-full`}>
                <span
                    className={`p-4 h-fit cursor-grab ${
                        isActive ? styles.dragging : ""
                    }`}
                    onMouseDown={e => handleMouseDown(e, item.id, x, y)}
                    onMouseUp={handleMouseUp}
                >
                    <DragIndicatorIcon className="w-6 h-6 text-blue_primary_600 hover:text-blue_primary_800 focus:text-blue_primary_800" />
                </span>
                <div className="min-w-[400px] flex-1 flex flex-shrink-0">
                    <QuillEditorNoSSR
                        placeholder={"Question number " + item}
                        onChange={(value: string) =>
                            setQuestionSection(prev => ({
                                ...prev,
                                questions: prev.questions.map(i => {
                                    if (i.id === item.id) {
                                        return { ...item, description: value };
                                    }

                                    return i;
                                }),
                            }))
                        }
                        value={item.description || ""}
                        className="flex-1 border border-slate-400 rounded-md overflow-hidden bg-white"
                    />
                </div>
                <div className="border border-dashed border-gray-300 bg-white rounded-md flex items-center justify-center p-4 hover:border-blue_primary_800 cursor-pointer">
                    <h3 className="text-blue_primary_800 font-medium">
                        Add a video to this question
                    </h3>
                </div>
                <div className="flex flex-col justify-between">
                    <Selection
                        title=""
                        datas={[
                            "Unlimited time to think",
                            "3 minutes",
                            "10 minutes",
                        ]}
                        onChange={value =>
                            setQuestionSection({
                                ...questionSection,
                                questions: questionSection.questions.map(i => {
                                    if (i.id === item.id) {
                                        return { ...item, thinkLength: value };
                                    }

                                    return i;
                                }),
                            })
                        }
                        labelClassName="bg-white"
                        value={item.thinkLength ? item.thinkLength : ""}
                    />
                    <Selection
                        title=""
                        datas={["3", "10", "30"]}
                        labelClassName="bg-white"
                        value={item.answerLength ? item.answerLength : ""}
                        onChange={value =>
                            setQuestionSection({
                                ...questionSection,
                                questions: questionSection.questions.map(i => {
                                    if (i.id === item.id) {
                                        return { ...item, answerLength: value };
                                    }

                                    return i;
                                }),
                            })
                        }
                    />
                    <Selection
                        title=""
                        datas={["One take", "3 takes", "5 takes"]}
                        onChange={() => {}}
                        labelClassName="bg-white"
                        value={
                            item.numOfTakes ? item.numOfTakes.toString() : ""
                        }
                    />
                </div>
                <button
                    type="button"
                    className={`p-4 h-fit group`}
                    onClick={() =>
                        setQuestionSection(prev => ({
                            ...prev,
                            questions: prev.questions.filter(i => i !== item),
                        }))
                    }
                >
                    <TrashIcon className="w-6 h-6 text-red-400 group-hover:text-red-600" />
                </button>
            </div>
        );
    };

    const handleMouseDown = (
        e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
        selected: number,
        pressX: number,
        pressY: number
    ) => {
        setItemPos({ x: e.pageX - pressX, y: e.pageY - pressY });
        setMousePos({ x: pressX, y: pressY });
        setIsPressing(true);
        setSelected(selected);
    };

    const handleMouseUp = () => {
        setItemPos({
            x: 0,
            y: 0,
        });
        setIsPressing(false);
    };

    const handleMouseMove = ({
        pageX,
        pageY,
    }: {
        pageX: number;
        pageY: number;
    }) => {
        const clamp = (n: number, min: number, max: number) =>
            Math.max(Math.min(n, max), min);
        if (isPressing) {
            const mouse = {
                x: pageX - itemPos.x,
                y: pageY - itemPos.y,
            };
            const rowTo = clamp(
                Math.floor((mouse.y + itemHeight / 2) / itemHeight),
                0,
                100
            );
            const rowFrom = questionSection.questions.indexOf(
                questionSection.questions.find(item => item.id === selected)!!
            );
            const newOrder = reorderList(
                questionSection.questions,
                rowFrom,
                rowTo
            );
            setMousePos(mouse);
            setQuestionSection({ ...questionSection, questions: newOrder });
        }
    };

    const handleAddNewSection = () => {
        onSaveTopic(questionSection);
        onFinish();
    };

    return (
        <form
            onSubmit={handleAddNewQuestion}
            className="border border-gray-300 rounded-md"
        >
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
                <ul
                    className={`flex flex-col gap-[${padding}px] items-start relative transition-all duration-200`}
                    style={{
                        height: `${
                            questionSection?.questions.length * (220 + 24)
                        }px`,
                    }}
                    onMouseMove={handleMouseMove}
                >
                    {questionSection.questions?.map((item, index) => {
                        let x = 0;
                        let y = index * (itemHeight + padding);
                        let scale = 1;

                        let isActive = index === selected && isPressing;
                        if (isActive) {
                            x = mousePos.x;
                            y = mousePos.y;
                            scale = 1.01;
                        }

                        return (
                            <li
                                key={item.id}
                                className={`w-full h-[${itemHeight}px] absolute`}
                                style={{
                                    transform: `translate3d(${x}px,${y}px, 0) scale(${scale})`,
                                    zIndex: `${
                                        isActive
                                            ? 1000
                                            : questionSection.questions.length -
                                              index
                                    }`,
                                    transition: isActive
                                        ? ""
                                        : "transform 200ms ease-in-out",
                                }}
                            >
                                {QuestionItem(item, isActive, x, y)}
                            </li>
                        );
                    })}
                </ul>
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
                    <Button type="submit" onClick={handleAddNewSection}>
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
        </form>
    );
};

export default AddNewQuestionSection;
