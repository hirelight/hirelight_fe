"use client";

import React, { FormEvent, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";
import { m } from "framer-motion";
import { toast } from "react-toastify";

import { CloseIcon } from "@/icons";
import { Button, CustomInput } from "@/components";
import { IAssessmentFlTempDto } from "@/services/assessment-flow-templates/assessment-flow-templates.interface";
import { IAssessmentFlow } from "@/services/assessment-flows/assessment-flows.interface";
import { isInvalidForm } from "@/helpers";

import AssessmentFlowCard from "../AssessmentFlowCard";

import FlowStageForm from "./FlowStageForm";

const initialData: AssessmentFlowTemplate = {
    name: "",
    assessments: [
        {
            name: "Sourced",
            assessmentType: "SOURCED_ASSESSMENT",
        },

        {
            name: "Hired",
            assessmentType: "HIRED_ASSESSMENT",
        },
    ],
};

type AssessmentFlowFormProps = {
    isLoading?: boolean;
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
    isLoading,
    data = initialData,
}) => {
    const [showAddStage, setShowAddStage] = useState(false);
    const [formState, setFormState] = useState<AssessmentFlowTemplate>(data);
    const [formErr, setFormErr] = useState({
        nameErr: "",
        flowErr: "",
    });

    const inValidInput = (): boolean => {
        const errors = formErr;
        const { name, assessments } = formState;

        if (!name) errors.nameErr = "Assessment name is required!";

        if (assessments.length < 3)
            errors.flowErr =
                "You need to add at least 1 more assessment except from two default assessments";

        if (isInvalidForm(errors)) {
            setFormErr({ ...errors });
            toast.error("Invalid input");
            return true;
        }

        return false;
    };

    const handleCreateFlow = (e: FormEvent) => {
        e.preventDefault();

        if (inValidInput()) return;

        const newdupMap = new Map();
        let isDupplicate = false;
        formState.assessments.forEach(item => {
            if (!newdupMap.has(item.name)) newdupMap.set(item.name, item.name);
            else {
                isDupplicate = true;
                return;
            }
        });
        if (isDupplicate) return toast.error("Assessment name dupplicated!");

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
        setFormErr({
            ...formErr,
            flowErr: "",
        });
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
                                onChange={e => {
                                    setFormState(prev => ({
                                        ...prev,
                                        name: e.target.value,
                                    }));
                                    setFormErr({
                                        ...formErr,
                                        nameErr: "",
                                    });
                                }}
                                errorText={formErr.nameErr}
                                required
                            />
                            <div className="hidden md:block"></div>
                        </div>
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
                                {formErr.flowErr && (
                                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                                        <span className="font-medium">
                                            {formErr.flowErr}{" "}
                                        </span>
                                    </p>
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
                        <Button
                            disabled={isLoading}
                            isLoading={isLoading}
                            onClick={handleCreateFlow}
                        >
                            Save
                        </Button>
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
