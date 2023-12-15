import dynamic from "next/dynamic";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, CustomInput } from "@/components";
import {
    IEditEmailTemplatesDto,
    IEmailTemplatesDto,
} from "@/services/email-template/email-template.interface";
import emailTemplateService from "@/services/email-template/email-template.service";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

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
    const { t } = useI18NextTranslation(
        lang as I18Locale,
        "settings-templates",
        {
            keyPrefix: "update_email_template.form",
        }
    );
    const queryClient = useQueryClient();
    const updateMutation = useMutation({
        mutationFn: (editData: IEditEmailTemplatesDto) =>
            emailTemplateService.editAsync(editData),
        onSuccess: res => {
            toast.success(res.message, {
                position: "bottom-right",
            });
            queryClient.invalidateQueries({
                queryKey: ["email-templates"],
            });
            onSaveChanges();
        },
        onError: error => {
            console.error(error);
            toast.error("Update email template failure!", {
                position: "bottom-right",
            });
        },
    });

    const [form, setForm] = useState<IEditEmailTemplatesDto>({
        id: data.id,
        name: data.name,
        subject: data.subject,
        content: data.content,
        emailTemplateTypeId: data.emailTemplateType.id,
    });

    const handleSaveChanges = () => {
        updateMutation.mutate(form);
    };

    return (
        <div>
            <div className="grid grid-cols-2 mb-4 gap-4">
                <CustomInput
                    type="text"
                    title={t("name.label")}
                    value={
                        form.name.charAt(0).toUpperCase() +
                        form.name.substring(1)
                    }
                    onChange={(e: any) =>
                        setForm({ ...form, name: e.target.value })
                    }
                    required
                />
                <div></div>
            </div>
            <div className="grid grid-cols-3 mb-4 gap-4">
                <div className="col-span-2">
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
                    data={data}
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
                    disabled={updateMutation.isPending}
                    isLoading={updateMutation.isPending}
                    onClick={handleSaveChanges}
                    className="mr-4"
                >
                    {t("btn.save_changes")}
                </Button>

                <button
                    type="button"
                    onClick={onCancel}
                    className="text-sm text-neutral-500 font-semibold hover:underline"
                >
                    {t("btn.cancel")}
                </button>
            </div>
        </div>
    );
};

export default UpdateEmailTemplate;
