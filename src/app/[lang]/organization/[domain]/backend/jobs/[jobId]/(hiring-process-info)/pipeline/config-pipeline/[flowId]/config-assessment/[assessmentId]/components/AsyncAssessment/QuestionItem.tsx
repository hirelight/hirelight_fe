"use client";

import React from "react";
import { useDragControls, useMotionValue } from "framer-motion";

import { DragIndicatorIcon } from "@/icons";

import { AsyncQuestionType } from "./AsyncVideoForm";

type QuestionItemProps = {
    data?: AsyncQuestionType;
    onChange: (value: {
        id: string;
        name: string;
        config: {
            thinkTime: string;
            numOfTakes: string;
            duration: string;
        };
    }) => void;
    onDelete: () => void;
};

const QuestionItem: React.FC<QuestionItemProps> = ({
    data,
    onChange,
    onDelete,
}) => {
    const dragControls = useDragControls();
    const y = useMotionValue(0);

    return (
        <div className={`flex gap-2 items-stretch h-full`}>
            <button
                type="button"
                className={`p-4 h-fit cursor-move`}
                onPointerDown={event => dragControls.start(event)}
            >
                <DragIndicatorIcon className="w-6 h-6 text-blue_primary_600 hover:text-blue_primary_800 focus:text-blue_primary_800" />
            </button>
        </div>
    );
};

export default QuestionItem;
