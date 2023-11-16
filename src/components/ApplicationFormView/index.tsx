"use client";

import React from "react";

import { IAppFormSection } from "@/interfaces";
import { ApplicationFormJSON, IJobDto, JobContentJson } from "@/services";

import AppFormSection from "./AppFormSection";
import styles from "./styles.module.scss";

type AppFormViewProps = {
    data: Omit<IJobDto, "content" | "applicationForm"> & {
        content: JobContentJson;
        applicationForm: ApplicationFormJSON;
    };
    onApply?: () => void;
    viewOnly?: boolean;
};

const AppFormView: React.FC<AppFormViewProps> = ({
    data,
    onApply,
    viewOnly = false,
}) => {
    return (
        <div className={styles.view__wrapper}>
            <div className={`bg-white flex flex-col gap-6 items-center py-16`}>
                <h1 className="text-4xl font-medium text-blue_primary_800">
                    Company name
                </h1>
                <h3 className="text-2xl font-medium">{data.title}</h3>
            </div>
            <div className="">
                <div className="w-full drop-shadow-md bg-white border-t border-gray-300 sticky top-0 z-10">
                    <div className="flex gap-8 w-fit  font-medium uppercase text-neutral-500 mx-auto">
                        <span className="py-4 ">Overview</span>
                        <span className='py-4 text-blue_primary_700 relative after:content-[""] after:absolute after:w-full after:left-0 after:bottom-0 after:h-0.5 rounded-full after:bg-blue_primary_800'>
                            Application
                        </span>
                    </div>
                </div>
                <div
                    className={`min-h-[800px] bg-slate-100 w-full ${
                        viewOnly ? "pointer-events-none" : ""
                    }`}
                >
                    <div className="max-w-3xl p-2 px-4 md:p-4 md:py-10 mx-auto sm">
                        <AppFormSection
                            jobPostId={data.id}
                            data={data.applicationForm}
                            onApply={onApply}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppFormView;
