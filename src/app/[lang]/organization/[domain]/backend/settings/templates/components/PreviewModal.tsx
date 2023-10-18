import React, { useEffect, useRef } from "react";

import { Modal } from "@/components";

import datas from "../mock-data.json";

interface IPreviewModal {
    isOpen: boolean;
    onClose: () => void;
    data: (typeof datas)[0];
}

const PreviewModal: React.FC<IPreviewModal> = ({ isOpen, onClose, data }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 border-b border-gray-300">
                <h2 className="text-neutral-700 text-xl font-semibold">
                    Preview: {data.name}
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
