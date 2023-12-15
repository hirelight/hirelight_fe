import React from "react";

import { Modal, QuestionPicker } from "@/components";
import { IModalProps } from "@/components/Modal";
import { IQuestionAnswerDto } from "@/services";

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
