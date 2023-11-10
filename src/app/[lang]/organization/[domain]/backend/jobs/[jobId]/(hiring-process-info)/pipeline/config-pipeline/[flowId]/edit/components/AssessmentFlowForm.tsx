"use client";

import React, { FormEvent, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { CloseIcon, Logo } from "@/icons";
import { Button, CustomInput, DatePicker } from "@/components";
import { AssessmentTypes } from "@/interfaces/assessment.interface";
import {
    IAssessmentFlowDto,
    ICreateAssessmentFlowDto,
    IEditAssessmentFlowDto,
} from "@/services/assessment-flows/assessment-flows.interface";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";

import AssessmentFlowCard from "./AssessmentFlowCard";
import FlowStageForm from "./FlowStageForm";

type AssessmentFlowFormProps = {
    data: IEditAssessmentFlowDto;
};

const AssessmentFlowForm: React.FC<AssessmentFlowFormProps> = ({ data }) => {
    const { jobId, lang, flowId } = useParams();
    const router = useRouter();

    const [showAddStage, setShowAddStage] = useState(false);
    const [formState, setFormState] = useState<IEditAssessmentFlowDto>(data);

    const handleUpdateFlow = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const res = await assessmentFlowsServices.editAsync({
                ...formState,
                assessments: formState.assessments.slice(1, -1),
            });

            toast.success(res.message);
            router.push(
                `/${lang}/backend/jobs/${jobId}/pipeline/config-pipeline/${flowId}`
            );
        } catch (error) {
            toast.error("Create flow error");
        }
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

    const handleAddNewStage = (newStage: any) => {
        if (formState.assessments.length >= 10)
            return alert("Maximum assessments: 10");

        setFormState(prev => {
            const prevStages = prev.assessments.slice(
                0,
                prev.assessments.length - 1
            );

            return {
                ...prev,
                assessments: prevStages.concat([
                    newStage,
                    prev.assessments[prev.assessments.length - 1],
                ]),
            };
        });
        setShowAddStage(false);
    };

    return (
        <div>
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
                        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Start time
                        </h3>
                        <DatePicker
                            value={new Date(formState.startTime)}
                            onChange={date =>
                                setFormState(prev => ({
                                    ...prev,
                                    startTime: date,
                                }))
                            }
                        />
                    </div>
                    <div>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            End time
                        </h3>
                        <DatePicker
                            value={new Date(formState.endTime)}
                            onChange={date =>
                                setFormState(prev => ({
                                    ...prev,
                                    endTime: date,
                                }))
                            }
                        />
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
                        {formState.assessments?.map((assessment, index) => (
                            <AssessmentFlowCard
                                key={assessment.name}
                                data={assessment}
                                updateStage={updateStage =>
                                    handleUpdateStage(updateStage, index)
                                }
                                deleteStage={() => handleDeleteStage(index)}
                            />
                        ))}
                    </Reorder.Group>

                    {showAddStage ? (
                        <FlowStageForm
                            onSave={handleAddNewStage}
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
            <div className="p-4 flex items-center justify-end gap-4 text-sm">
                {/* <Button className="mr-auto">Apply template</Button> */}
                <Button onClick={handleUpdateFlow}>Save changes</Button>
                <button
                    type="button"
                    className="font-semibold text-neutral-500 hover:underline hover:text-neutral-700"
                    onClick={() => router.back()}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default AssessmentFlowForm;
