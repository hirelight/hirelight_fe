"use client";

import React from "react";

import { useAppDispatch } from "@/redux/reduxHooks";
import { setField } from "@/redux/slices/app-form.slice";
import { IAppFormField } from "@/interfaces";

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

    const handleSelectType = (option: "Mandatory" | "Optional" | "Off") => {
        setSelected(option);
        setTimeout(() => {
            dispatch(
                setField({
                    sectionName: sectionName,
                    field: {
                        ...data,
                        required:
                            option === "Off"
                                ? undefined
                                : option === "Mandatory"
                                ? true
                                : false,
                    },
                })
            );
        }, 500);
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
