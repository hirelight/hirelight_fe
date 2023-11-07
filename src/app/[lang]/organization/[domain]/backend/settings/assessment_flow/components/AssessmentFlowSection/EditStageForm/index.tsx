"use client";

import React, { useState } from "react";

import { Button, CustomInput, Selection } from "@/components";
import {
    AssessmentTypeKey,
    AssessmentTypes,
} from "@/interfaces/assessment.interface";

type EditStageFormProps = {
    data: {
        name: string;
        type: AssessmentTypes;
    };
    onSave: () => void;
    onCancel: () => void;
};

const EditStageForm: React.FC<EditStageFormProps> = ({
    onSave,
    onCancel,
    data,
}) => {
    const [name, setName] = useState(data.name);
    const [type, setType] = useState(AssessmentTypes.SOURCED);

    return (
        <section className="bg-gray-100 rounded-md">
            <h4 className="p-4 border-b border-gray-300">
                {name ? name : "Add a stage name"}
            </h4>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                    title="Assessment name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                />
                <Selection
                    title="Assessment type"
                    items={Object.keys(AssessmentTypes).map(key => ({
                        value: key,
                        label: AssessmentTypes[key as AssessmentTypeKey],
                    }))}
                    onChange={() => {}}
                    required
                />
            </div>
            <div className="p-4 border-t border-gray-300">
                <Button onClick={onSave}>Done</Button>
                <button
                    type="button"
                    className="font-semibold text-neutral-500 hover:underline hover:text-neutral-700 ml-4"
                    onClick={onCancel}
                >
                    Cancel
                </button>
            </div>
        </section>
    );
};

export default EditStageForm;
