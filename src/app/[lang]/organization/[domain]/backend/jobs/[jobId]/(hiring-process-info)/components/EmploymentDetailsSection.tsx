"use client";

import React from "react";

import { CustomInput, Selection } from "@/components";
import { experienceLevels, workModalities } from "@/utils/shared/initialDatas";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setJob } from "@/redux/slices/job.slice";

import styles from "./EditJobDetailForm.module.scss";

const EmploymentDetailsSection = () => {
    const dispatch = useAppDispatch();
    const { data: job } = useAppSelector(state => state.job);

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
                        value={job.workModality}
                        onChange={(value: string) => {
                            dispatch(
                                setJob({
                                    ...job,
                                    workModality: value,
                                })
                            );
                        }}
                    />
                    <Selection
                        title="Experience"
                        items={experienceLevels.map(item => ({
                            label: item.name,
                            value: item.name,
                        }))}
                        value={job.experience}
                        onChange={(value: string) => {
                            dispatch(
                                setJob({
                                    ...job,
                                    experience: value,
                                })
                            );
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

export default EmploymentDetailsSection;
