"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setEditingId, setIsAdding } from "@/redux/slices/templates.slice";
import { Button, PopoverWarning } from "@/components";
import { useOutsideClick } from "@/hooks/useClickOutside";

import styles from "../styles.module.scss";

const TemplatesTitleSection = () => {
    const dispatch = useAppDispatch();

    const [showWarning, setShowWarning] = useState(false);

    const warningRef = useOutsideClick<HTMLDivElement>(() =>
        setShowWarning(false)
    );

    const { editingId } = useAppSelector(
        state => state.templates.emailTemplates
    );

    const handleProceed = () => {
        dispatch(setIsAdding(true));
        dispatch(setEditingId(-1));

        setShowWarning(false);
    };

    return (
        <div className="flex justify-between">
            <h2 className={styles.section__title}>Communication Templates</h2>

            <div ref={warningRef}>
                <PopoverWarning
                    show={showWarning}
                    content="You have unsaved changes that will be lost if you
                proceed."
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
                        className="flex items-center gap-1 text-blue_primary_700 hover:text-blue_primary_800 hover:underline"
                        onClick={() => {
                            if (editingId > 0) {
                                setShowWarning(true);
                            } else dispatch(setIsAdding(true));
                        }}
                    >
                        <PlusCircleIcon className="w-5 h-5 inline" />
                        <span>Add a new template</span>
                    </button>
                </PopoverWarning>
            </div>
        </div>
    );
};

export default TemplatesTitleSection;
