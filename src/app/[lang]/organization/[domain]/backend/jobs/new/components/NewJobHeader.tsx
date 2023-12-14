"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import jobServices from "@/services/job/job.service";
import appFormTemplateServices from "@/services/app-form-template/app-form-template.service";
import { SpinLoading } from "@/icons";
import { handleError } from "@/helpers";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import { useAddJobDetailForm } from "./AddJobDetailForm";
import styles from "./NewJobHeader.module.scss";

interface NewJobHeaderProps {}

const NewJobHeader = ({}: NewJobHeaderProps) => {
    const router = useRouter();
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "new-job");

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
            handleError(error);
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
                        {formState.title ? formState.title : t("new_job")}
                    </h4>
                    <div className="hidden md:block">
                        <button
                            type="button"
                            className="text-white bg-blue_primary_700 hover:bg-blue_primary_800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:opacity-80"
                            disabled={isLoading}
                            onClick={handleSaveAndContinue}
                        >
                            {isLoading && <SpinLoading className="mr-2" />}{" "}
                            {t("common:save_and_continue")}
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
                                {t("job_details")}
                            </h3>
                            <p className={`${styles.section__description}`}>
                                {t("tell_applicant_about_this_role")}
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
                                    {t("application_form")}
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    {t("design_app_form")}
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
                                    {t("team_members")}
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    {t("invite_or_add")}
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
                                    {t("common:assessment_flow")}
                                </h3>
                                <p className={`${styles.section__description}`}>
                                    {t("create_a_kit")}
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
