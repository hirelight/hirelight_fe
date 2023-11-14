"use client";

import { PlusCircleIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import { useParams } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setEditingId, setIsAdding } from "@/redux/slices/templates.slice";
import { Button, PopoverWarning } from "@/components";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { useTranslation } from "@/components/InternationalizationProvider";

import styles from "../styles.module.scss";
import { Locale } from "../../../../../../../../../i18n.config";

const TemplatesTitleSection = () => {
    const dispatch = useAppDispatch();
    const { lang } = useParams();
    const [showWarning, setShowWarning] = useState(false);
    const t = useTranslation(
        lang as Locale,
        "settings.templates.templates_title_section"
    );

    const warningRef = useOutsideClick<HTMLDivElement>(() =>
        setShowWarning(false)
    );

    const { editingId } = useAppSelector(
        state => state.templates.emailTemplates
    );

    const handleProceed = () => {
        dispatch(setIsAdding(true));
        dispatch(setEditingId(""));

        setShowWarning(false);
    };

    return (
        <div className="flex justify-between">
            <h2 className={styles.section__title}>{t.title}</h2>

            <div ref={warningRef}>
                <PopoverWarning
                    show={showWarning}
                    content={t.popover.warning.content}
                    onConfirm={handleProceed}
                    onCancel={() => setShowWarning(false)}
                    cancelButton={
                        <button
                            type="button"
                            className="border border-gray-600 py-2.5 px-10 rounded-md hover:bg-slate-200 text-neutral-700"
                        >
                            {t.popover.warning.btn.cancel}
                        </button>
                    }
                >
                    <button
                        type="button"
                        className="flex items-center gap-1 text-blue_primary_700 hover:text-blue_primary_800 hover:underline"
                        onClick={() => {
                            if (editingId) {
                                setShowWarning(true);
                            } else dispatch(setIsAdding(true));
                        }}
                    >
                        <PlusCircleIcon className="w-5 h-5 inline" />
                        <span>{t.btn.add_new_template}</span>
                    </button>
                </PopoverWarning>
            </div>
        </div>
    );
};

export default TemplatesTitleSection;
