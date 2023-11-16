"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { getJobById, mergeAppFormFields } from "@/redux/thunks/job.thunk";
import jobServices from "@/services/job/job.service";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { setJob } from "@/redux/slices/job.slice";
import { ApplicationFormJSON } from "@/services";

const WrapperJobDetail = ({ children }: { children: React.ReactNode }) => {
    const { jobId } = useParams();
    const dispatch = useAppDispatch();
    const {
        data: queryRes,
        error,
        isSuccess,
        isLoading,
    } = useQuery({
        queryKey: [`job-${jobId}`],
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
        if (isSuccess)
            dispatch(
                setJob({
                    ...queryRes,
                    content: JSON.parse(queryRes.content),
                    applicationForm: JSON.parse(queryRes.applicationForm),
                })
            );
    }, [isSuccess, queryRes, dispatch]);

    if (isLoading) {
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );
    }

    return <>{children}</>;
};

export default WrapperJobDetail;
