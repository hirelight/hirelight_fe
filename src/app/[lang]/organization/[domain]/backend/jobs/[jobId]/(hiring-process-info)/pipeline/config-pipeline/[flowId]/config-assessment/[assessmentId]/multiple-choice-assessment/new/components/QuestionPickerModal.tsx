import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { Button, ButtonOutline, Modal, QuestionPicker } from "@/components";
import { IModalProps } from "@/components/Modal";
import { IQuestionAnswerDto } from "@/services";

import styles from "./QuestionPickerModal.module.scss";

interface QuestionPickerModalProps extends IModalProps {
    isOpen: boolean;
    onClose: () => void;
    pickedQuestions: IQuestionAnswerDto[];
    onPickedChange: (questions: IQuestionAnswerDto[]) => void;
}

const QuestionPickerModal: React.FC<QuestionPickerModalProps> = ({
    isOpen,
    onClose,
    pickedQuestions,
    onPickedChange,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="bg-white p-6 rounded-md"
        >
            <QuestionPicker
                query={{ type: "one-answer" || "multiple-answers" }}
                pickedQuestions={pickedQuestions}
                onPickedChange={onPickedChange}
            />
        </Modal>
    );
};

export default QuestionPickerModal;
