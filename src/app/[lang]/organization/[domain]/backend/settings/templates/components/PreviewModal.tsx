import React from "react";
import { useParams } from "next/navigation";

import { Modal } from "@/components";
import { IEmailTemplatesDto } from "@/services/email-template/email-template.interface";
import { sanitizeHtml } from "@/helpers/sanitizeHTML";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

interface IPreviewModal {
    isOpen: boolean;
    onClose: () => void;
    data: IEmailTemplatesDto;
}

const PreviewModal: React.FC<IPreviewModal> = ({ isOpen, onClose, data }) => {
    const { lang } = useParams();

    const { t } = useI18NextTranslation(
        lang as I18Locale,
        "settings-templates",
        {
            keyPrefix: "preview_modal",
        }
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="bg-white rounded-md"
        >
            <div className="p-6 border-b border-gray-300">
                <h2 className="text-neutral-700 text-xl font-semibold">
                    {t("preview_h2")}: {data.name}
                </h2>
            </div>
            <div
                className="!p-6 ql-editor text-sm"
                dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(data.content),
                }}
            ></div>
        </Modal>
    );
};

export default PreviewModal;
