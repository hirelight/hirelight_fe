"use client";

import {
    Bars3Icon,
    ChevronDownIcon,
    PlusCircleIcon,
} from "@heroicons/react/24/solid";
import React from "react";
import {
    animate,
    AnimatePresence,
    motion,
    Reorder,
    useDragControls,
    useMotionValue,
    useMotionValueEvent,
} from "framer-motion";
import dynamic from "next/dynamic";

import styles from "./FiedCard.module.scss";
import { useRaisedShadow } from "./use-raised-boxshadow";

const EditField = dynamic(() => import("./EditField"));
const AddField = dynamic(() => import("./AddField"));

type FieldCardProps = {
    data: any;
};
const FieldCard: React.FC<FieldCardProps> = ({ data }) => {
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    const dragControls = useDragControls();

    const [isEditing, setIsEditing] = React.useState(false);
    const [isAdding, setIsAdding] = React.useState(false);

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
                        onClick={() => setIsAdding(!isAdding)}
                    >
                        <PlusCircleIcon className="w-5 h-5" />
                    </button>
                </div>

                <button
                    type="button"
                    className={`transition-transform duration-300 ${
                        isEditing ? "rotate-180" : ""
                    }`}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    <ChevronDownIcon className="w-5 h-5" />
                </button>
            </div>
            <AnimatePresence>{isEditing && <EditField />}</AnimatePresence>
            <AnimatePresence>{isAdding && <AddField />}</AnimatePresence>
        </Reorder.Item>
    );
};

export default FieldCard;
