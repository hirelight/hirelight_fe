"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

import {
    Button,
    CustomInput,
    Modal,
    PopoverWarning,
    Portal,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setEditingId, setIsAdding } from "@/redux/slices/templates.slice";
import { useOutsideClick } from "@/hooks/useClickOutside";

import datas from "../mock-data.json";

import PreviewModal from "./PreviewModal";
import UpdateEmailTemplate from "./UpdateEmailTemplate";

interface IEmailTemplateCard {
    data: (typeof datas)[0];
}

const EmailTemplateCard: React.FC<IEmailTemplateCard> = ({ data }) => {
    const dispatch = useAppDispatch();
    const { editingId, isAdding } = useAppSelector(
        state => state.templates.emailTemplates
    );

    const [showPreview, setShowPreview] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const warningRef = useOutsideClick<HTMLDivElement>(() =>
        setShowWarning(false)
    );
    const deleteWarningRef = useOutsideClick<HTMLDivElement>(() =>
        setShowDeleteWarning(false)
    );

    const handleProceed = () => {
        dispatch(setEditingId(data.id));
        if (isAdding) dispatch(setIsAdding(false));

        setShowWarning(false);
    };

    return (
        <div>
            <Portal>
                <PreviewModal
                    isOpen={showPreview}
                    onClose={() => setShowPreview(false)}
                    data={data}
                />
            </Portal>

            <div
                className={`py-4 px-6 flex justify-between group ${
                    editingId === data.id || showWarning
                        ? "bg-orange-100"
                        : "hover:bg-orange-100"
                }`}
            >
                <h4 className="text-sm text-neutral-700 font-semibold">
                    {data.name}
                </h4>
                {editingId !== data.id && (
                    <div
                        className={`group-hover:opacity-100 ${
                            showWarning || showDeleteWarning
                                ? "opacity-100"
                                : "opacity-0"
                        }`}
                    >
                        <div className="flex gap-4">
                            <button
                                type="button"
                                tabIndex={-1}
                                className="text-sm text-blue_primary_700 font-semibold hover:text-blue_primary_800 hover:underline"
                                onClick={() => setShowPreview(true)}
                            >
                                Preview
                            </button>
                            <div ref={warningRef}>
                                <PopoverWarning
                                    show={showWarning}
                                    content="You have unsaved changes that will
                                    be lost if you proceed."
                                    onConfirm={handleProceed}
                                    onCancel={() => setShowWarning(false)}
                                    cancelButton={
                                        <button
                                            type="button"
                                            className="border border-gray-600 py-2.5 px-10 rounded-md hover:bg-slate-200 text-neutral-700"
                                        >
                                            Keep
                                        </button>
                                    }
                                >
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="text-sm text-blue_primary_700 font-semibold hover:text-blue_primary_800 hover:underline"
                                        onClick={() => {
                                            if (editingId >= 0 || isAdding) {
                                                setShowWarning(true);
                                            } else {
                                                dispatch(setEditingId(data.id));
                                            }
                                        }}
                                    >
                                        Edit
                                    </button>
                                </PopoverWarning>
                            </div>
                            <div ref={deleteWarningRef}>
                                <PopoverWarning
                                    show={showDeleteWarning}
                                    content="Are you sure you want to delete this message template?"
                                    onConfirm={() => {
                                        setShowDeleteWarning(false);
                                    }}
                                    onCancel={() => setShowDeleteWarning(false)}
                                    confirmButton={
                                        <Button className="px-10 bg-red-600 hover:bg-red-700">
                                            Delete
                                        </Button>
                                    }
                                    cancelButton={
                                        <button
                                            type="button"
                                            className="border border-gray-600 py-2.5 px-10 rounded-md hover:bg-slate-200 text-neutral-700"
                                        >
                                            Keep
                                        </button>
                                    }
                                >
                                    <button
                                        type="button"
                                        tabIndex={-1}
                                        className="text-sm text-red-600 font-semibold hover:text-red-700 hover:underline"
                                        onClick={() =>
                                            setShowDeleteWarning(true)
                                        }
                                    >
                                        Delete
                                    </button>
                                </PopoverWarning>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailTemplateCard;
