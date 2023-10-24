import dynamic from "next/dynamic";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { Button, CustomInput } from "@/components";
import { useTranslation } from "@/components/InternationalizationProvider";
import {
    IEditEmailTemplatesDto,
    IEmailTemplatesDto,
} from "@/services/email-template/email-template.interface";

import { Locale } from "../../../../../../../../../i18n.config";

const EmailEditorNoSSR = dynamic(() => import("./EmailEditor"), {
    ssr: false,
    loading: () => <div className="bg-white min-h-[220px]"></div>,
});

interface IUpdateEmailTemplate {
    data: IEmailTemplatesDto;
    onSaveChanges: () => void;
    onCancel: () => void;
}

const UpdateEmailTemplate: React.FC<IUpdateEmailTemplate> = ({
    onSaveChanges,
    onCancel,
    data,
}) => {
    const { lang } = useParams();
    const t = useTranslation(
        lang as Locale,
        "settings.templates.email_template_list.update_email_template"
    );

    const [form, setForm] = useState<IEditEmailTemplatesDto>({
        templateId: data.id,
        name: data.name,
        title: data.title,
        content: data.content,
        organizationId: data.organizationId,
        parameters: data.parameters,
        emailTypeId: data.emailTypeId,
    });

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
                <CustomInput
                    type="text"
                    title={t.form.name.label}
                    value={form.name}
                    onChange={(e: any) =>
                        setForm({ ...form, name: e.target.value })
                    }
                    required
                />
                <div></div>
            </div>
            <div className="grid grid-cols-2 mb-4 gap-4">
                <CustomInput
                    type="text"
                    title={t.form.title.label}
                    value={form.title}
                    onChange={(e: any) =>
                        setForm({ ...form, title: e.target.value })
                    }
                />
                <CustomInput type="text" title={t.form.industry.label} />
            </div>
            <div className="p-4 bg-slate-200 border border-gray-300 mb-4 rounded-md overflow-hidden">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span className="text-red-500 mr-1">*</span>
                    {t.form.body.label}
                </label>
                <EmailEditorNoSSR
                    value={form.content}
                    onChange={content => setForm({ ...form, content: content })}
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
