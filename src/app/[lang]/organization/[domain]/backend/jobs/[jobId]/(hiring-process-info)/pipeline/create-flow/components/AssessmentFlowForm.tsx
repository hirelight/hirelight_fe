"use client";

import React, { FormEvent, useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Reorder } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

import {
    Button,
    CustomInput,
    DatePicker,
    Portal,
    WarningModal,
} from "@/components";
import { ICreateAssessmentFlowDto } from "@/services/assessment-flows/assessment-flows.interface";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { handleError, isInvalidForm } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import AssessmentFlowCard from "./AssessmentFlowCard";
import FlowStageForm from "./FlowStageForm";

const initialData: ICreateAssessmentFlowDto = {
    name: "",
    startTime: new Date(),
    endTime: moment().add(7, "days").toDate(),
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
    const { jobId, lang } = useParams();
    const router = useRouter();

    const { t } = useI18NextTranslation(lang as I18Locale, "create-flow");

    const job = useAppSelector(state => state.job.data);

    const queryClient = useQueryClient();
    const [showAddStage, setShowAddStage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
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

        if (name === "") errors.nameErr = t("flow_not_blank");

        if (moment(startTime).isAfter(endTime))
            errors.flowTimelineErr = t("common:error.start_time_earlier");

        if (moment(startTime).isSameOrBefore(job.startTime, "dates"))
            errors.flowTimelineErr = t("flow_start_after_job");

        if (moment().isAfter(endTime))
            errors.flowTimelineErr = t("common:end_time_be_future");

        if (formState.assessments.length < 3)
            errors.flowErr = t("flow_need_at_least_one_assessment");

        const isInvalid = isInvalidForm(errors);
        if (isInvalid) setFormErr({ ...errors });

        return isInvalid;
    };

    const handleCreateFlow = async () => {
        if (inValidInput())
            return toast.error(
                <div>
                    <p>{t("common:error.invalid_input")}</p>
                    <p>{t("common:error.check_red_places")}</p>
                </div>
            );
        setIsLoading(true);
        try {
            const res = await assessmentFlowsServices.createAsync({
                ...formState,
                startTime: moment.parseZone(formState.startTime).utc().format(),
                endTime: moment.parseZone(formState.endTime).utc().format(),
                assessments: formState.assessments
                    .slice(1, -1)
                    .map(assessment => ({
                        ...assessment,
                    })),
            });

            toast.success(res.message);
            queryClient.invalidateQueries({ queryKey: ["job", jobId] });
            router.push(`config-pipeline/${res.data.id}`);
            setIsLoading(false);
        } catch (error) {
            handleError(error);
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
        if (formState.assessments.find(item => item.name === updateStage.name))
            return toast.error(t("assessment_name_already_existed"));
        setFormState(prev => ({
            ...prev,
            assessments: prev.assessments.map((assessment, assessmentPos) =>
                assessmentPos === index ? updateStage : assessment
            ),
        }));
    };

    const handleAddNewStage = (newStage: any) => {
        if (formState.assessments.find(item => item.name === newStage.name))
            return toast.error(t("assessment_name_already_existed"));

        if (formState.assessments.length >= 10)
            return toast.error(t("maximum_assessments"));

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
            <WarningModal
                isOpen={showWarning}
                isLoading={isLoading}
                closeModal={() => setShowWarning(false)}
                onConfirm={handleCreateFlow}
                content={t("please_review_flow_info")}
                title={t("create_new_assessment_flow")}
            />
            <div className="p-4">
                <div className="mb-4">
                    <CustomInput
                        title={t("common:name")}
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
                            {t("common:start_time")}
                        </h3>
                        <DatePicker
                            value={formState.startTime}
                            minDate={new Date()}
                            onChange={date => {
                                setFormState(prev => ({
                                    ...prev,
                                    startTime: date,
                                    endTime:
                                        moment(prev.endTime).diff(
                                            date,
                                            "days"
                                        ) < 7
                                            ? moment(date)
                                                  .add(7, "days")
                                                  .toDate()
                                            : prev.endTime,
                                }));
                                setFormErr({ ...formErr, flowTimelineErr: "" });
                            }}
                        />
                    </div>
                    <div>
                        <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            {t("common:end_time")}
                        </h3>
                        <DatePicker
                            value={moment(formState.endTime).toDate()}
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
                        {t("add_or_edit_flow_stages")}
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
                            <span>{t("add_new_assessment")}</span>
                        </button>
                    )}
                </section>
            </div>
            <div className="p-4 flex items-center gap-4 text-sm">
                <div className="mr-auto"></div>
                <Button
                    onClick={() => setShowWarning(true)}
                    disabled={isLoading}
                >
                    {t("common:save")}
                </Button>
                <button
                    type="button"
                    className="font-semibold text-neutral-500 hover:underline hover:text-neutral-700"
                    onClick={() => router.back()}
                >
                    {t("common:cancel")}
                </button>
            </div>
        </div>
    );
};

export default AssessmentFlowForm;
