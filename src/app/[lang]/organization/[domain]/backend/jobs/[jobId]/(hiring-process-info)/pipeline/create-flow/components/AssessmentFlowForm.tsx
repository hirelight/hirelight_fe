"use client";

import React, { FormEvent, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

import { Button, CustomInput, DatePicker } from "@/components";
import { ICreateAssessmentFlowDto } from "@/services/assessment-flows/assessment-flows.interface";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import { useAppDispatch } from "@/redux/reduxHooks";
import { isInvalidForm } from "@/helpers";

import AssessmentFlowCard from "./AssessmentFlowCard";
import FlowStageForm from "./FlowStageForm";

const initialData: ICreateAssessmentFlowDto = {
    name: "",
    startTime: new Date(),
    endTime: moment(new Date()).add(1, "month").toDate(),
    jobPostId: "",
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
    data?: typeof initialData;
};

const AssessmentFlowForm: React.FC<AssessmentFlowFormProps> = ({
    data = initialData,
}) => {
    const { jobId } = useParams();
    const router = useRouter();

    const queryClient = useQueryClient();
    const [showAddStage, setShowAddStage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formState, setFormState] = useState<ICreateAssessmentFlowDto>({
        ...data,
        jobPostId: jobId as string,
    });
    const [formErr, setFormErr] = useState({
        nameErr: "",
        flowTimelineErr: "",
        flowErr: "",
    });

    const inValidInput = (): boolean => {
        const errors = formErr;
        const { name, startTime, endTime } = formState;

        if (name === "") errors.nameErr = "Flow name must not be blank!";

        if (startTime.getTime() >= endTime.getTime())
            errors.flowTimelineErr =
                "Start time must be earlier than end time!";

        if (endTime.getTime() <= new Date().getTime())
            errors.flowTimelineErr = "End time must be in the future!";

        if (formState.assessments.length < 3)
            errors.flowErr =
                "Except from Sourced and Hired. Assessment flow need at least one assessment";

        const isInvalid = isInvalidForm(errors);
        if (isInvalid) setFormErr({ ...errors });

        return isInvalid;
    };

    const handleCreateFlow = async (e: FormEvent) => {
        e.preventDefault();
        if (inValidInput())
            return toast.error(
                <div>
                    <p>Invalid input</p>
                    <p>Check issue in red!</p>
                </div>
            );
        setIsLoading(true);
        try {
            const res = await assessmentFlowsServices.createAsync({
                ...formState,
                assessments: formState.assessments
                    .slice(1, -1)
                    .map(assessment => ({
                        ...assessment,
                    })),
            });

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: [`job-${jobId}`] });
            router.push(`config-pipeline/${res.data.id}`);
            setIsLoading(false);
        } catch (error) {
            toast.error("Create flow error");
            setIsLoading(false);
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
                        onChange={e => {
                            setFormState(prev => ({
                                ...prev,
                                name: e.target.value,
                            }));
                            setFormErr({ ...formErr, nameErr: "" });
                        }}
                        required
                        errorText={formErr.nameErr}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Start time
                        </h3>
                        <DatePicker
                            value={formState.startTime}
                            minDate={new Date()}
                            maxDate={moment(formState.endTime)
                                .subtract(7, "days")
                                .toDate()}
                            onChange={date => {
                                setFormState(prev => ({
                                    ...prev,
                                    startTime: date,
                                }));
                                setFormErr({ ...formErr, flowTimelineErr: "" });
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            End time
                        </h3>
                        <DatePicker
                            value={formState.endTime}
                            minDate={moment(formState.startTime)
                                .add(7, "days")
                                .toDate()}
                            maxDate={moment(formState.endTime)
                                .add(1, "year")
                                .toDate()}
                            onChange={date => {
                                setFormState(prev => ({
                                    ...prev,
                                    endTime: date,
                                }));
                                setFormErr({ ...formErr, flowTimelineErr: "" });
                            }}
                        />
                    </div>
                    {formErr.flowTimelineErr && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">
                                {formErr.flowTimelineErr}
                            </span>
                        </p>
                    )}
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

                    {formErr.flowErr && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <span className="font-medium">
                                {formErr.flowErr}
                            </span>
                        </p>
                    )}

                    {showAddStage ? (
                        <FlowStageForm
                            onSave={handleAddNewStage}
                            onCancel={() => setShowAddStage(false)}
                        />
                    ) : (
                        <button
                            type="button"
                            className="w-full p-4 flex items-center justify-center gap-1 border border-dashed border-blue_primary_600 text-sm text-blue-600 font-semibold rounded-md hover:border-blue_primary_700 hover:text-blue_primary_700 hover:underline"
                            onClick={() => {
                                setShowAddStage(true);
                                setFormErr({ ...formErr, flowErr: "" });
                            }}
                        >
                            <PlusCircleIcon className="w-6 h-6" />
                            <span>Add new assessment</span>
                        </button>
                    )}
                </section>
            </div>
            <div className="p-4 flex items-center gap-4 text-sm">
                <div className="mr-auto"></div>
                <Button
                    onClick={handleCreateFlow}
                    disabled={isLoading}
                    isLoading={isLoading}
                >
                    Save
                </Button>
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
