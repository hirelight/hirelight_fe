"use client";

import React from "react";

import { CustomInput, Selection } from "@/components";
import currencies from "@/utils/shared/currencies.json";

import styles from "./AddJobDetailForm.module.scss";
import { useAddJobDetailForm } from "./AddJobDetailForm";

const AnnualSalarySection = () => {
    const { formState, setFormState, formErr, setFormErr } =
        useAddJobDetailForm();

    return (
        <section className="relative">
            <h2 className={`${styles.form__section__title}`}>Annual salary</h2>
            <div className={`${styles.form__section__wrapper}`}>
                <div className="grid col-auto gap-y-4 gap-x-4 md:grid-cols-4 md:gap-x-8">
                    <div>
                        <CustomInput
                            title="From"
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
                            title="To"
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
                            title="Currency"
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
