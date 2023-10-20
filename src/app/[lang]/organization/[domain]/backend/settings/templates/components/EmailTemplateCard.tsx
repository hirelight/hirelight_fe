"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";

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
import { useTranslation } from "@/components/InternationalizationProvider";

import datas from "../mock-data.json";
import { Locale } from "../../../../../../../../../i18n.config";

import PreviewModal from "./PreviewModal";
import UpdateEmailTemplate from "./UpdateEmailTemplate";

interface IEmailTemplateCard {
    data: (typeof datas)[0];
}

const EmailTemplateCard: React.FC<IEmailTemplateCard> = ({ data }) => {
    const { lang } = useParams();
    const t = useTranslation(
        lang as Locale,
        "settings.templates.email_template_list.email_template_card"
    );

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
                                {t.btn.preview}
                            </button>
                            <div ref={warningRef}>
                                <PopoverWarning
                                    show={showWarning}
                                    content={t.popover.edit_warning.content}
                                    onConfirm={handleProceed}
                                    onCancel={() => setShowWarning(false)}
                                    cancelButton={
                                        <button
                                            type="button"
                                            className="border border-gray-600 py-2.5 px-10 rounded-md hover:bg-slate-200 text-neutral-700"
                                        >
                                            {t.popover.edit_warning.btn.cancel}
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
                                        {t.btn.edit}
                                    </button>
                                </PopoverWarning>
                            </div>
                            <div ref={deleteWarningRef}>
                                <PopoverWarning
                                    show={showDeleteWarning}
                                    content={t.popover.delete_warning.content}
                                    onConfirm={() => {
                                        setShowDeleteWarning(false);
                                    }}
                                    onCancel={() => setShowDeleteWarning(false)}
                                    confirmButton={
                                        <Button className="px-10 bg-red-600 hover:bg-red-700">
                                            {
                                                t.popover.delete_warning.btn
                                                    .confirm
                                            }
                                        </Button>
                                    }
                                    cancelButton={
                                        <button
                                            type="button"
                                            className="border border-gray-600 py-2.5 px-10 rounded-md hover:bg-slate-200 text-neutral-700"
                                        >
                                            {
                                                t.popover.delete_warning.btn
                                                    .cancel
                                            }
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
                                        {t.btn.delete}
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
