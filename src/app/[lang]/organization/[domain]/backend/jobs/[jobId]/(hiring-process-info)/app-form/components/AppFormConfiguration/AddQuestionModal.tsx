"use client";

import React from "react";

import {
    Button,
    ButtonOutline,
    CustomInput,
    CustomTextArea,
    Selection,
} from "@/components";
import { useAppDispatch } from "@/redux/reduxHooks";
import { addField } from "@/redux/slices/app-form.slice";
import { IAppFormField } from "@/interfaces";

const questionTypes = [
    "Paragraph",
    "Short answer",
    "Yes/No",
    "Dropdown",
    "Multiple choice",
    "Date",
    "Number",
    "File upload",
];
interface IAddQuestionModal {
    closeModal: () => void;
}

const AddQuestionModal = ({ closeModal }: IAddQuestionModal) => {
    const [questionField, setQuestionField] = React.useState<IAppFormField>({
        label: "",
        type: "text-area",
        required: false,
    });

    const dispatch = useAppDispatch();

    const handleAddQuestion = () => {
        dispatch(
            addField({
                sectionName: "Details",
                field: questionField,
            })
        );
        closeModal();
    };

    const getQuestionOnType = (type: string) => {
        switch (type) {
            case "Paragraph":
                setQuestionField({
                    ...questionField,
                    type: "text-area",
                });
                break;
            case "Short answer":
                setQuestionField({
                    ...questionField,
                    type: "text",
                });
                break;
            case "File upload":
                setQuestionField({
                    ...questionField,
                    type: "file",
                });
        }
    };

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 h-full flex items-center justify-center backdrop-brightness-75 backdrop-blur-sm z-50"
            onClick={() => closeModal()}
        >
            <div
                className="max-w-[640px] bg-white rounded-md p-8"
                onClick={e => e.stopPropagation()}
            >
                <h2 className="text-lg font-medium uppercase mb-4">
                    Add new question
                </h2>
                <p className="text-neutral-500 text-sm mb-6">
                    Ứng viên sau khi chuyển sang giai đoạn khác, giai đoạn hiện
                    tại sẽ được xem như hoàn thành và không thể quay lại được.
                </p>
                <Selection
                    title="Input type"
                    items={questionTypes.map(item => ({
                        label: item,
                        value: item,
                    }))}
                    value={questionTypes[0]}
                    onChange={(value: string) => {
                        getQuestionOnType(value);
                    }}
                    className="mb-6"
                />

                <CustomTextArea
                    title="Question"
                    required
                    placeholder="Tell me something about you"
                    className="mb-4"
                    onChange={(e: any) =>
                        setQuestionField({
                            ...questionField,
                            label: e.target.value,
                        })
                    }
                />

                <div className="w-full flex items-center gap-4">
                    <ButtonOutline onClick={closeModal}>Cancel</ButtonOutline>
                    <Button onClick={handleAddQuestion}>Add</Button>
                </div>
            </div>
        </div>
    );
};

export default AddQuestionModal;
