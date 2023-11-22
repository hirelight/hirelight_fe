"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
    Button,
    CustomInput,
    Modal,
    Portal,
    QuestionPicker,
} from "@/components";
import { IQuesAnsSetDto, IQuestionAnswerDto } from "@/services";
import questionAnsSetServices from "@/services/question-sets/question-sets.service";
import QuestionPickerCard from "@/components/QuestionPicker/QuestionPickerCard";

type QuestionSetFormProps = {
    data?: Omit<IQuesAnsSetDto, "content"> & {
        questions: IQuestionAnswerDto[];
    };
};

const QuestionSetForm: React.FC<QuestionSetFormProps> = ({ data }) => {
    const [showPicker, setShowPicker] = useState(false);
    const [name, setName] = useState("");
    const [pickedQuestions, setPickedQuestions] = useState<
        IQuestionAnswerDto[]
    >([]);

    const handleCreateSet = async () => {
        try {
            const res = await questionAnsSetServices.createAsync({
                name,
                content: JSON.stringify(pickedQuestions),
            });

            toast.success(res.message);
        } catch (error) {
            console.error(error);
            toast.error("Create set error");
        }
    };

    const handleUpdateSet = async () => {
        if (!data) return toast.error("update failure");
        try {
            const res = await questionAnsSetServices.editAsync({
                id: data.id,
                name,
                content: JSON.stringify(pickedQuestions),
            });

            toast.success(res.message);
        } catch (error) {
            console.error(error);
            toast.error("Edit set error");
        }
    };

    useEffect(() => {
        if (data) {
            setName(data.name);
            setPickedQuestions(data.questions);
        }
    }, [data]);

    return (
        <form>
            <h1 className="text-xl text-blue_primary_800 font-semibold text-center mb-4 relative">
                {data ? "Update question set" : "Create question set"}
                <Button
                    type="button"
                    onClick={() => setShowPicker(!showPicker)}
                    className="absolute top-1/2 right-4 -translate-y-1/2"
                >
                    Show
                </Button>
            </h1>
            <div className="mb-4">
                <CustomInput
                    title="Name"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
            </div>

            <ul className={"flex flex-col gap-2 mb-6"}>
                {pickedQuestions.map((item, index) => (
                    <li key={item.id}>
                        <QuestionPickerCard
                            data={item}
                            questionNo={index}
                            pickedQuestions={pickedQuestions}
                        />
                    </li>
                ))}
            </ul>

            <Button
                type="button"
                onClick={data ? handleUpdateSet : handleCreateSet}
            >
                {data ? "Update set" : "Create set"}
            </Button>

            <Portal>
                <Modal
                    isOpen={showPicker}
                    onClose={() => setShowPicker(false)}
                    className="bg-white p-6 rounded-md"
                >
                    <QuestionPicker
                        pickedQuestions={pickedQuestions}
                        onPickedChange={questions => {
                            setPickedQuestions(questions);
                            setShowPicker(false);
                        }}
                    />
                </Modal>
            </Portal>
        </form>
    );
};

export default QuestionSetForm;
