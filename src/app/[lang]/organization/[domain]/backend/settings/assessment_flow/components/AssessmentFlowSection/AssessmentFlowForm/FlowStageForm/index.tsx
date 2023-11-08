"use client";

import React, { useState } from "react";

import { Button, CustomInput, Selection } from "@/components";
import {
    AssessmentTypeKey,
    AssessmentTypes,
} from "@/interfaces/assessment.interface";
import { IAssessmentFlow } from "@/services/assessment-flows/assessment-flows.interface";

const initialData: IAssessmentFlow = {
    index: -1,
    name: "",
    assessmentType: "CV_SCREENING_ASSESSMENT",
};

type FlowStageFormProps = {
    onSave: (newStage: IAssessmentFlow) => void;
    onCancel: () => void;
    data?: IAssessmentFlow;
};

const FlowStageForm: React.FC<FlowStageFormProps> = ({
    onSave,
    onCancel,
    data = initialData,
}) => {
    const [formState, setFormState] = useState<IAssessmentFlow>(data);

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
                    items={Object.keys(AssessmentTypes)
                        .slice(1, -1)
                        .map(key => ({
                            value: key,
                            label: AssessmentTypes[key as AssessmentTypeKey],
                        }))}
                    value={data ? AssessmentTypes[data.assessmentType] : ""}
                    onChange={content =>
                        setFormState(prev => ({
                            ...prev,
                            assessmentType: content as AssessmentTypeKey,
                        }))
                    }
                    required
                />
            </div>
            <div className="p-4 border-t border-gray-300">
                <Button onClick={onSave.bind(null, formState)}>Done</Button>
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
