"use client";

import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { getJobById, mergeAppFormFields } from "@/redux/thunks/job.thunk";
import jobServices from "@/services/job/job.service";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { setJob } from "@/redux/slices/job.slice";
import { fetchAssessmentFlowById } from "@/redux/thunks/assessment-flow.thunk";
import { ApplicationFormJSON } from "@/services";

const WrapperJobDetail = ({ children }: { children: React.ReactNode }) => {
    const { jobId } = useParams();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { data: flow, loading: flowLoading } = useAppSelector(
        state => state.assessmentFlow
    );
    const {
        data: queryRes,
        error,
        isSuccess,
        isLoading,
    } = useQuery({
        queryKey: ["job", jobId],
        queryFn: async () => {
            const [jobAppFormRes, appFormTemplateRes] = await Promise.all([
                jobServices.getByIdAsync(jobId as string),
                appFormTemplateServices.getDefaultAppFormTemplate(),
            ]);
            const jobAppFormParsed = JSON.parse(
                jobAppFormRes.data.applicationForm
            ) as ApplicationFormJSON;
            const appFormTemplateParsed = JSON.parse(
                appFormTemplateRes.data.content
            );

            const mergeAppForm = mergeAppFormFields(
                jobAppFormParsed.form_structure,
                appFormTemplateParsed.app_form
            );
            return {
                ...jobAppFormRes.data,
                applicationForm: JSON.stringify({
                    form_structure: mergeAppForm,
                    questions: jobAppFormParsed.questions,
                } as ApplicationFormJSON),
            };
        },
    });

    useEffect(() => {
        if (isSuccess) {
            dispatch(
                setJob({
                    ...queryRes,
                    content: JSON.parse(queryRes.content),
                    applicationForm: JSON.parse(queryRes.applicationForm),
                })
            );
            if (queryRes.assessmentFlowId) {
                dispatch(fetchAssessmentFlowById(queryRes.assessmentFlowId));
            }
        }
    }, [isSuccess, queryRes, dispatch]);

    if (isLoading || flowLoading)
        return (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LoadingIndicator />
            </div>
        );

    if (!flow.id) {
        return (
            <div className="flex flex-col items-center justify-center p-52">
                <h3 className="text-2xl whitespace-nowrap mb-4">
                    You are not allowed to access this recruitment process
                </h3>
                <button
                    type="button"
                    className="text-lg text-blue_primary_600 hover:text-blue_primary_800 hover:underline"
                    onClick={() => {
                        router.back();
                    }}
                >
                    Back
                </button>
            </div>
        );
    }

    return <>{children}</>;
};

export default WrapperJobDetail;
