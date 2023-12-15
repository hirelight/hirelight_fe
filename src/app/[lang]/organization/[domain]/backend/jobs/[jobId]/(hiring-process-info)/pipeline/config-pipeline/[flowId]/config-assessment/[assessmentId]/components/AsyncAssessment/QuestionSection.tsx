import {
    ArrowDownIcon,
    ArrowUpIcon,
    PencilIcon,
    TrashIcon,
    VideoCameraIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import { produce } from "immer";
import { useParams } from "next/navigation";

import { humanReadable } from "@/helpers";
import { sanitizeHtml } from "@/helpers/sanitizeHTML";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import AddNewQuestionSection, {
    numOfTakes,
    thinkTime,
} from "./AddNewQuestionSection";
import { AsyncQuestionType } from "./AsyncVideoForm";

interface IQuestionSection {
    data: AsyncQuestionType;
    onUpdate: (updatedSection: AsyncQuestionType) => void;
    onDelete: () => void;
    datas: AsyncQuestionType[];
    onReorder: (newOrder: any[]) => void;
}

const QuestionSection = ({
    data,
    onUpdate,
    datas,
    onReorder,
    onDelete,
}: IQuestionSection) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "assessment");
    const [showEdit, setShowEdit] = React.useState(false);

    const handleMoveUp = () => {
        const index = datas.indexOf(data);
        onReorder(
            produce(datas, draft => {
                const temp = draft[index - 1];
                if (temp) {
                    draft[index - 1] = draft[index];
                    draft[index] = temp;
                }
            })
        );
    };

    const handleMoveDown = () => {
        const index = datas.indexOf(data);
        onReorder(
            produce(datas, draft => {
                const temp = draft[index + 1];
                if (temp) {
                    draft[index + 1] = draft[index];
                    draft[index] = temp;
                }
            })
        );
    };

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
                <div className="w-full flex items-center gap-4 text-neutral-500">
                    <button type="button" onClick={handleMoveUp}>
                        <ArrowUpIcon className="w-6 h-6" />
                    </button>
                    <button type="button" onClick={handleMoveDown}>
                        <ArrowDownIcon className="w-6 h-6" />
                    </button>

                    <div className="flex-1">
                        {data.content.video && (
                            <VideoCameraIcon className="w-6 h-6" />
                        )}
                    </div>
                    <button
                        type="button"
                        className="group"
                        onClick={() => setShowEdit(true)}
                    >
                        <PencilIcon className="w-6 h-6 group-hover:text-neutral-700" />
                    </button>
                    <button type="button" className="group" onClick={onDelete}>
                        <TrashIcon className="w-6 h-6 text-red-400 group-hover:text-red-600" />
                    </button>
                </div>
            </div>
            <div
                key={data.id}
                className="border-b last:border-b-0 border-slate-200 text-neutral-700 flex items-stretch"
            >
                <div className="max-w-full flex-1 flex items-center justify-between gap-8 p-4">
                    <div className="w-3/5 overflow-hidden flex gap-1">
                        <div
                            className="inline-block text-ellipsis ql-editor !p-0"
                            dangerouslySetInnerHTML={{
                                __html: sanitizeHtml(data.content.name),
                            }}
                        ></div>
                    </div>
                    <div className="flex-1 flex-shrink-0 flex items-center justify-end gap-2 w-fit ml-auto text-sm uppercase font-semibold whitespace-nowrap">
                        <span className="py-1 px-2.5 rounded-full bg-green-200 text-green-700">
                            {thinkTime.get(data.content.config?.thinkTime ?? 0)}
                        </span>
                        <span className="py-1 px-2.5 rounded-full bg-blue-200 text-blue_primary_800">
                            {
                                humanReadable(
                                    data.content.config?.duration ?? 0
                                ).minutes
                            }{" "}
                            {t("mis_to_answer")}
                        </span>
                        <span className="py-1 px-2.5 rounded-full bg-gray-200 text-gray-700">
                            {numOfTakes.get(
                                data.content.config?.numOfTakes ?? 0
                            )}{" "}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionSection;
