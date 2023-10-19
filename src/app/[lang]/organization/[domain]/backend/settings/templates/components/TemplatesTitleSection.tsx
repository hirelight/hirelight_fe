"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setEditingId, setIsAdding } from "@/redux/slices/templates.slice";

import styles from "../styles.module.scss";

const TemplatesTitleSection = () => {
    const dispatch = useAppDispatch();

    const { editingId } = useAppSelector(
        state => state.templates.emailTemplates
    );

    return (
        <div className="flex justify-between">
            <h2 className={styles.section__title}>Communication Templates</h2>
            <button
                type="button"
                className="flex items-center gap-1 text-blue_primary_700 hover:text-blue_primary_800 hover:underline"
                onClick={() => {
                    if (editingId > 0) {
                        const ans = confirm(
                            "You have unsaved changes that will be lost if you proceed."
                        );
                        if (ans) {
                            dispatch(setIsAdding(true));
                            dispatch(setEditingId(-1));
                        }
                    } else dispatch(setIsAdding(true));
                }}
            >
                <PlusCircleIcon className="w-5 h-5 inline" />
                <span>Add a new template</span>
            </button>
        </div>
    );
};

export default TemplatesTitleSection;
