"use client";

import React from "react";

import { useAppDispatch } from "@/redux/reduxHooks";
import { setField } from "@/redux/slices/app-form.slice";
import { EAppFormOption, IAppFormField } from "@/interfaces";

import styles from "./AppFormSectionField.module.scss";

interface IAppFormSectionField {
    sectionTitle: string;
    field: IAppFormField;
}

const AppFormSectionField = ({ sectionTitle, field }: IAppFormSectionField) => {
    const [selected, setSelected] = React.useState(field.selectedOption);
    const dispatch = useAppDispatch();

    const handleSelectType = (option: EAppFormOption) => {
        setSelected(option);
        setTimeout(() => {
            dispatch(
                setField({
                    sectionTitle: sectionTitle,
                    label: field.label,
                    option,
                })
            );
        }, 500);
    };

    return (
        <div className={`py-6 flex justify-between items-center `}>
            <span className="">{field.label}</span>
            <div className="flex gap-2">
                {field.options.map(option => (
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
