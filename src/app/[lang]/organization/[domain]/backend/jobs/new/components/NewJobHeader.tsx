"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import jobServices from "@/services/job/job.service";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { SpinLoading } from "@/icons";

import styles from "./NewJobHeader.module.scss";
import { useAddJobDetailForm } from "./AddJobDetailForm";

interface NewJobHeaderProps {}

const NewJobHeader = ({}: NewJobHeaderProps) => {
    const router = useRouter();
    const { formState } = useAddJobDetailForm();
    const queryClient = useQueryClient();
    const [isLoading, setIsLoading] = useState(false);

    const handleSaveAndContinue = async (e: any) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            const appFormTemplateRes =
                await appFormTemplateServices.getDefaultAppFormTemplate();

            let parsedAppForm = JSON.parse(
                appFormTemplateRes.data.content
            ).app_form;

            const res = await jobServices.createAsync({
                ...formState,
                content: JSON.stringify(formState),
                applicationForm: JSON.stringify({
                    form_structure: parsedAppForm,
                    questions: [],
                }),
            });
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            router.push(`${res.data}/edit`);
            setIsLoading(false);
        } catch (error: any) {
            toast.error(error.message ? error.message : "Something went wrong");
            setIsLoading(false);
        }
    };

    return (
        <div
            className={[
                "bg-white rounded-md drop-shadow-md mt-8 mb-6",
                styles.header__wrapper,
            ].join(" ")}
        >
            <div className="max-w-screen-xl mx-auto py-5 px-4 xl:px-6 flex-shrink-0">
                <div className="w-full flex items-center justify-between mb-4">
                    <h4 className="text-2xl text-neutral-700 font-medium">
                        {formState.title ? formState.title : "New Job"}
                    </h4>
                    <div className="hidden md:block">
                        <button
                            type="button"
                            className="text-white bg-blue_primary_700 hover:bg-blue_primary_800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:opacity-80"
                            disabled={isLoading}
                            onClick={handleSaveAndContinue}
                        >
                            {isLoading && <SpinLoading className="mr-2" />} Save
                            & continue
                        </button>
                    </div>
                </div>
                <div className={styles.stage__wrapper}>
                    <div className={styles.section__wrapper}>
                        <button
                            type="button"
                            className={`${styles.section__container} ${styles.active}`}
                            tabIndex={-1}
                        >
                            <h3 className={styles.section__title}>
                                Job details
                            </h3>
                            <p className={`${styles.section__description}`}>
                                Tells applicants about this role, including job
                                title, location and requirements.
                            </p>
                        </button>
                    </div>
                    <div className={styles.section__wrapper}>
                        <div
                            className={`${styles.section__container} ${styles.disabled}`}
                        >
                            <div
                                tabIndex={-1}
                                className={`h-full pointer-events-none`}
                            >
                                <h3 className={styles.section__title}>
                                    Application Form
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    Design the application form for this role.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.section__wrapper}>
                        <div
                            className={`${styles.section__container} ${styles.disabled}`}
                        >
                            <div
                                tabIndex={-1}
                                className={`h-full pointer-events-none`}
                            >
                                <h3 className={styles.section__title}>
                                    Team Members
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    Invite or add co-workers to collaborate on
                                    this job.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`${styles.section__container} ${styles.disabled}`}
                        >
                            <div
                                tabIndex={-1}
                                className={`h-full pointer-events-none`}
                            >
                                <h3 className={styles.section__title}>
                                    Workflow
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    Create a kit or assessment test for a
                                    structured interview process.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewJobHeader;
