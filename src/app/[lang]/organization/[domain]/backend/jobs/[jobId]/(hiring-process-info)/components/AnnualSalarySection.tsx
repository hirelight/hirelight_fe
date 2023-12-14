"use client";

import React from "react";
import { useParams } from "next/navigation";

import { CustomInput, Selection } from "@/components";
import currencies from "@/utils/shared/currencies.json";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob, setJobError } from "@/redux/slices/job.slice";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./EditJobDetailForm.module.scss";

const AnnualSalarySection = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "new-job");

    const dispatch = useAppDispatch();
    const { data: job, error: jobErr } = useAppSelector(state => state.job);

    return (
        <section className="relative">
            <h2 className={`${styles.form__section__title}`}>
                {t("annual_salary")}
            </h2>
            <div className={`${styles.form__section__wrapper}`}>
                <div className="grid col-auto gap-y-4 gap-x-4 md:grid-cols-4 md:gap-x-8">
                    <div>
                        <CustomInput
                            title={t("common:from")}
                            id="min-salary"
                            type="number"
                            min={0}
                            step={1000}
                            value={job.minSalary}
                            onChange={e => {
                                dispatch(
                                    setJob({
                                        ...job,
                                        minSalary: parseInt(e.target.value),
                                    })
                                );
                                dispatch(
                                    setJobError({
                                        ...jobErr,
                                        salaryErr: "",
                                    })
                                );
                            }}
                        />
                    </div>
                    <div>
                        <CustomInput
                            title={t("common:to")}
                            id="max-salary"
                            type="number"
                            step={1000}
                            min={0}
                            value={job.maxSalary}
                            onChange={e => {
                                {
                                    dispatch(
                                        setJob({
                                            ...job,
                                            maxSalary: parseInt(e.target.value),
                                        })
                                    );
                                    dispatch(
                                        setJobError({
                                            ...jobErr,
                                            salaryErr: "",
                                        })
                                    );
                                }
                            }}
                            errorText={jobErr.salaryErr}
                        />
                    </div>
                    <div className="sm:col-span-2">
                        <Selection
                            title={t("currency")}
                            items={Object.values(currencies).map(item => ({
                                label: `${item.name} (${item.code})`,
                                value: item,
                            }))}
                            value={
                                job.currency
                                    ? currencies[
                                          job.currency as keyof typeof currencies
                                      ].name
                                    : ""
                            }
                            onChange={value => {
                                dispatch(
                                    setJob({
                                        ...job,
                                        currency: value.code,
                                    })
                                );
                                dispatch(
                                    setJobError({
                                        ...jobErr,
                                        salaryErr: "",
                                    })
                                );
                            }}
                        />
                    </div>
                </div>
                {jobErr.salaryErr && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">{jobErr.salaryErr} </span>
                    </p>
                )}
            </div>
        </section>
    );
};

export default AnnualSalarySection;
