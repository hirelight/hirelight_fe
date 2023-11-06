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
import React, { useState } from "react";

import { DragIndicatorIcon } from "@/icons";
import { useRaisedShadow } from "@/hooks/use-raised-boxshadow";

import styles from "./SectionFieldCard.module.scss";

const unOrderList = ["Name", "Email", "Headline"];

type SectionFieldCardProps = {
    data: any;
};

const SectionFieldCard: React.FC<SectionFieldCardProps> = ({ data }) => {
    const dragControls = useDragControls();
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);

    return (
        <Reorder.Item
            value={data}
            id={data.id}
            className={`bg-white relative group border-b border-gray-300 last:border-b-0 group`}
            style={{ y, boxShadow }}
            dragListener={false}
            dragControls={dragControls}
        >
            <div className={`${styles.card__container}`}>
                <button
                    type="button"
                    onPointerDown={event => {
                        dragControls.start(event);
                    }}
                    className={`cursor-grab ${
                        unOrderList.includes(data.label)
                            ? "pointer-events-none invisible"
                            : ""
                    }`}
                >
                    <DragIndicatorIcon className="w-5 h-5" />
                </button>
                <div className="flex-1 flex flex-col gap-2 text-neutral-700 text-sm">
                    <span>{data.label}</span>
                </div>
            </div>
        </Reorder.Item>
    );
};

export default SectionFieldCard;
