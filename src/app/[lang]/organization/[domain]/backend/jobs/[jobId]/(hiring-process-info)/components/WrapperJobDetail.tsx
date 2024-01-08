"use client";

import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";

import LoadingIndicator from "@/components/LoadingIndicator";
import { useAppDispatch } from "@/redux/reduxHooks";
import { mergeAppFormFields } from "@/redux/thunks/job.thunk";
import jobServices from "@/services/job/job.service";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { setContentLength, setJob } from "@/redux/slices/job.slice";
import { ApplicationFormJSON } from "@/services";
import { extractTextFromHtml } from "@/helpers";

const WrapperJobDetail = ({ children }: { children: React.ReactNode }) => {
    const { jobId } = useParams();
    const dispatch = useAppDispatch();
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
                    startTime: moment.utc(queryRes.startTime).toDate(),
                    endTime: moment.utc(queryRes.endTime).toDate(),
                    applicationForm: JSON.parse(queryRes.applicationForm),
                })
            );

            dispatch(
                setContentLength({
                    description: extractTextFromHtml(
                        JSON.parse(queryRes.content).description
                    ).length,
                    requirements: extractTextFromHtml(
                        JSON.parse(queryRes.content).requirements
                    ).length,
                    benefits: extractTextFromHtml(
                        JSON.parse(queryRes.content).benefits
                    ).length,
                })
            );
        }
    }, [isSuccess, queryRes, dispatch]);

    if (isLoading || !queryRes) {
        return (
            <div className="p-12 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );
    }

    return <>{children}</>;
};

export default WrapperJobDetail;
