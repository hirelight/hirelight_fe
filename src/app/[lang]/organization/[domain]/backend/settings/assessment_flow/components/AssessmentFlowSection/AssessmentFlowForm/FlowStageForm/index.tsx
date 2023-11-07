"use client";

import React, { useState } from "react";

import { Button, CustomInput, Selection } from "@/components";
import {
    AssessmentTypeKey,
    AssessmentTypes,
} from "@/interfaces/assessment.interface";

const initialData = {
    name: "",
    assessmentType: AssessmentTypes.CV_SCREENING_ASSESSMENT,
};

type FlowStageFormProps = {
    onSave: () => void;
    onCancel: () => void;
    data?: typeof initialData;
};

const FlowStageForm: React.FC<FlowStageFormProps> = ({
    onSave,
    onCancel,
    data = initialData,
}) => {
    const [formState, setFormState] = useState(data);

    return (
        <section className="border border-gray-300 bg-slate-100 rounded-md">
            <h4 className="p-4 border-b border-gray-300">
                {formState.name ? formState.name : "Add a stage name"}
            </h4>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                    title="Assessment name"
                    value={formState.name}
                    onChange={e =>
                        setFormState(prev => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                    required
                />
                <Selection
                    title="Assessment type"
                    items={Object.keys(AssessmentTypes).map(key => ({
                        value: key,
                        label: AssessmentTypes[key as AssessmentTypeKey],
                    }))}
                    value={data ? data.assessmentType : ""}
                    onChange={content =>
                        setFormState(prev => ({
                            ...prev,
                            assessmentType:
                                AssessmentTypes[content as AssessmentTypeKey],
                        }))
                    }
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

export default FlowStageForm;
