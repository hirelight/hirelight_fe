"use client";

import React, { FormEvent, useState } from "react";
import { Reorder } from "framer-motion";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { v4 as uuid } from "uuid";
import { TrashIcon } from "@heroicons/react/24/outline";

import {
    Button,
    ButtonOutline,
    CustomInput,
    CustomTextArea,
    Selection,
} from "@/components";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { AppFormInputTypes, ICustomField } from "@/interfaces";
import { addCustomField, editCustomField } from "@/redux/slices/job.slice";
import { DragIndicatorIcon } from "@/icons";
import { isInvalidForm } from "@/helpers";

interface IAddQuestionModal {
    data?: ICustomField;
    closeModal: () => void;
}

const AddQuestionModal = ({ closeModal, data }: IAddQuestionModal) => {
    const [questionField, setQuestionField] = React.useState<ICustomField>(
        data
            ? data
            : {
                  id: `QA_${uuid()}`,
                  label: "",
                  type: "text-area",
                  required: true,
                  custom: true,
                  enabled: true,
                  answers_count: null,
                  choices_attributes: [
                      {
                          id: `CA_${uuid()}`,
                          name: "",
                          position: 0,
                          enabled: true,
                      },
                  ],
                  single_answer: false,
                  position: 0,
                  rejecting: false,
              }
    );
    const [questionErr, setQuestionErr] = useState({
        labelErr: "",
        choicesErr: "",
        choiceLabelErr: "",
    });

    const dispatch = useAppDispatch();
    const appForm = useAppSelector(state => state.job.data.applicationForm);

    const validateNewQuestion = () => {
        const { label, type, choices_attributes } = questionField;
        const errors = questionErr;

        if (!label) errors.labelErr = "Question name must not be blank!";

        if (type === "dropdown" || type === "multiple_choice") {
            if (choices_attributes.length < 2)
                errors.choicesErr = "Question must have at least 2 choices!";
            if (choices_attributes.some(choice => !choice.name))
                errors.choiceLabelErr = "Choice label must not be blank!";
        }
        const allFields = appForm.form_structure
            .map(sec => sec.fields)
            .flat(1)
            .concat(appForm.questions)
            .filter(field => field.id !== questionField.id);
        if (allFields.find(item => item.label === questionField.label))
            errors.labelErr = "Question name is already existed!";

        const isInvalid = isInvalidForm(errors);
        if (isInvalid) setQuestionErr({ ...errors });
        return isInvalid;
    };

    const handleAddQuestion = (e: FormEvent) => {
        e.preventDefault();

        if (validateNewQuestion()) return;

        if (data) {
            dispatch(editCustomField(questionField));
        } else dispatch(addCustomField(questionField));
        closeModal();
    };

    const handleAddChoice = () => {
        setQuestionField(prev => ({
            ...prev,
            choices_attributes: prev.choices_attributes.concat([
                {
                    id: `CA_${uuid()}`,
                    name: "",
                    position: prev.choices_attributes.length,
                    enabled: true,
                },
            ]),
        }));
        setQuestionErr({ ...questionErr, choicesErr: "" });
    };

    const handleEditChoice = (id: string, content: string) => {
        setQuestionField(prev => ({
            ...prev,
            choices_attributes: prev.choices_attributes.map(choice => {
                if (choice.id === id) {
                    return {
                        ...choice,
                        name: content,
                    };
                }

                return choice;
            }),
        }));
        setQuestionErr({ ...questionErr, choiceLabelErr: "" });
    };

    const handleRemoveChoice = (id: string) => {
        setQuestionField(prev => ({
            ...prev,
            choices_attributes: prev.choices_attributes.filter(
                choice => choice.id !== id
            ),
        }));
    };

    return (
        <div
            className="fixed top-0 left-0 right-0 bottom-0 h-full flex items-center justify-center backdrop-brightness-75 backdrop-blur-sm z-50 px-4"
            onClick={() => closeModal()}
        >
            <form
                className="max-w-full w-[640px] bg-white rounded-md p-8"
                onClick={e => e.stopPropagation()}
                onSubmit={handleAddQuestion}
                onKeyDown={e => {
                    if (e.key === "Enter") e.preventDefault();
                }}
            >
                <h2 className="text-xl font-semibold uppercase mb-2">
                    Add other require informations
                </h2>
                {/* <p className="text-neutral-500 text-sm mb-6">
                    Ứng viên sau khi chuyển sang giai đoạn khác, giai đoạn hiện
                    tại sẽ được xem như hoàn thành và không thể quay lại được.
                </p> */}
                <div className="mb-6">
                    <Selection
                        title="Input type"
                        items={AppFormInputTypes.map(item => ({
                            label: item.label,
                            value: item.type,
                        }))}
                        value={
                            AppFormInputTypes.find(
                                item => item.type === questionField.type
                            )?.label ?? AppFormInputTypes[0].label
                        }
                        onChange={value => {
                            setQuestionField({ ...questionField, type: value });
                            setQuestionErr({
                                labelErr: "",
                                choicesErr: "",
                                choiceLabelErr: "",
                            });
                        }}
                        className="mb-6"
                    />

                    <CustomTextArea
                        title="Question"
                        placeholder="Tell me something about you"
                        value={questionField.label}
                        required={true}
                        onChange={(e: any) => {
                            setQuestionField({
                                ...questionField,
                                label: e.target.value,
                            });
                            setQuestionErr({
                                labelErr: "",
                                choicesErr: "",
                                choiceLabelErr: "",
                            });
                        }}
                        errorText={questionErr.labelErr}
                    />

                    {(questionField.type === "dropdown" ||
                        questionField.type === "multiple_choice") && (
                        <div className="pt-4">
                            <label
                                htmlFor="choice"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Choices
                            </label>
                            <Reorder.Group
                                values={questionField.choices_attributes}
                                onReorder={newOrder =>
                                    setQuestionField({
                                        ...questionField,
                                        choices_attributes: newOrder,
                                    })
                                }
                                className="space-y-4"
                            >
                                {questionField.choices_attributes.map(
                                    (item, index) => (
                                        <Reorder.Item
                                            key={item.id}
                                            value={item}
                                            className="flex items-center gap-2 relative"
                                        >
                                            <DragIndicatorIcon className="text-blue_primary_600" />
                                            <CustomInput
                                                title=""
                                                value={item.name}
                                                className="flex-1 mr-2"
                                                onChange={e =>
                                                    handleEditChoice(
                                                        item.id,
                                                        e.target.value
                                                    )
                                                }
                                                onKeyDown={e => {
                                                    if (
                                                        e.key === "Enter" &&
                                                        item.name &&
                                                        index ===
                                                            questionField
                                                                .choices_attributes
                                                                .length -
                                                                1
                                                    )
                                                        handleAddChoice();
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="block w-6 aspect-square text-red-500 hover:text-red-700"
                                                onClick={handleRemoveChoice.bind(
                                                    null,
                                                    item.id
                                                )}
                                                tabIndex={-1}
                                            >
                                                <TrashIcon />
                                            </button>
                                            {index ===
                                                questionField.choices_attributes
                                                    .length -
                                                    1 && (
                                                <button
                                                    type="button"
                                                    className="w-6 h-6 text-green-500 hover:text-green-700"
                                                    onClick={handleAddChoice}
                                                    tabIndex={-1}
                                                >
                                                    <PlusCircleIcon />
                                                </button>
                                            )}
                                        </Reorder.Item>
                                    )
                                )}
                            </Reorder.Group>
                            {questionErr.choiceLabelErr && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">
                                        {questionErr.choiceLabelErr}
                                    </span>
                                </p>
                            )}
                            {questionErr.choicesErr && (
                                <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                    <span className="font-medium">
                                        {questionErr.choicesErr}
                                    </span>
                                </p>
                            )}
                        </div>
                    )}

                    {/* {questionField.type === "boolean" && (
                        <div className="flex items-center pt-4">
                            <input
                                id="custom-field-disqualify"
                                type="checkbox"
                                defaultChecked={questionField.rejecting}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={e =>
                                    setQuestionField({
                                        ...questionField,
                                        rejecting: e.currentTarget.checked,
                                    })
                                }
                            />
                            <label
                                htmlFor="custom-field-disqualify"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Disqualify candidate if answer is no
                            </label>
                        </div>
                    )} */}

                    {questionField.type === "multiple_choice" && (
                        <div className="flex items-center pt-4">
                            <input
                                id="one-answer-enable"
                                type="checkbox"
                                defaultChecked={questionField.single_answer}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={e =>
                                    setQuestionField({
                                        ...questionField,
                                        single_answer: e.currentTarget.checked,
                                    })
                                }
                            />
                            <label
                                htmlFor="one-answer-enable"
                                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                Only one answer allowed
                            </label>
                        </div>
                    )}
                </div>

                <div className="w-full flex items-center gap-4">
                    <ButtonOutline onClick={closeModal}>Cancel</ButtonOutline>
                    <Button type="submit">
                        {data ? "Save changes" : "Add"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddQuestionModal;
