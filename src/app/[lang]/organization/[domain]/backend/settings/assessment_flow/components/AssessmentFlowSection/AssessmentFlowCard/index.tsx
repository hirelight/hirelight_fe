import { Bars3Icon } from "@heroicons/react/24/solid";
import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import React from "react";

import { useRaisedShadow } from "@/hooks/use-raised-boxshadow";
import { AssessmentType } from "@/interfaces/assessment.interface";

type AssessmentFlowCardProps = {
    data: any;
};

const AssessmentFlowCard: React.FC<AssessmentFlowCardProps> = ({ data }) => {
    const dragControls = useDragControls();
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);

    return (
        <Reorder.Item
            value={data}
            className={`relative bg-gray-100 p-4 flex items-center gap-2 group`}
            style={{ y, boxShadow }}
            dragListener={false}
            dragControls={dragControls}
        >
            <button
                type="button"
                className={`hover:cursor-move ${
                    [AssessmentType.Hired, AssessmentType.Sourced].includes(
                        data.type
                    )
                        ? "hover:cursor-not-allowed"
                        : ""
                }`}
                onPointerDown={event => {
                    if (
                        [AssessmentType.Hired, AssessmentType.Sourced].includes(
                            data.type
                        )
                    )
                        return;
                    dragControls.start(event);
                }}
            >
                <Bars3Icon className="w-5 h-5" />
            </button>
            <div className="flex-1">{data.name}</div>
            {![AssessmentType.Hired, AssessmentType.Sourced].includes(
                data.type
            ) && (
                <div className="flex items-center gap-4 invisible group-hover:visible text-sm font-semibold">
                    <button
                        type="button"
                        className="text-blue_primary_700 hover:text-blue_primary_800 hover:underline "
                    >
                        Edit
                    </button>
                    <button
                        type="button"
                        className="text-red-600 hover:underline hover:text-red-700"
                    >
                        Delete
                    </button>
                </div>
            )}
        </Reorder.Item>
    );
};

export default AssessmentFlowCard;
