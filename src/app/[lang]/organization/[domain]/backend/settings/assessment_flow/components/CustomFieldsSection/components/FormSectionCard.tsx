"use client";

import {
    Bars3Icon,
    ChevronDownIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import {
    AnimatePresence,
    LazyMotion,
    Reorder,
    domAnimation,
    domMax,
    useDragControls,
    useMotionValue,
} from "framer-motion";
import dynamic from "next/dynamic";

import styles from "./FormSectionCard.module.scss";
import { useRaisedShadow } from "./use-raised-boxshadow";

const FieldList = dynamic(() => import("./FieldList"));
const AddField = dynamic(() => import("./AddField"));

type FormSectionCardProps = {
    data: any;
    reorderFields: (newOrder: any) => void;
};
const FormSectionCard: React.FC<FormSectionCardProps> = ({
    data,
    reorderFields,
}) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();

    const [isEditing, setIsEditing] = React.useState(false);
    const [isAdding, setIsAdding] = React.useState(false);
    const [isExpand, setIsExpand] = React.useState(false);

    return (
        <Reorder.Item
            value={data}
            id={data.id}
            className={`${styles.field__item__card}`}
            style={{ y, boxShadow }}
            dragListener={false}
            dragControls={dragControls}
        >
            <div className={`${styles.field__item__card__header} group`}>
                <button
                    type="button"
                    className={
                        isEditing
                            ? "text-neutral-500 cursor-not-allowed"
                            : "cursor-grab"
                    }
                    onPointerDown={event => {
                        if (isEditing) return;
                        dragControls.start(event);
                    }}
                >
                    <Bars3Icon className="w-5 h-5" />
                </button>
                <div className="flex-1 flex items-center gap-2">
                    <span>{data.label}</span>
                    <button
                        type="button"
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-blue_primary_700 duration-500"
                        onClick={() => {
                            setIsExpand(true);
                            setIsAdding(!isAdding);
                        }}
                    >
                        <PlusCircleIcon className="w-5 h-5" />
                    </button>
                </div>

                <button
                    type="button"
                    className={`transition-transform duration-300 ${
                        isExpand ? "rotate-180" : ""
                    }`}
                    onClick={() => {
                        if (!isAdding) setIsExpand(!isExpand);
                    }}
                >
                    <ChevronDownIcon className="w-5 h-5" />
                </button>
            </div>
            <AnimatePresence>
                {isExpand && (
                    <FieldList
                        datas={data.fields}
                        reorderFields={reorderFields}
                    />
                )}
            </AnimatePresence>
            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {isAdding && isExpand && <AddField />}
                </AnimatePresence>
            </LazyMotion>
        </Reorder.Item>
    );
};

export default FormSectionCard;
