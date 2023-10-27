import { Bars3Icon } from "@heroicons/react/24/solid";
import {
    AnimatePresence,
    Reorder,
    useDragControls,
    useMotionValue,
    m,
    LazyMotion,
    domAnimation,
} from "framer-motion";
import dynamic from "next/dynamic";
import React, { useState } from "react";

import styles from "./FieldCard.module.scss";

const EditField = dynamic(() => import("./EditField"), {
    loading: () => (
        <div className="my-4 p-6 border border-gray-300 rounded min-h-[360px]"></div>
    ),
});

type FieldCardProps = {
    data: any;
};

const FieldCard: React.FC<FieldCardProps> = ({ data }) => {
    const dragControls = useDragControls();
    const y = useMotionValue(0);

    const [isEditing, setIsEditing] = useState(false);

    return (
        <Reorder.Item
            value={data}
            id={data.id}
            className={`mx-4 bg-white relative group ${
                isEditing ? "" : "border-b"
            } border-gray-300 last:border-b-0 group`}
            style={{ y }}
            dragListener={false}
            dragControls={dragControls}
        >
            <AnimatePresence initial={false}>
                <LazyMotion features={domAnimation} strict>
                    {!isEditing && (
                        <m.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div
                                className={`${styles.card__container} px-6 py-4 hover:bg-blue-100`}
                            >
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
                                <div className="flex-1 flex flex-col gap-2 text-neutral-700 text-sm">
                                    <span>{data.label}</span>
                                </div>
                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="text-sm text-blue_primary_700 font-semibold hover:text-blue_primary_800 hover:underline"
                                        onClick={() => {}}
                                    >
                                        Move
                                    </button>
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="text-sm text-blue_primary_700 font-semibold hover:text-blue_primary_800 hover:underline"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="text-sm text-red-600 font-semibold hover:text-red-700 hover:underline"
                                        onClick={() => {}}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </m.div>
                    )}
                </LazyMotion>
            </AnimatePresence>
            <LazyMotion features={domAnimation} strict>
                <AnimatePresence>
                    {isEditing && (
                        <EditField
                            data={data}
                            onUpdate={() => setIsEditing(false)}
                            onCancel={() => setIsEditing(false)}
                        />
                    )}
                </AnimatePresence>
            </LazyMotion>
        </Reorder.Item>
    );
};

export default FieldCard;
