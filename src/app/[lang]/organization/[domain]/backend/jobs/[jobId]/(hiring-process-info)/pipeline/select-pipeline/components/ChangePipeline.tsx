"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";

import { Button, CustomInput, DatePicker, WarningModal } from "@/components";
import { IAssessmentFlTempDto } from "@/services/assessment-flow-templates/assessment-flow-templates.interface";
import {
    IAssessmentFlow,
    ICreateAssessmentFlowDto,
} from "@/services/assessment-flows/assessment-flows.interface";
import { getIconBaseOnAssessmentType } from "@/helpers/getIconBaseType";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import { handleError, isInvalidForm } from "@/helpers";
import { useAppSelector } from "@/redux/reduxHooks";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

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

interface IChangePipeline {
    datas: (Omit<IAssessmentFlTempDto, "content"> & {
        assessments: IAssessmentFlow[];
    })[];
}

const ChangePipeline = ({ datas }: IChangePipeline) => {
    const { jobId, lang } = useParams();
    const router = useRouter();

    const { t } = useI18NextTranslation(lang as I18Locale, "select-pipeline");

    const job = useAppSelector(state => state.job.data);

    const queryClient = useQueryClient();

    const [isLoading, setIsLoading] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    const [formState, setFormState] = useState<ICreateAssessmentFlowDto>({
        ...initialData,
        jobPostId: jobId as string,
    });
    const [formErr, setFormErr] = useState({
        nameErr: "",
        flowTimelineErr: "",
        flowErr: "",
    });
    const [selectedTemplate, setSelectedTemplate] = useState(
        datas.length > 0
            ? datas[0].assessments.map(item => ({
                  name: item.name,
                  assessmentTypeName: item.assessmentType,
              }))
            : undefined
    );

    const inValidInput = (): boolean => {
        const errors = formErr;
        const { name, startTime, endTime } = formState;

        if (name === "") errors.nameErr = t("create-flow:flow_not_blank");

        if (moment(startTime).isAfter(endTime))
            errors.flowTimelineErr = t("common:error.start_time_earlier");

        if (moment(startTime).isBefore(job.startTime))
            errors.flowTimelineErr = t("create-flow:flow_start_after_job");

        if (moment().isAfter(endTime))
            errors.flowTimelineErr = t("common:error.end_time_be_future");

        if (!selectedTemplate)
            errors.flowErr = t("select_at_least_one_template");

        if (isInvalidForm(errors)) {
            setFormErr({ ...errors });
            return true;
        }

        return false;
    };

    const handleCreateFlow = async () => {
        if (inValidInput())
            return toast.error(
                <div>
                    <p>{t("common:error.invalid_input")}</p>
                    <p>{t("common:error.check_red_places")}</p>
                </div>
            );

        if (!selectedTemplate) return;
        setIsLoading(true);
        try {
            const res = await assessmentFlowsServices.createAsync({
                ...formState,
                startTime: moment.parseZone(formState.startTime).utc().format(),
                endTime: moment.parseZone(formState.endTime).utc().format(),
                assessments: selectedTemplate.slice(1, -1).map(item => ({
                    name: item.name,
                    assessmentType: item.assessmentTypeName,
                })),
                jobPostId: jobId as string,
            });

            await queryClient.invalidateQueries({ queryKey: ["job", jobId] });
            toast.success(res.message);
            router.push(`config-pipeline/${res.data.id}`);
        } catch (error) {
            handleError(error);
            setIsLoading(false);
        }
    };

    return (
        <div>
            <WarningModal
                isOpen={showWarning}
                isLoading={isLoading}
                closeModal={() => setShowWarning(false)}
                onConfirm={handleCreateFlow}
                content={t("create-flow:please_review_flow_info")}
                title={t("create-flow:create_new_assessment_flow")}
            />
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2">
                <CustomInput
                    title={t("common:name")}
                    value={formState.name}
                    onChange={e => {
                        setFormState({
                            ...formState,
                            name: e.target.value,
                        });
                        setFormErr({
                            ...formErr,
                            nameErr: "",
                        });
                    }}
                    required
                    errorText={formErr.nameErr}
                />
                <div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <DatePicker
                        title={t("common:start_time")}
                        value={formState.startTime}
                        minDate={new Date()}
                        onChange={date => {
                            setFormState({
                                ...formState,
                                startTime: date,
                                endTime:
                                    moment(formState.endTime).diff(
                                        date,
                                        "days"
                                    ) < 7
                                        ? moment(date).add(7, "days").toDate()
                                        : formState.endTime,
                            });
                            setFormErr({
                                ...formErr,
                                flowTimelineErr: "",
                            });
                        }}
                    />
                </div>
                <div>
                    <DatePicker
                        title={t("common:end_time")}
                        value={formState.endTime}
                        minDate={moment(formState.startTime)
                            .add(7, "days")
                            .toDate()}
                        maxDate={moment(formState.endTime)
                            .add(1, "year")
                            .toDate()}
                        onChange={date => {
                            setFormState({
                                ...formState,
                                endTime: date,
                            });
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

            <React.Fragment>
                {datas?.map((flow, index) => {
                    return (
                        <ul key={flow.id}>
                            <li>
                                <div className="flex items-center mb-4">
                                    <input
                                        id={`pipeline-${flow.id}`}
                                        type="radio"
                                        value=""
                                        name="recruiting-pipeline"
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        defaultChecked={index === 0}
                                        onChange={e => {
                                            if (e.currentTarget.checked) {
                                                setSelectedTemplate(
                                                    flow.assessments.map(
                                                        item => ({
                                                            name: item.name,
                                                            assessmentTypeName:
                                                                item.assessmentType,
                                                        })
                                                    )
                                                );
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor={`pipeline-${flow.id}`}
                                        className="ml-2 text-sm font-medium text-neutral-900 dark:text-gray-300"
                                    >
                                        {flow.name}
                                    </label>
                                </div>
                                <ul className="flex gap-2 mb-6">
                                    {flow.assessments.map(stage => (
                                        <li
                                            key={stage.name}
                                            className="flex-1 flex-shrink-0 w-0 min-w-0 text-center py-3 px-4 rounded-md flex flex-col items-center justify-between bg-white shadow-lg border border-gray-200"
                                        >
                                            <div className="w-8 h-8 text-neutral-700 mb-2">
                                                {getIconBaseOnAssessmentType(
                                                    stage.assessmentType
                                                )}
                                            </div>
                                            <span className="text-sm text-neutral-700 font-medium max-w-full whitespace-nowrap text-ellipsis overflow-hidden ">
                                                {stage.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                    );
                })}

                {formErr.flowErr && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">{formErr.flowErr}</span>
                    </p>
                )}

                <div className="w-fit mt-6">
                    <Button
                        disabled={isLoading}
                        onClick={() => setShowWarning(true)}
                    >
                        {t("common:save_changes")}
                    </Button>
                </div>
            </React.Fragment>
        </div>
    );
};

export default ChangePipeline;
