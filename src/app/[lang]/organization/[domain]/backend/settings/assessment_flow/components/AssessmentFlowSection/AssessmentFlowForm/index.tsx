"use client";

import React, { FormEvent, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";
import { m } from "framer-motion";

import { CloseIcon } from "@/icons";
import { Button, CustomInput } from "@/components";
import { IAssessmentFlTempDto } from "@/services/assessment-flow-templates/assessment-flow-templates.interface";
import { IAssessmentFlow } from "@/services/assessment-flows/assessment-flows.interface";

import AssessmentFlowCard from "../AssessmentFlowCard";

import FlowStageForm from "./FlowStageForm";

const initialData: AssessmentFlowTemplate = {
    name: "",
    assessments: [
        {
            name: "Sourced",
            assessmentType: "SOURCED",
        },

        {
            name: "Hired",
            assessmentType: "HIRED",
        },
    ],
};

type AssessmentFlowFormProps = {
    onSave: (newTemplate: IAssessmentFlTempDto) => void;
    onClose: () => void;
    data?: AssessmentFlowTemplate;
};

export type AssessmentFlowTemplate = Omit<IAssessmentFlTempDto, "content"> & {
    assessments: IAssessmentFlow[];
};

const AssessmentFlowForm: React.FC<AssessmentFlowFormProps> = ({
    onSave,
    onClose,
    data = initialData,
}) => {
    const [showAddStage, setShowAddStage] = useState(false);
    const [formState, setFormState] = useState<AssessmentFlowTemplate>(data);

    const handleCreateFlow = (e: FormEvent) => {
        e.preventDefault();

        onSave({
            ...formState,
            content: JSON.stringify(formState.assessments),
        });
    };

    const handleDeleteStage = (pos: number) => {
        setFormState(prev => ({
            ...prev,
            assessments: prev.assessments.filter(
                (_, assessmentPos) => assessmentPos !== pos
            ),
        }));
    };

    const handleUpdateStage = (updateStage: any, index: number) => {
        setFormState(prev => ({
            ...prev,
            assessments: prev.assessments.map((assessment, assessmentPos) =>
                assessmentPos === index ? updateStage : assessment
            ),
        }));
    };

    const handleAddStage = (newStage: IAssessmentFlow) => {
        const prevStages = formState.assessments.slice(
            0,
            formState.assessments.length - 1
        );
        setFormState(prev => ({
            ...prev,
            assessments: prevStages.concat([
                newStage,
                prev.assessments[prev.assessments.length - 1],
            ]),
        }));
        setShowAddStage(false);
    };

    return (
        <m.div
            initial={{
                opacity: 0,
                height: 0,
            }}
            animate={{
                opacity: 1,
                height: "auto",
            }}
            exit={{
                opacity: 0,
                height: 0,
            }}
        >
            <div className="my-2 border border-gray-300 bg-gray-50 rounded-md text-neutral-700">
                <div className="p-4 flex items-center justify-between border-b border-gray-300">
                    <h4 className="text-xl font-semibold">
                        {formState.name
                            ? "Manage assessment flow"
                            : "Create new flow"}
                    </h4>
                    <button
                        type="button"
                        className="text-neutral-500 hover:text-neutral-700"
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </button>
                </div>
                <div>
                    <div className="p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 mb-6">
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
                            <div></div>
                        </div>
                        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                    </div> */}
                        <section className="text-sm">
                            <strong className="block mb-6">
                                Add or edit flow stages
                            </strong>
                            <Reorder.Group
                                axis="y"
                                values={formState.assessments.slice(1, -1)}
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
                                {formState.assessments?.map(
                                    (assessment, index) => (
                                        <AssessmentFlowCard
                                            key={assessment.name}
                                            data={assessment}
                                            updateStage={updateStage =>
                                                handleUpdateStage(
                                                    updateStage,
                                                    index
                                                )
                                            }
                                            deleteStage={() =>
                                                handleDeleteStage(index)
                                            }
                                        />
                                    )
                                )}
                            </Reorder.Group>

                            {showAddStage ? (
                                <FlowStageForm
                                    onSave={handleAddStage}
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
                        <Button onClick={handleCreateFlow}>Save</Button>
                        <button
                            type="button"
                            className="font-semibold text-neutral-500 hover:underline hover:text-neutral-700"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </m.div>
    );
};

export default AssessmentFlowForm;
