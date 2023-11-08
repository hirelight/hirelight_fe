"use client";

import dynamic from "next/dynamic";
import React, { FormEvent, createContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, CustomInput } from "@/components";
import { useTranslation } from "@/components/InternationalizationProvider";
import { ICreateEmailTemplatesDto } from "@/services/email-template/email-template.interface";
import emailTemplateServices from "@/services/email-template/email-template.service";
import { useAppSelector } from "@/redux/reduxHooks";
import getQueryClient from "@/utils/react-query/getQueryClient";

import { Locale } from "../../../../../../../../../i18n.config";

const EmailEditorNoSSR = dynamic(() => import("./EmailEditor"), {
    ssr: false,
    loading: () => (
        <div className="bg-white min-h-[220px] border border-gray-300 rounded-md"></div>
    ),
});

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => (
        <div className="bg-white h-11 border border-gray-300 rounded-md"></div>
    ),
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
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (newEmailTemplate: ICreateEmailTemplatesDto) =>
            emailTemplateServices.createAsync({
                ...newEmailTemplate,
                subject: `<p>${newEmailTemplate.subject}</p>`,
            }),
        onSuccess: res => {
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["email-templates"] });
        },
        onError: error => console.error(error),
    });

    const { emailTemplateTypes } = useAppSelector(
        state => state.templates.emailTemplates
    );

    const [form, setForm] = useState<ICreateEmailTemplatesDto>({
        name: "",
        subject: "",
        content: "",
        emailTemplateTypeId:
            emailTemplateTypes.length > 0 ? emailTemplateTypes[0].id : 1,
    });

    const handleCreateNewTemplate = async (e: FormEvent) => {
        e.preventDefault();
        mutation.mutate(form);
        onSaveTemplate();
    };

    useEffect(() => {
        if (emailTemplateTypes.length > 0) {
            setForm(prev => ({
                ...prev,
                emailTemplateTypeId: emailTemplateTypes[0].id,
            }));
        }
    }, [emailTemplateTypes]);

    return (
        <form onSubmit={handleCreateNewTemplate}>
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
            <div className="grid grid-cols-3 mb-4 gap-4">
                <div className="col-span-2">
                    {/* <CustomInput
                        type="text"
                        title={t.form.title.label}
                        value={form.subject}
                        onChange={(e: any) =>
                            setForm({ ...form, subject: e.target.value })
                        }
                        required
                    /> */}
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        <span className="text-red-500 mr-1">*</span>
                        {t.form.title.label}
                    </label>
                    <QuillEditorNoSSR
                        value={form.subject}
                        onChange={content =>
                            setForm({ ...form, subject: content })
                        }
                        className="bg-white"
                        config={{
                            toolbar: {
                                visibile: false,
                            },
                        }}
                    />
                </div>
                <div></div>
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
                    onEmailTemplateTypeChange={(id: number) =>
                        setForm({ ...form, emailTemplateTypeId: id })
                    }
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
