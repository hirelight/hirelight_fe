import {
    ArrowDownIcon,
    ArrowUpIcon,
    PencilIcon,
    QuestionMarkCircleIcon,
    TrashIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import dynamic from "next/dynamic";

import AddNewQuestionSection from "../../components/AddNewQuestionSection";

import { AsyncQuestionType } from "./AsyncVideoForm";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
});

interface IQuestionSection {
    data: AsyncQuestionType;
    onUpdate: (updatedSection: AsyncQuestionType) => void;
}

const QuestionSection = ({ data, onUpdate }: IQuestionSection) => {
    const [showEdit, setShowEdit] = React.useState(false);

    if (showEdit) {
        return (
            <AddNewQuestionSection
                data={data}
                onSaveTopic={(updatedSection: any) => onUpdate(updatedSection)}
                onFinish={() => {
                    setShowEdit(false);
                }}
            />
        );
    }
    return (
        <div className="border border-slate-200 rounded-md">
            <div className="flex justify-between items-center py-6 px-4 border-b border-slate-200">
                {/* <h4 className="text-lg text-neutral-700 flex items-center gap-1">
                    {data.topic}{" "}
                    <div className="inline-flex items-center gap-1 text-neutral-500">
                        <span className="">
                            <QuestionMarkCircleIcon className="w-6 h-6" />
                        </span>
                        <span className="text-sm">
                            {data.questions.length} questions
                        </span>
                    </div>
                </h4> */}
                <div className="inline-flex items-center gap-4 text-neutral-500">
                    <button type="button">
                        <ArrowUpIcon className="w-6 h-6" />
                    </button>
                    <button type="button">
                        <ArrowDownIcon className="w-6 h-6" />
                    </button>
                    <button
                        type="button"
                        className="group"
                        onClick={() => setShowEdit(true)}
                    >
                        <PencilIcon className="w-6 h-6 group-hover:text-neutral-700" />
                    </button>
                    <button type="button" className="group">
                        <TrashIcon className="w-6 h-6 text-red-400 group-hover:text-red-600" />
                    </button>
                </div>
            </div>
            <div
                key={data.id}
                className="border-b last:border-b-0 border-slate-200 text-neutral-700 flex items-stretch"
            >
                <div className="flex-1 flex items-center justify-between gap-8 p-4">
                    <div
                        className="inline-block w-3/5"
                        dangerouslySetInnerHTML={{
                            __html: data.content.name,
                        }}
                    ></div>
                    <div className="flex-1 flex-shrink-0 flex items-center justify-end gap-2 w-fit ml-auto text-sm uppercase font-semibold whitespace-nowrap">
                        <span className="py-1 px-2.5 rounded-full bg-green-200 text-green-700">
                            {data.content.config.thinkTime}
                        </span>
                        <span className="py-1 px-2.5 rounded-full bg-blue-200 text-blue-700">
                            {data.content.config.duration} mins to answer
                        </span>
                        <span className="py-1 px-2.5 rounded-full bg-gray-200 text-gray-700">
                            {data.content.config.numOfTakes} takes
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionSection;
