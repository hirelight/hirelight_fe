"use client";

import React from "react";

import { CustomInput, Selection } from "@/components";
import { experienceLevels, workModalities } from "@/utils/shared/initialDatas";

import styles from "./AddJobDetailForm.module.scss";
import { useAddJobDetailForm } from "./AddJobDetailForm";

const EmployementDetailsSection = () => {
    const { formState, setFormState } = useAddJobDetailForm();

    return (
        <section className="relative">
            <h2 className={`${styles.form__section__title}`}>
                Employment details
            </h2>
            <div className={`${styles.form__section__wrapper}`}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <Selection
                        title="Employment type"
                        items={workModalities.map(item => ({
                            label: item.name,
                            value: item.name,
                        }))}
                        value={formState.workModality}
                        onChange={(value: string) => {
                            setFormState({
                                ...formState,
                                workModality: value,
                            });
                        }}
                    />
                    <Selection
                        title="Experience"
                        items={experienceLevels.map(item => ({
                            label: item.name,
                            value: item.name,
                        }))}
                        value={formState.experience}
                        onChange={(value: string) => {
                            setFormState({
                                ...formState,
                                experience: value,
                            });
                        }}
                    />
                    <CustomInput
                        title="Keywords"
                        type="text"
                        onChange={() => {}}
                    />
                </div>
            </div>
        </section>
    );
};

export default EmployementDetailsSection;
