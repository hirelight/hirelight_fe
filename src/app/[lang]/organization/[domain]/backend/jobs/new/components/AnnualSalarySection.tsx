"use client";

import React from "react";
import { useParams } from "next/navigation";

import { CustomInput, Selection } from "@/components";
import currencies from "@/utils/shared/currencies.json";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

import styles from "./AddJobDetailForm.module.scss";
import { useAddJobDetailForm } from "./AddJobDetailForm";

const AnnualSalarySection = () => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "new-job");

    const { formState, setFormState, formErr, setFormErr } =
        useAddJobDetailForm();

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
                            value={formState.minSalary}
                            onChange={e => {
                                setFormState({
                                    ...formState,
                                    minSalary: parseInt(e.target.value),
                                });
                                setFormErr({
                                    ...formErr,
                                    salaryErr: "",
                                });
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
                            value={formState.maxSalary}
                            onChange={e => {
                                {
                                    setFormState({
                                        ...formState,
                                        maxSalary: parseInt(e.target.value),
                                    });
                                    setFormErr({
                                        ...formErr,
                                        salaryErr: "",
                                    });
                                }
                            }}
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
                                formState.currency
                                    ? currencies[
                                          formState.currency as keyof typeof currencies
                                      ].name
                                    : ""
                            }
                            onChange={value => {
                                setFormState({
                                    ...formState,
                                    currency: value.code,
                                });
                                setFormErr({
                                    ...formErr,
                                    salaryErr: "",
                                });
                            }}
                        />
                    </div>
                </div>
                {formErr.salaryErr && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                        <span className="font-medium">
                            {formErr.salaryErr}{" "}
                        </span>
                    </p>
                )}
            </div>
        </section>
    );
};

export default AnnualSalarySection;
