import { Bars3Icon } from "@heroicons/react/24/solid";
import {
    Reorder,
    useDragControls,
    useMotionValue,
    m,
    AnimatePresence,
    LazyMotion,
    domAnimation,
} from "framer-motion";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import { useRaisedShadow } from "@/hooks/use-raised-boxshadow";
import {
    AssessmentTypeKey,
    AssessmentTypes,
} from "@/interfaces/assessment.interface";
import { IAssessmentFlow } from "@/services/assessment-flows/assessment-flows.interface";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import FlowStageForm from "./FlowStageForm";

const defaultStage: AssessmentTypeKey[] = [
    "SOURCED_ASSESSMENT",
    "HIRED_ASSESSMENT",
];

type AssessmentFlowCardProps = {
    data: IAssessmentFlow;
    updateStage: (updateStage: any) => void;
    deleteStage: () => void;
};

const AssessmentFlowCard: React.FC<AssessmentFlowCardProps> = ({
    data,
    updateStage,
    deleteStage,
}) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale);
    const dragControls = useDragControls();
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);

    const [showEdit, setShowEdit] = useState(false);

    const handleUpdateStage = (updatedData: any) => {
        updateStage(updatedData);
        setShowEdit(false);
    };

    return (
        <>
            <Reorder.Item
                value={data}
                className={`relative bg-gray-100 p-4`}
                style={{ y, boxShadow }}
                dragListener={false}
                dragControls={dragControls}
            >
                <div className={`flex items-center gap-2 group`}>
                    <button
                        type="button"
                        className={`hover:cursor-move ${
                            defaultStage.includes(data.assessmentType)
                                ? "hover:cursor-not-allowed"
                                : ""
                        }`}
                        onPointerDown={event => {
                            if (
                                defaultStage.includes(data.assessmentType) ||
                                showEdit
                            )
                                return;
                            dragControls.start(event);
                        }}
                    >
                        <Bars3Icon className="w-5 h-5" />
                    </button>
                    <div className="flex-1">{data.name}</div>
                    {!defaultStage.includes(data.assessmentType) && (
                        <div className="flex items-center gap-4 invisible group-hover:visible text-sm font-semibold">
                            <button
                                type="button"
                                className="text-blue_primary_700 hover:text-blue_primary_800 hover:underline "
                                onClick={() => setShowEdit(true)}
                            >
                                {t("common:edit")}
                            </button>
                            <button
                                type="button"
                                className="text-red-600 hover:underline hover:text-red-700"
                                onClick={deleteStage}
                            >
                                {t("common:Delete")}
                            </button>
                        </div>
                    )}
                </div>
            </Reorder.Item>
            <LazyMotion features={domAnimation}>
                <AnimatePresence>
                    {showEdit && (
                        <m.div
                            initial={{
                                height: 0,
                                opacity: 0,
                            }}
                            animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                    ease: "easeOut",
                                    duration: 0.15,
                                    opacity: {
                                        delay: 0.15,
                                        duration: 0.2,
                                    },
                                },
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                    ease: "easeIn",
                                    duration: 0.2,
                                    height: {
                                        delay: 0.2,
                                        duration: 0.15,
                                    },
                                },
                            }}
                        >
                            <FlowStageForm
                                data={data}
                                onSave={data => handleUpdateStage(data)}
                                onCancel={() => setShowEdit(false)}
                            />
                        </m.div>
                    )}
                </AnimatePresence>
            </LazyMotion>
        </>
    );
};

export default AssessmentFlowCard;
