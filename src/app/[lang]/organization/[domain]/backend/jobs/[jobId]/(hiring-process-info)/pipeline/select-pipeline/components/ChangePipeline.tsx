"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";

import { Button, CustomInput, DatePicker } from "@/components";
import { ChevronDown } from "@/icons";
import assessmentFlowTemplatesServices from "@/services/assessment-flow-templates/assessment-flow-templates.service";
import { IAssessmentFlTempDto } from "@/services/assessment-flow-templates/assessment-flow-templates.interface";
import {
    IAssessmentFlow,
    ICreateAssessmentFlowDto,
} from "@/services/assessment-flows/assessment-flows.interface";
import { getIconBaseOnAssessmentType } from "@/helpers/getIconBaseType";
import assessmentFlowsServices from "@/services/assessment-flows/assessment-flows.service";

interface IChangePipeline {
    datas: (Omit<IAssessmentFlTempDto, "content"> & {
        assessments: IAssessmentFlow[];
    })[];
}

const ChangePipeline = ({ datas }: IChangePipeline) => {
    const { jobId } = useParams();

    const [formState, setFormState] = React.useState<ICreateAssessmentFlowDto>({
        name: "",
        startTime: new Date(),
        endTime: new Date(),
        jobPostId: parseInt(jobId as string),
        assessments: datas[0].assessments,
    });

    const handleCreateFlow = async () => {
        try {
            const res = await assessmentFlowsServices.createAsync({
                ...formState,
                assessments: formState.assessments
                    .slice(1, -1)
                    .map((assessment, index) => ({
                        ...assessment,
                        index: index + 1,
                    })),
            });

            toast.success(res.message);
        } catch (error) {
            toast.error("Create flow error");
        }
    };

    return (
        <div>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-2">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                    <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Start time
                    </h3>
                    <DatePicker
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
                        onChange={date =>
                            setFormState(prev => ({
                                ...prev,
                                endTime: date,
                            }))
                        }
                    />
                </div>
            </div>

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
                                                setFormState(prev => ({
                                                    ...prev,
                                                    assessments:
                                                        flow.assessments,
                                                }));
                                            }
                                        }}
                                    />
                                    <label
                                        htmlFor={`pipeline-${flow.id}`}
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {flow.name}
                                    </label>
                                </div>
                                <ul className="flex gap-2 mb-6">
                                    {flow.assessments.map(stage => (
                                        <li
                                            key={stage.index}
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
                    <Button onClick={handleCreateFlow}>Save changes</Button>
                </div>
            </React.Fragment>
        </div>
    );
};

export default ChangePipeline;
