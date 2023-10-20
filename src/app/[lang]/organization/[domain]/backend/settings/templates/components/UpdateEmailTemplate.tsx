import dynamic from "next/dynamic";
import React from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { Button, CustomInput } from "@/components";
import { useTranslation } from "@/components/InternationalizationProvider";

import { Locale } from "../../../../../../../../../i18n.config";

const EmailEditorNoSSR = dynamic(() => import("./EmailEditor"), {
    ssr: false,
    loading: () => <div className="bg-white min-h-[220px]"></div>,
});

interface IUpdateEmailTemplate {
    data: any;
    onSaveChanges: () => void;
    onCancel: () => void;
}

const UpdateEmailTemplate: React.FC<IUpdateEmailTemplate> = ({
    onSaveChanges,
    onCancel,
}) => {
    const { lang } = useParams();
    const t = useTranslation(
        lang as Locale,
        "settings.templates.email_template_list.update_email_template"
    );

    const handleSaveChanges = () => {
        toast.info(`Update email template!`, {
            position: "bottom-right",
        });
        onSaveChanges();
    };

    return (
        <div>
            {" "}
            <div className="grid grid-cols-2 mb-4 gap-4">
                <CustomInput type="text" title={t.form.name.label} required />
                <div></div>
            </div>
            <div className="grid grid-cols-2 mb-4 gap-4">
                <CustomInput type="text" title={t.form.department.label} />
                <CustomInput type="text" title={t.form.industry.label} />
            </div>
            <div className="p-4 bg-slate-200 border border-gray-300 mb-4 rounded-md overflow-hidden">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span className="text-red-500 mr-1">*</span>
                    {t.form.body.label}
                </label>
                <EmailEditorNoSSR
                    onChange={() => {}}
                    className="bg-white min-h-[220px]"
                />
            </div>
            <div className="flex">
                <Button onClick={handleSaveChanges} className="mr-4">
                    {t.form.btn.save_changes}
                </Button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="text-sm text-neutral-500 font-semibold hover:underline"
                >
                    {t.form.btn.cancel}
                </button>
            </div>
        </div>
    );
};

export default UpdateEmailTemplate;
