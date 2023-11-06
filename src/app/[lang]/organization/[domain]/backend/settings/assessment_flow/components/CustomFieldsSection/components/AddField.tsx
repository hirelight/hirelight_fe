"use client";

import React, { FormEvent, HTMLInputTypeAttribute, useState } from "react";
import { m } from "framer-motion";

import { Button, CustomInput, Selection } from "@/components";
import { IAddNewField } from "@/interfaces/app-form-template.interface";

const appFormPos = new Map<string, string>([
    ["personal_information", "Personal information"],
    ["profile", "Profile"],
    ["details", "Details"],
]);

type AddFieldProps = {
    onAdd: (newField: IAddNewField) => void;
    onCancel: () => void;
};

const AddField: React.FC<AddFieldProps> = ({ onAdd, onCancel }) => {
    const [formState, setFormState] = useState<IAddNewField>({
        appFormSectionId: "",
        profileSectionId: "",
        newField: {
            id: "",
            custom: true,
            label: "",
            type: "",
            appFormSectionId: "",
        },
    });

    const handleAddFields = (e: FormEvent) => {
        e.preventDefault();

        onAdd(formState);
    };

    return (
        <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
        >
            <div className="py-4">
                <form
                    onSubmit={handleAddFields}
                    className="p-6 border border-gray-300 rounded"
                >
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <CustomInput
                            title="Custom field title"
                            placeholder="Please select an option"
                            value={formState.newField.label}
                            onChange={e =>
                                setFormState({
                                    ...formState,
                                    newField: {
                                        ...formState.newField,
                                        label: e.target.value,
                                        id: e.target.value
                                            .toLowerCase()
                                            .replace(" ", "_"),
                                    },
                                })
                            }
                            required
                        />
                        <Selection
                            title="Field type"
                            required
                            items={["Paragraph", "asd"].map(item => ({
                                label: item,
                                value: "text" as HTMLInputTypeAttribute,
                            }))}
                            value={formState.newField.type}
                            placeholder="Please select an option"
                            onChange={(content: string) =>
                                setFormState({
                                    ...formState,
                                    newField: {
                                        ...formState.newField,
                                        type: content,
                                    },
                                })
                            }
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <Selection
                            title="Field type"
                            required
                            items={Array.from(appFormPos.entries()).map(
                                ([key, value]) => ({ label: value, value: key })
                            )}
                            value={appFormPos.get(formState.appFormSectionId)}
                            placeholder="Please select an option"
                            onChange={(content: string) =>
                                setFormState({
                                    ...formState,
                                    appFormSectionId: content,
                                    newField: {
                                        ...formState.newField,
                                        appFormSectionId: content,
                                    },
                                })
                            }
                        />
                        <div></div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm text-neutral-700">
                        <strong>Default setting for new jobs</strong>
                        <div className="flex items-center">
                            <input
                                id="mandatory"
                                type="radio"
                                value="mandatory"
                                name="field-require"
                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={e => {
                                    if (e.currentTarget.checked)
                                        setFormState({
                                            ...formState,
                                            newField: {
                                                ...formState.newField,
                                                required: true,
                                            },
                                        });
                                }}
                            />
                            <label
                                htmlFor="mandatory"
                                className="ml-2 text-sm text-neutral-700 dark:text-gray-300"
                            >
                                Mandatory
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="optional"
                                type="radio"
                                value="optional"
                                name="field-require"
                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={e => {
                                    if (e.currentTarget.checked)
                                        setFormState({
                                            ...formState,
                                            newField: {
                                                ...formState.newField,
                                                required: false,
                                            },
                                        });
                                }}
                            />
                            <label
                                htmlFor="optional"
                                className="ml-2 text-sm text-neutral-700 dark:text-gray-300"
                            >
                                Optional
                            </label>
                        </div>
                        <div className="flex items-center">
                            <input
                                id="off"
                                type="radio"
                                value="off"
                                name="field-require"
                                className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                onChange={e => {
                                    if (e.currentTarget.checked)
                                        setFormState({
                                            ...formState,
                                            newField: {
                                                ...formState.newField,
                                                required: undefined,
                                            },
                                        });
                                }}
                            />
                            <label
                                htmlFor="off"
                                className="ml-2 text-sm text-neutral-700 dark:text-gray-300"
                            >
                                Off
                            </label>
                        </div>
                    </div>
                    <hr className="col-span-2 h-[1px] border-t border-gray-300 my-4" />
                    <div>
                        <Button type="submit" className="mr-4">
                            Add custom fields
                        </Button>
                        <button
                            type="button"
                            className="text-neutral-500 font-semibold text-sm hover:text-neutral-600 hover:underline"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </m.div>
    );
};

export default AddField;
