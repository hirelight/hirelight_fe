"use client";

import React, { FormEvent, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";

import { CloseIcon, Logo } from "@/icons";
import { Button, CustomInput } from "@/components";
import { AssessmentTypes } from "@/interfaces/assessment.interface";

import AssessmentFlowCard from "../AssessmentFlowCard";

import FlowStageForm from "./FlowStageForm";

const initialData = {
    name: "",
    department: "",
    location: "",
    assessments: [
        {
            id: 0,
            name: "Sourced",
            assessmentType: AssessmentTypes.SOURCED,
        },
        {
            id: 1,
            name: "Hired 2",
            assessmentType: AssessmentTypes.CV_SCREENING_ASSESSMENT,
        },
        {
            id: 2,
            name: "Hired 4",
            assessmentType: AssessmentTypes.LIVE_VIDEO_INTERVIEW_ASSESSMENT,
        },
        {
            id: 3,
            name: "Hired",
            assessmentType: AssessmentTypes.HIRED,
        },
    ],
};

type AssessmentFlowFormProps = {
    onSave: () => void;
    onClose: () => void;
    data?: typeof initialData;
};

type Assessment = {
    id: number;
    name: string;
    assessmentType: AssessmentTypes;
};

type AssessmentFlow = {
    name: string;
    department?: string;
    location?: string;
    assessments: Assessment[];
};

const AssessmentFlowForm: React.FC<AssessmentFlowFormProps> = ({
    onSave,
    onClose,
    data = initialData,
}) => {
    const [showAddStage, setShowAddStage] = useState(false);
    const [formState, setFormState] = useState<AssessmentFlow>(data);

    const handleCreateFlow = (e: FormEvent) => {
        e.preventDefault();

        onSave();
    };

    return (
        <div className="border border-gray-300 bg-gray-50 rounded-md text-neutral-700">
            <div className="p-4 flex items-center justify-between border-b border-gray-300">
                <h4 className="text-xl font-semibold">Create new flow</h4>
                <button
                    type="button"
                    className="text-neutral-500 hover:text-neutral-700"
                    onClick={onClose}
                >
                    <CloseIcon />
                </button>
            </div>
            <form onSubmit={handleCreateFlow}>
                <div className="p-4">
                    <div className="mb-4">
                        <CustomInput
                            title="Name"
                            value={formState.name}
                            onChange={e =>
                                setFormState(prev => ({
                                    ...prev,
                                    name: e.target.value,
                                }))
                            }
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <CustomInput
                                title="Department"
                                value={formState.department}
                                onChange={e =>
                                    setFormState(prev => ({
                                        ...prev,
                                        department: e.target.value,
                                    }))
                                }
                            />
                            <p className="text-xs text-neutral-500 mt-1">
                                If no department is selected, the pipeline will
                                be available for all jobs in all departments.
                            </p>
                        </div>
                        <div>
                            <CustomInput
                                title="Location"
                                value={formState.location}
                                onChange={e =>
                                    setFormState(prev => ({
                                        ...prev,
                                        location: e.target.value,
                                    }))
                                }
                            />
                            <p className="text-xs text-neutral-500 mt-1">
                                If no location is selected, the pipeline will be
                                available for all jobs in all locations.
                            </p>
                        </div>
                    </div>
                    <section className="text-sm">
                        <strong className="block mb-6">
                            Add or edit flow stages
                        </strong>
                        <Reorder.Group
                            axis="y"
                            values={formState.assessments.slice(
                                1,
                                formState.assessments.length - 1
                            )}
                            onReorder={newOrder =>
                                setFormState(prev => ({
                                    ...prev,
                                    assessments: [
                                        prev.assessments[0],
                                        ...newOrder,
                                        prev.assessments[
                                            prev.assessments.length - 1
                                        ],
                                    ],
                                }))
                            }
                            className="space-y-4 mb-4"
                        >
                            {formState.assessments?.map(assessment => (
                                <AssessmentFlowCard
                                    key={assessment.id}
                                    data={assessment}
                                />
                            ))}
                        </Reorder.Group>

                        {showAddStage ? (
                            <FlowStageForm
                                onSave={() => setShowAddStage(false)}
                                onCancel={() => setShowAddStage(false)}
                            />
                        ) : (
                            <button
                                type="button"
                                className="w-full p-4 flex items-center justify-center gap-1 border border-dashed border-blue_primary_600 text-sm text-blue-600 font-semibold rounded-md hover:border-blue_primary_700 hover:text-blue_primary_700 hover:underline"
                                onClick={() => setShowAddStage(true)}
                            >
                                <PlusCircleIcon className="w-6 h-6" />
                                <span>Add new assessment</span>
                            </button>
                        )}
                    </section>
                </div>
                <div className="p-4 flex items-center gap-4 text-sm">
                    <Button type="submit">Save</Button>
                    <button
                        type="button"
                        className="font-semibold text-neutral-500 hover:underline hover:text-neutral-700"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AssessmentFlowForm;
