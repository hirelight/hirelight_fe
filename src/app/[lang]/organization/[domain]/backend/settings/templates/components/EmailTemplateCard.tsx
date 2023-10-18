"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";

import { Button, CustomInput, Modal, Portal } from "@/components";

import datas from "../mock-data.json";

import PreviewModal from "./PreviewModal";

const EmailEditorNoSSR = dynamic(() => import("./EmailEditor"), {
    ssr: false,
});

interface IEmailTemplateCard {
    data: (typeof datas)[0];
}

const EmailTemplateCard: React.FC<IEmailTemplateCard> = ({ data }) => {
    const [showPreview, setShowPreview] = useState(false);
    const [editing, setEditing] = useState(false);

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
                className={`py-4 px-6 flex justify-between group hover:bg-orange-100 bg-opacity-60 ${
                    editing ? "bg-orange-100" : ""
                }`}
            >
                <h4 className="text-sm text-neutral-700 font-semibold">
                    {data.name}
                </h4>
                {!editing && (
                    <div className="opacity-0 group-hover:opacity-100">
                        <div className="flex gap-4">
                            <button
                                type="button"
                                tabIndex={-1}
                                className="hover:underline text-sm text-blue_primary_700 font-semibold"
                                onClick={() => setShowPreview(true)}
                            >
                                Preview
                            </button>
                            <button
                                type="button"
                                tabIndex={-1}
                                className="hover:underline text-sm text-blue_primary_700 font-semibold"
                                onClick={() => setEditing(true)}
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                tabIndex={-1}
                                className="hover:underline text-sm text-red-600 font-semibold"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {editing && (
                <div className="p-6">
                    <div className="grid grid-cols-2 mb-4 gap-4">
                        <CustomInput type="text" title="Name" required />
                        <div></div>
                    </div>
                    <div className="grid grid-cols-2 mb-4 gap-4">
                        <CustomInput type="text" title="Department" />
                        <CustomInput type="text" title="Department" />
                    </div>
                    <div className="p-4 bg-slate-200 border border-gray-300 mb-4 rounded-md overflow-hidden">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            <span className="text-red-500 mr-1">*</span>
                            Body
                        </label>
                        <EmailEditorNoSSR
                            onChange={() => {}}
                            className="bg-white min-h-[220px]"
                        />
                    </div>

                    <div className="flex">
                        <Button
                            onClick={() => setEditing(false)}
                            className="mr-4"
                        >
                            Save template
                        </Button>

                        <button
                            type="button"
                            onClick={() => setEditing(false)}
                            className="text-sm text-neutral-500 font-semibold hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EmailTemplateCard;
