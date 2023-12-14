"use client";

import React, { FormEvent, useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

import { Button, CustomInput, DatePicker } from "@/components";
import {
    IAssessmentFlow,
    IEditAssessmentFlowDto,
} from "@/services/assessment-flows/assessment-flows.interface";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import { handleError, isInvalidForm } from "@/helpers";
import { useAppSelector } from "@/redux/reduxHooks";
import assessmentsServices from "@/services/assessments/assessments.service";

import AssessmentFlowCard from "./AssessmentFlowCard";
import FlowStageForm from "./FlowStageForm";

type AssessmentFlowFormProps = {
    data: IEditAssessmentFlowDto;
};

const AssessmentFlowForm: React.FC<AssessmentFlowFormProps> = ({ data }) => {
    const { flowId, jobId } = useParams();
    const router = useRouter();

    const job = useAppSelector(state => state.job.data);

    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(false);

    const [showAddStage, setShowAddStage] = useState(false);
    const [formState, setFormState] = useState<IEditAssessmentFlowDto>(data);
    const [formErr, setFormErr] = useState({
        nameErr: "",
        flowTimelineErr: "",
        flowErr: "",
    });
    const inValidInput = (): boolean => {
        const errors = formErr;
        const { name, startTime, endTime } = formState;

        if (name === "") errors.nameErr = "Flow name must not be blank!";

        if (moment(startTime).isAfter(endTime))
            errors.flowTimelineErr =
                "Start time must be earlier than end time!";
        if (moment(startTime).isBefore(job.startTime))
            errors.flowTimelineErr =
                "Assessment flow must start after job post start time!";

        if (moment().isAfter(endTime))
            errors.flowTimelineErr = "End time must be in the future!";

        if (formState.assessments.length < 3)
            errors.flowErr =
                "Except from Sourced and Hired. Assessment flow need at least one assessment";

        if (isInvalidForm(errors)) {
            setFormErr({ ...errors });
            toast.error(
                <div>
                    <p>Invalid input</p>
                    <p>Check issue in red!</p>
                </div>
            );
            return true;
        }

        return false;
    };

    const handleUpdateFlow = async (e: FormEvent) => {
        e.preventDefault();
        if (inValidInput()) return;

        setIsLoading(true);
        try {
            const res = await assessmentFlowsServices.editAsync({
                ...formState,
                assessments: formState.assessments.slice(1, -1),
                startTime: moment.parseZone(formState.startTime).utc().format(),
                endTime: moment.parseZone(formState.endTime).utc().format(),
            });

            await queryClient.invalidateQueries({
                queryKey: ["assessmentFlow", flowId],
            });
            toast.success(res.message);
            router.back();
        } catch (error: any) {
            toast.error(error.message ? error.message : "Update flow failure!");
            setIsLoading(false);
        }
    };

    const handleDeleteStage = async (
        assessment: IAssessmentFlow & { id?: string }
    ) => {
        if (assessment.id) {
            try {
                await assessmentsServices.deleteById(assessment.id, job.id);
                await queryClient.invalidateQueries({
                    queryKey: [`assessmentFlow`, flowId],
                });
            } catch (error) {
                handleError(error);
            }
        }
    };

    const handleUpdateStage = (updateStage: any, pos: number) => {
        setFormState(prev => ({
            ...prev,
            assessments: prev.assessments.map((assessment, assessmentPos) =>
                assessmentPos === pos ? updateStage : assessment
            ),
        }));
    };

    const handleAddNewStage = async (newStage: IAssessmentFlow) => {
        if (formState.assessments.find(item => item.name === newStage.name))
            return toast.error("Assessment name already existed!");
        try {
            const res = await assessmentsServices.addAssessment({
                jobPostId: jobId as string,
                assessmentType: newStage.assessmentType,
                name: newStage.name,
            });

            await queryClient.invalidateQueries({
                queryKey: [`assessmentFlow`],
            });
            setShowAddStage(false);
        } catch (error) {
            handleError(error);
        }
    };
    useEffect(() => {
        setFormState(data);
    }, [data]);

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
                        errorText={formErr.nameErr}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Start time
                        </h3>
                        <DatePicker
                            value={formState.startTime as Date}
                            minDate={moment().toDate()}
                            onChange={date => {
                                setFormState(prev => ({
                                    ...prev,
                                    startTime: date.toString(),
                                    endTime: moment(date).isAfter(prev.endTime)
                                        ? moment(date).add(7, "days").toDate()
                                        : prev.endTime,
                                }));
                                setFormErr({
                                    ...formErr,
                                    flowTimelineErr: "",
                                });
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            End time
                        </h3>
                        <DatePicker
                            value={formState.endTime as Date}
                            minDate={formState.startTime as Date}
                            maxDate={moment().add(1, "years").toDate()}
                            onChange={date => {
                                setFormState(prev => ({
                                    ...prev,
                                    endTime: date.toString(),
                                }));
                                setFormErr({
                                    ...formErr,
                                    flowTimelineErr: "",
                                });
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
                        {formState.assessments?.map((assessment, index) => (
                            <AssessmentFlowCard
                                key={assessment.id}
                                data={assessment}
                                updateStage={updateStage =>
                                    handleUpdateStage(updateStage, index)
                                }
                                deleteStage={() =>
                                    handleDeleteStage(assessment)
                                }
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
                <Button
                    type="button"
                    disabled={isLoading}
                    isLoading={isLoading}
                    onClick={handleUpdateFlow}
                >
                    Save changes
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
