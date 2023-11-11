"use client";

import React from "react";
import { toast } from "react-toastify";
import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Button, CustomInput, DatePicker } from "@/components";
import { IAssessmentFlTempDto } from "@/services/assessment-flow-templates/assessment-flow-templates.interface";
import { IAssessmentFlow } from "@/services/assessment-flows/assessment-flows.interface";
import { getIconBaseOnAssessmentType } from "@/helpers/getIconBaseType";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setAssessmentFlow } from "@/redux/slices/assessment-flow.slice";

interface IChangePipeline {
    datas: (Omit<IAssessmentFlTempDto, "content"> & {
        assessments: IAssessmentFlow[];
    })[];
}

const ChangePipeline = ({ datas }: IChangePipeline) => {
    const { jobId } = useParams();
    const flowId = useSearchParams().get("flowId");
    const router = useRouter();

    const dispatch = useAppDispatch();
    const assessmentFlow = useAppSelector(state => state.assessmentFlow.data);

    const handleCreateFlow = async () => {
        try {
            const res = await assessmentFlowsServices.createAsync({
                ...assessmentFlow,
                assessments: assessmentFlow.assessments
                    .slice(1, -1)
                    .map(item => ({
                        name: item.name,
                        assessmentType: item.assessmentTypeName,
                    })),
                jobPostId: parseInt(jobId as string),
            });

            toast.success(res.message);
            dispatch(setAssessmentFlow(res.data));
            router.push(`config-pipeline/${res.data.id}`);
        } catch (error) {
            toast.error("Create flow error");
        }
    };

    const handleUpdateFlow = async () => {
        if (!assessmentFlow.id) return toast.error("Id requried");
        try {
            const res = await assessmentFlowsServices.editAsync({
                ...assessmentFlow,
                id: assessmentFlow.id,
                assessments: assessmentFlow.assessments.map(item => ({
                    name: item.name,
                    id: item.id,
                    assessmentType: item.assessmentTypeName,
                })),
            });

            toast.success(res.message);
            router.push(`config-pipeline/${assessmentFlow.id}`);
        } catch (error) {
            toast.error("Create flow error");
        }
    };

    return (
        <div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2">
                <CustomInput
                    title="Name"
                    value={assessmentFlow.name}
                    onChange={e =>
                        dispatch(
                            setAssessmentFlow({
                                ...assessmentFlow,
                                name: e.target.value,
                            })
                        )
                    }
                    required
                />
                <div></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Start time
                    </h3>
                    <DatePicker
                        value={new Date(assessmentFlow.startTime)}
                        onChange={date =>
                            dispatch(
                                setAssessmentFlow({
                                    ...assessmentFlow,
                                    startTime: date,
                                })
                            )
                        }
                    />
                </div>
                <div>
                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        End time
                    </h3>
                    <DatePicker
                        value={new Date(assessmentFlow.endTime)}
                        onChange={date =>
                            dispatch(
                                setAssessmentFlow({
                                    ...assessmentFlow,
                                    endTime: date,
                                })
                            )
                        }
                    />
                </div>
            </div>

            {assessmentFlow.id && (
                <>
                    <h3 className="ml-2 text-xl font-semibold text-neutral-900 dark:text-gray-300 mb-4">
                        {assessmentFlow.name}
                    </h3>
                    <ul className="flex gap-2 mb-8">
                        {assessmentFlow.assessments.map(stage => (
                            <li
                                key={stage.name}
                                className="flex-1 flex-shrink-0 w-0 min-w-0 text-center py-3 px-4 rounded-md flex flex-col items-center justify-between bg-white shadow-lg border border-gray-200"
                            >
                                <div className="w-8 h-8 text-neutral-700 mb-2">
                                    {getIconBaseOnAssessmentType(
                                        stage.assessmentTypeName
                                    )}
                                </div>
                                <span className="text-sm text-neutral-700 font-medium max-w-full whitespace-nowrap text-ellipsis overflow-hidden ">
                                    {stage.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <h4 className="text-sm font-semibold text-neutral-900 dark:text-gray-300 mb-8">
                        Select another flow
                    </h4>
                </>
            )}

            <React.Fragment>
                {datas?.map((flow, index) => {
                    return (
                        <ul key={flow.id} className="mb-6">
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
                                                dispatch(
                                                    setAssessmentFlow({
                                                        ...assessmentFlow,
                                                        assessments:
                                                            flow.assessments.map(
                                                                item => ({
                                                                    name: item.name,
                                                                    assessmentTypeName:
                                                                        item.assessmentType,
                                                                })
                                                            ),
                                                    })
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

                <div className="w-fit">
                    <Button
                        onClick={flowId ? handleUpdateFlow : handleCreateFlow}
                    >
                        Save changes
                    </Button>
                </div>
            </React.Fragment>
        </div>
    );
};

export default ChangePipeline;
