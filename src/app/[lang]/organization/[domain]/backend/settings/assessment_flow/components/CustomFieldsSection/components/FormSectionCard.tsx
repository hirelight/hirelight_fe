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

import { useRaisedShadow } from "@/hooks/use-raised-boxshadow";
import { DragIndicatorIcon } from "@/icons";
import {
    IAddNewField,
    IAppFormTemplateProfileSection,
} from "@/interfaces/app-form-template.interface";

import { useAppFormTemplate } from "..";

import styles from "./FormSectionCard.module.scss";

const FieldList = dynamic(() => import("./FieldList"));
const AddField = dynamic(() => import("./AddField"));

type FormSectionCardProps = {
    data: IAppFormTemplateProfileSection;
    reorderFields: (newOrder: any[]) => void;
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

    const { setAppFormTemplate } = useAppFormTemplate();

    const handleDeleteSection = () => {
        setAppFormTemplate(prev => ({
            ...prev,
            content: {
                ...prev.content,
                profile: prev.content.profile.filter(
                    section => section.id !== data.id
                ),
            },
        }));
    };

    const handleAddNewField = (newField: IAddNewField) => {
        setAppFormTemplate(prev => ({
            ...prev,
            content: {
                profile: prev.content.profile.map(section =>
                    section.id === data.id
                        ? {
                              ...section,
                              fields: section.fields.concat(newField.newField),
                          }
                        : section
                ),
                app_form: prev.content.app_form.map(section =>
                    section.id === newField.appFormSectionId
                        ? {
                              ...section,
                              fields: section.fields.concat(newField.newField),
                          }
                        : section
                ),
            },
        }));
    };

    return (
        <Reorder.Item
            id={data.id}
            value={data}
            className={`${styles.field__item__card} overflow-hidden`}
            style={{ y, boxShadow }}
            dragListener={false}
            dragControls={dragControls}
        >
            <div
                className={`${styles.field__item__card__header} group hover:bg-blue-100`}
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
                    <DragIndicatorIcon className="w-5 h-5 text-neutral-700" />
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
                {data.custom && data.fields.length === 0 ? (
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                            onClick={handleDeleteSection}
                        >
                            Delete
                        </button>
                    </div>
                ) : (
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
                )}
            </div>
            <div className="mx-4">
                <AnimatePresence>
                    {isExpand && (
                        <FieldList
                            datas={data.fields}
                            reorderFields={reorderFields}
                        />
                    )}
                </AnimatePresence>
                <LazyMotion features={domAnimation} strict>
                    <AnimatePresence>
                        {isAdding && isExpand && (
                            <AddField
                                onAdd={newField => {
                                    handleAddNewField(newField);
                                    setIsAdding(false);
                                }}
                                onCancel={() => setIsAdding(false)}
                            />
                        )}
                    </AnimatePresence>
                </LazyMotion>
            </div>
        </Reorder.Item>
    );
};

export default FormSectionCard;
