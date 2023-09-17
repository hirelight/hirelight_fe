"use client";

import React from "react";

import { EAppFormOption } from "@/interfaces";
import { useAppDispatch } from "@/redux/reduxHooks";
import { setField } from "@/redux/slices/app-form.slice";

import styles from "./AppFormSectionField.module.scss";

interface IAppFormSectionField {
    sectionTitle: string;
    label: string;
    options: EAppFormOption[];
}

const AppFormSectionField = ({
    sectionTitle,
    label,
    options,
}: IAppFormSectionField) => {
    const [selected, setSelected] = React.useState(
        options[Math.floor(options.length / 2)]
    );
    const dispatch = useAppDispatch();

    const handleSelectType = (option: EAppFormOption) => {
        setSelected(option);
        setTimeout(() => {
            dispatch(
                setField({
                    sectionTitle: sectionTitle,
                    label,
                    option,
                })
            );
        }, 500);
    };

    return (
        <div className={`pt-3 pb-4 flex justify-between items-center `}>
            <span className="">{label}</span>
            <div className="flex gap-2">
                {options.map(option => (
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
