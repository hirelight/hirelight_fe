"use client";

import React from "react";
import { m } from "framer-motion";

import { Button, CustomInput, Selection } from "@/components";

type EditFieldProps = {
    data: any;
    onUpdate: () => void;
    onCancel: () => void;
};

const EditField: React.FC<EditFieldProps> = ({ data, onUpdate, onCancel }) => {
    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="my-4 p-6 border border-gray-300 rounded">
                <div className="grid grid-cols-2 gap-2 mb-4">
                    <CustomInput
                        title="Custom field title"
                        required
                        placeholder="Hello World"
                    />
                    <Selection
                        title="Field type"
                        required
                        datas={["Paragraph", "asd"]}
                        value="Paragraph"
                        onChange={() => {}}
                    />
                    <hr className="col-span-2 h-[1px] border-t border-gray-300 my-4" />
                    <Selection
                        title="Provider"
                        required
                        datas={["Candidate", "asd"]}
                        value="Candidate"
                        onChange={() => {}}
                    />
                    <Selection
                        title="Location in Application form"
                        required
                        datas={["Details", "asd"]}
                        value="Details"
                        onChange={() => {}}
                    />
                </div>
                <div className="flex flex-col gap-2 text-sm text-neutral-700">
                    <strong>Default setting for new jobs</strong>
                    <div className="flex items-center">
                        <input
                            id="mandatory"
                            type="radio"
                            value=""
                            name="field-require"
                            className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                            value=""
                            name="field-require"
                            className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                            value=""
                            name="field-require"
                            className="w-3 h-3 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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
                    <Button className="mr-4" onClick={onUpdate}>
                        Update custom fields
                    </Button>
                    <button
                        type="button"
                        className="text-neutral-500 font-semibold text-sm hover:text-neutral-600 hover:underline"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </m.div>
    );
};

export default EditField;
