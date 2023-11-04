"use client";

import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import { ButtonOutline } from "@/components";
import jobServices from "@/services/job/job.service";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob } from "@/redux/slices/job.slice";
import { IAppFormSection } from "@/interfaces";
import { IJobDto, JobContentJson } from "@/services/job/job.interface";
import LoadingIndicator from "@/components/LoadingIndicator";
import { getJobById } from "@/redux/thunks/job.thunk";

import AppFormConfiguration from "./AppFormConfiguration/AppFormConfiguration";
import AppFormMobileView from "./AppFormMobileView/AppFormMobileView";
import AppFormFooter from "./AppFormFooter/AppFormFooter";
import AppFormDesktopView from "./AppFormDesktopView/AppFormDesktopView";

type AppFormProps = {
    job: Omit<IJobDto, "content" | "applicationForm"> & {
        content: JobContentJson;
        applicationForm: IAppFormSection[];
    };
};

const AppForm: React.FC<AppFormProps> = ({ job }) => {
    const { jobId } = useParams();
    const dispatch = useAppDispatch();
    const [previewDesktop, setPreviewDesktop] = React.useState(false);
    const { loading, data } = useAppSelector(state => state.job);

    useEffect(() => {
        dispatch(getJobById(parseInt(jobId as string)));
    }, [dispatch, jobId]);

    if (loading || data.id === 0)
        return (
            <div className="w-full py-11 flex items-center justify-center">
                <LoadingIndicator />
            </div>
        );
    return (
        <div>
            <div className="w-full px-4 xl:px-0 flex justify-between items-center mb-4">
                <h3 className="text-sm uppercase font-bold text-neutral-700">
                    Customize your application form
                </h3>
                <ButtonOutline
                    className="ml-auto"
                    onClick={() => setPreviewDesktop(!previewDesktop)}
                >
                    {previewDesktop ? "View mobile mode" : "View destop mode"}
                </ButtonOutline>
            </div>
            {previewDesktop ? (
                <AppFormDesktopView />
            ) : (
                <form className="drop-shadow-lg">
                    <div className="flex">
                        <AppFormConfiguration
                            appFormSections={job.applicationForm}
                        />
                        <AppFormMobileView />
                    </div>
                    <AppFormFooter />
                </form>
            )}
        </div>
    );
};

export default AppForm;
