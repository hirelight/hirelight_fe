import React, { useEffect, useRef } from "react";
import { useParams } from "next/navigation";

import { Modal } from "@/components";
import { useTranslation } from "@/components/InternationalizationProvider";

import datas from "../mock-data.json";
import { Locale } from "../../../../../../../../../i18n.config";

interface IPreviewModal {
    isOpen: boolean;
    onClose: () => void;
    data: (typeof datas)[0];
}

const PreviewModal: React.FC<IPreviewModal> = ({ isOpen, onClose, data }) => {
    const { lang } = useParams();
    const t = useTranslation(
        lang as Locale,
        "settings.templates.email_template_list.preview_modal"
    );

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 border-b border-gray-300">
                <h2 className="text-neutral-700 text-xl font-semibold">
                    {t.preview_h2}: {data.name}
                </h2>
            </div>
            <div
                className="p-6 flex"
                dangerouslySetInnerHTML={{
                    __html: data.media.email.translations.en.body,
                }}
            ></div>
        </Modal>
    );
};

export default PreviewModal;
