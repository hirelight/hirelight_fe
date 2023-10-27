"use client";

import React, { useState } from "react";

import { Button, CustomInput, Selection } from "@/components";

enum AssessmentType {
    Sourced = "Sourced",
    CVScreening = "CVScreening",
    OneWayInterview = "OneWayInterview",
    FaceToFaceInterview = "FaceToFaceInterview",
    MulChoice = "MulChoice",
    IntegrationAssessment = "IntegrationAssessment",
    Hired = "Hired",
}

type AddNewStageFormProps = {
    onSave: () => void;
    onCancel: () => void;
};

const AddNewStageForm: React.FC<AddNewStageFormProps> = ({
    onSave,
    onCancel,
}) => {
    const [name, setName] = useState("");
    const [type, setType] = useState(AssessmentType.Sourced);

    return (
        <section className="border border-gray-300 bg-slate-100 rounded-md">
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
                    datas={["Phone Screen"]}
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

export default AddNewStageForm;
