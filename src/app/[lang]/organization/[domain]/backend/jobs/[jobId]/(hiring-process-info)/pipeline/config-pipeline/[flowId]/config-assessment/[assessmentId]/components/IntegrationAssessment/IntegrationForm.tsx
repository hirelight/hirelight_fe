"use client";

import React, { FormEvent, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { Button, ButtonOutline, CustomInput, Selection } from "@/components";
import assessmentsServices from "@/services/assessments/assessments.service";
import integrationServices from "@/services/integration/integration.service";
import { Logo } from "@/icons";
import { extractTextFromHtml, isInvalidForm } from "@/helpers";
import { useAppSelector } from "@/redux/reduxHooks";
import { ThirdPartyAssessment } from "@/services";

import styles from "./IntergationForm.module.scss";
import IntegrationCard from "./IntegrationCard";

const QuillEditorNoSSR = dynamic(() => import("@/components/QuillEditor"), {
    ssr: false,
    loading: () => <div className="min-h-[300px] border border-gray-300"></div>,
});

type IPutAssessment = {
    id: string;
    name: string;
    description: string;
    content: {
        service: string;
        orgName: string;
        assessmentId: string;
        assessmentName: string;
    };
    query: string;
    duration: number;
    index: number;
    assessmentQuestionAnswerSetContent: string;
};

const IntegrationForm = () => {
    const { assessmentId, flowId } = useParams();

    const assessment = useAppSelector(state => state.assessment.data);

    const queryClient = useQueryClient();
    const { data: thirdPartyRes, isLoading: thirpartyLoading } = useQuery({
        queryKey: ["third-parties"],
        queryFn: integrationServices.getList,
    });

    const [isLoading, setIsLoading] = useState(false);
    const [formErr, setFormErr] = useState({
        nameErr: "",
        questionsErr: "",
        descriptionErr: "",
    });
    const [formState, setFormState] = useState<IPutAssessment>({
        id: assessmentId as string,
        name: assessment.name,
        description: assessment.description ?? "",
        content: assessment.content
            ? JSON.parse(assessment.content)
            : {
                  service: "",
                  orgName: "",
                  assessmentId: "",
                  assessmentName: "",
              },
        query: assessment.query ? JSON.parse(assessment.query) : null,
        duration: assessment.duration ?? 0,
        index: assessment.index,
        assessmentQuestionAnswerSetContent:
            assessment.assessmentQuestionAnswerSetContent ?? "",
    });
    const [selectedAssessment, setSelectedAssessment] = useState<{
        service: string;
        orgName: string;
        assessmentId: string;
        assessmentName: string;
    }>(assessment.content ? JSON.parse(assessment.content) : undefined);

    const validation = (): boolean => {
        let error = formErr;

        if (!selectedAssessment)
            error.questionsErr = "Please select at least one assessment";

        if (!formState.name) error.nameErr = "Name must not not be blank";

        if (extractTextFromHtml(formState.description).length < 100)
            error.descriptionErr = "Description must at least 100 characters";

        if (isInvalidForm(error)) {
            setFormErr({ ...error });
            toast.error(
                <div>
                    <p>Invalid input</p>
                    <p>Check issue in red!</p>
                </div>,
                {
                    position: "top-center",
                    autoClose: 1500,
                }
            );
            return true;
        }
        return false;
    };

    const handleSaveAssessment = async (e: FormEvent) => {
        e.preventDefault();

        if (validation()) return;
        setIsLoading(true);
        try {
            const res = await assessmentsServices.editAsync({
                ...formState,
                content: JSON.stringify(selectedAssessment),
                query: JSON.stringify(formState.query),
            });
            await queryClient.invalidateQueries({
                queryKey: [`assessmentFlow`, flowId],
            });
            await queryClient.invalidateQueries({
                queryKey: ["assessment", assessmentId],
            });
            toast.success(res.message);
            setIsLoading(false);
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSaveAssessment}>
            <section>
                <h3 className={styles.section__h3}>
                    <Logo className="w-6 h-6 text-blue_primary_300" />
                    Welcome page info
                </h3>

                <div className="flex items-start gap-6 mb-6 px-4 xl:px-6">
                    <CustomInput
                        title="Title"
                        id="multiple-choice-assessment__title"
                        name="multiple-choice-assessment__title"
                        type="text"
                        placeholder="Assessment title"
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
                </div>

                <div className="flex flex-col gap-4 mb-6 px-4 xl:px-6">
                    <h3 className="text-neutral-700 font-medium">
                        Description
                    </h3>
                    <QuillEditorNoSSR
                        placeholder="Enter the job description here; include key areas of
                    responsibility and what the candidate might do on a typical
                    day."
                        className="min-h-[320px]"
                        theme="snow"
                        value={formState.description}
                        onChange={(value: string) => {
                            setFormState({
                                ...formState,
                                description: value,
                            });
                            setFormErr({
                                ...formErr,
                                descriptionErr: "",
                            });
                        }}
                        errorText={formErr.descriptionErr}
                    />
                </div>
            </section>

            <section>
                <h3 className={styles.section__h3}>
                    <Logo className="w-6 h-6 text-blue_primary_300" />
                    Third party assessment providers
                </h3>
                {!thirpartyLoading ? (
                    <ul>
                        {thirdPartyRes?.data.map(thirdParty => (
                            <li key={thirdParty.service}>
                                <IntegrationCard
                                    data={thirdParty}
                                    selected={selectedAssessment}
                                    onSelect={selected =>
                                        setSelectedAssessment(selected)
                                    }
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <ThirdpartySkeleton />
                )}
            </section>
            <div className="flex items-center justify-end gap-4 p-4 xl:px-6">
                <Button
                    type="submit"
                    disabled={isLoading}
                    isLoading={isLoading}
                >
                    Save all changes
                </Button>
            </div>
        </form>
    );
};

export default IntegrationForm;

const ThirdpartySkeleton = () => {
    return (
        <div className="animate-pulse">
            {new Array(3).fill("").map((_, index) => (
                <div key={index} className={`p-4 flex items-start`}>
                    <div className="w-14 h-14 rounded-full bg-slate-300"></div>
                    <div className="flex-1 ml-4">
                        <h3 className="mb-2 h-6 w-16 bg-slate-300"></h3>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};
