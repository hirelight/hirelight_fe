"use client";

import React from "react";

import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { setField } from "@/redux/slices/app-form.slice";
import { IAppFormField } from "@/interfaces";
import { setAppForm } from "@/redux/slices/job.slice";

import styles from "./AppFormSectionField.module.scss";

interface AppFormSectionFieldProps {
    sectionName: string;
    data: IAppFormField;
}

const AppFormSectionField: React.FC<AppFormSectionFieldProps> = ({
    sectionName,
    data,
}) => {
    const [selected, setSelected] = React.useState<
        "Mandatory" | "Optional" | "Off"
    >(data.required ? "Mandatory" : "Optional");
    const dispatch = useAppDispatch();
    const appForms = useAppSelector(state => state.job.data.applicationForm);

    const handleSelectType = (option: "Mandatory" | "Optional" | "Off") => {
        setSelected(option);
        const newAppForm = appForms.map(section => {
            if (section.name === sectionName) {
                return {
                    ...section,
                    fields: section.fields.map(field => {
                        if (field.label === data.label)
                            return {
                                ...field,
                                required:
                                    option === "Off"
                                        ? undefined
                                        : option === "Mandatory"
                                        ? true
                                        : false,
                            };
                        return field;
                    }),
                };
            }

            return section;
        });
        dispatch(setAppForm(newAppForm));
    };

    return (
        <div className={`py-6 flex justify-between items-center `}>
            <span className="">{data.label}</span>
            <div className="flex gap-2">
                {(["Name", "Email"].includes(data.label)
                    ? ["Mandatory"]
                    : ["Mandatory", "Optional", "Off"]
                ).map((option: any) => (
                    <button
                        key={option}
                        type="button"
                        className={`${styles.option__wrapper} ${
                            selected === option ? styles.active : ""
                        }`}
                        onClick={handleSelectType.bind(null, option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AppFormSectionField;
