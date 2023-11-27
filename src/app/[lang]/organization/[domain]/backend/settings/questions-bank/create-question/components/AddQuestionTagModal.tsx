"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button, ButtonOutline, CustomInput, Modal } from "@/components";
import questionAnswerServices from "@/services/questions/questions.service";
import { ICreateQuestionTagDto } from "@/services/questions/questions.interface";

type AddQuestionTagModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const AddQuestionTagModal: React.FC<AddQuestionTagModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [tagName, setTagName] = useState("");
    const queryClient = useQueryClient();
    const createTagMutation = useMutation({
        mutationFn: (createDto: ICreateQuestionTagDto) =>
            questionAnswerServices.createTagAsync(createDto),
        onSuccess: () => {
            setTagName("");
            queryClient.invalidateQueries({ queryKey: ["question-tags"] });
            onClose();
        },
        onError: err => {
            toast.error(
                err.message ? err.message : "Create question tag failure"
            );
        },
    });

    const handleCreateNewTag = () => {
        createTagMutation.mutate({ name: tagName });
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="bg-white rounded-md"
        >
            <div className="p-6 border-b border-gray-300">
                <h2 className="text-neutral-700 text-xl font-semibold">
                    Add new question tag
                </h2>
            </div>
            <div className="p-6">
                <CustomInput
                    title=""
                    type="text"
                    value={tagName}
                    onChange={e => setTagName(e.target.value)}
                    required
                />
            </div>
            <div className="px-6 py-4 flex gap-2 justify-end border-t border-gray-300">
                <ButtonOutline type="button" onClick={onClose}>
                    Cancel
                </ButtonOutline>
                <Button
                    disabled={createTagMutation.isPending}
                    isLoading={createTagMutation.isPending}
                    onClick={handleCreateNewTag}
                >
                    Create
                </Button>
            </div>
        </Modal>
    );
};

export default AddQuestionTagModal;
