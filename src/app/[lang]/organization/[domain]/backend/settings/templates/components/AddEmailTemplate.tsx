"use client";

import dynamic from "next/dynamic";
import React, { FormEvent, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, CustomInput } from "@/components";
import { ICreateEmailTemplatesDto } from "@/services/email-template/email-template.interface";
import emailTemplateServices from "@/services/email-template/email-template.service";
import { useAppSelector } from "@/redux/reduxHooks";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

const EmailEditorNoSSR = dynamic(() => import("./EmailEditor"), {
    ssr: false,
    loading: () => (
        <div className="bg-white min-h-[220px] border border-gray-300 rounded-md"></div>
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
    const { t } = useI18NextTranslation(
        lang as I18Locale,
        "settings-templates",
        {
            keyPrefix: "add_email_template.form",
        }
    );

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (newEmailTemplate: ICreateEmailTemplatesDto) =>
            emailTemplateServices.createAsync({
                ...newEmailTemplate,
                subject: `${newEmailTemplate.subject}`,
            }),
        onSuccess: res => {
            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["email-templates"] });
        },
        onError: error => {
            toast.error(error.message);
        },
    });

    const { emailTemplateTypes } = useAppSelector(
        state => state.templates.emailTemplates
    );

    const [form, setForm] = useState<ICreateEmailTemplatesDto>({
        name: "",
        subject: "",
        content: "",
        emailTemplateTypeId:
            emailTemplateTypes.length > 0 ? emailTemplateTypes[0].id : "",
    });

    const handleCreateNewTemplate = async (e: FormEvent) => {
        e.preventDefault();
        await mutation.mutateAsync(form);
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
                    title={t("name.label")}
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
                        {t("title.label")}
                    </label>
                    <EmailEditorNoSSR
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
                        onEmailTemplateTypeChange={(id: string) => {}}
                    />
                </div>
                <div></div>
            </div>
            <div className="p-4 bg-slate-200 border border-gray-300 mb-4 rounded-md overflow-hidden">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    <span className="text-red-500 mr-1">*</span>
                    {t("body.label")}
                </label>
                <EmailEditorNoSSR
                    value={form.content}
                    onChange={content => setForm({ ...form, content: content })}
                    className="bg-white min-h-[220px]"
                    onEmailTemplateTypeChange={(id: string) =>
                        setForm({ ...form, emailTemplateTypeId: id })
                    }
                />
            </div>
            <div className="flex">
                <Button
                    type="submit"
                    disabled={mutation.isPending}
                    isLoading={mutation.isPending}
                    className="mr-4"
                >
                    {t("btn.save_template")}
                </Button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="text-sm text-neutral-500 font-semibold hover:underline"
                >
                    {t("btn.cancel")}
                </button>
            </div>
        </form>
    );
};

export default AddEmailTemplate;
