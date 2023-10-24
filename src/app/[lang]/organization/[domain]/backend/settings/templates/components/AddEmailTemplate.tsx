"use client";

import dynamic from "next/dynamic";
import React, { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";

import { Button, CustomInput } from "@/components";
import { useTranslation } from "@/components/InternationalizationProvider";
import { ICreateEmailTemplatesDto } from "@/services/email-template/email-template.interface";
import emailTemplateServices from "@/services/email-template/email-template.service";

import { Locale } from "../../../../../../../../../i18n.config";

const EmailEditorNoSSR = dynamic(() => import("./EmailEditor"), {
    ssr: false,
    loading: () => <div className="bg-white min-h-[220px]"></div>,
});

interface IAddEmailTemplate {
    onSaveTemplate: () => void;
    onCancel: () => void;
}

const AddEmailTemplate: React.FC<IAddEmailTemplate> = ({
    onSaveTemplate,
    onCancel,
}) => {
    const { lang } = useParams();
    const t = useTranslation(
        lang as Locale,
        "settings.templates.templates_header_section.add_email_template"
    );

    const [form, setForm] = useState<ICreateEmailTemplatesDto>({
        name: "",
        title: "",
        content: "",
        organizationId: 1,
        parameters: "kkk",
        emailTypeId: 1,
    });

    const handleCreateNewTemplate = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await emailTemplateServices.createAsync(form);
            console.log(res);
            toast.success(res.message);
            onSaveTemplate();
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
            onSaveTemplate();
        }
    };

    return (
        <form onSubmit={handleCreateNewTemplate}>
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
                <Button type="submit" className="mr-4">
                    {t.form.btn.save_template}
                </Button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="text-sm text-neutral-500 font-semibold hover:underline"
                >
                    {t.form.btn.cancel}
                </button>
            </div>
        </form>
    );
};

export default AddEmailTemplate;
