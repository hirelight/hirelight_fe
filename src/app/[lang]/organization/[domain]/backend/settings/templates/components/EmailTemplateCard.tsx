"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

import { Button, CustomInput, Modal, Portal } from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setEditingId } from "@/redux/slices/templates.slice";

import datas from "../mock-data.json";

import PreviewModal from "./PreviewModal";
import UpdateEmailTemplate from "./UpdateEmailTemplate";

interface IEmailTemplateCard {
    data: (typeof datas)[0];
}

const EmailTemplateCard: React.FC<IEmailTemplateCard> = ({ data }) => {
    const dispatch = useAppDispatch();
    const editingId = useAppSelector(state => state.templates.editingId);

    const [showPreview, setShowPreview] = useState(false);

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
                    editingId === data.id
                        ? "bg-orange-100"
                        : "hover:bg-orange-100"
                }`}
            >
                <h4 className="text-sm text-neutral-700 font-semibold">
                    {data.name}
                </h4>
                <div className="opacity-0 group-hover:opacity-100">
                    <div className="flex gap-4">
                        <button
                            type="button"
                            tabIndex={-1}
                            className="text-sm text-blue_primary_700 font-semibold hover:text-blue_primary_800 hover:underline"
                            onClick={() => setShowPreview(true)}
                        >
                            Preview
                        </button>
                        <button
                            type="button"
                            tabIndex={-1}
                            className="text-sm text-blue_primary_700 font-semibold hover:text-blue_primary_800 hover:underline"
                            onClick={() => {
                                if (editingId >= 0) {
                                    const answer = confirm(
                                        "You have unsaved changes that will be lost if you proceed."
                                    );
                                    if (answer) dispatch(setEditingId(data.id));
                                } else {
                                    dispatch(setEditingId(data.id));
                                }
                            }}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            tabIndex={-1}
                            className="text-sm text-red-600 font-semibold hover:text-red-700 hover:underline"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplateCard;
