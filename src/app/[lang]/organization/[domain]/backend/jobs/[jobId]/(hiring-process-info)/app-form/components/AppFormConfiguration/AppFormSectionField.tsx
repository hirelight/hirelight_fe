"use client";

import React from "react";

import { useAppDispatch } from "@/redux/reduxHooks";
import { IAppFormField } from "@/interfaces";
import { editAppFormField } from "@/redux/slices/job.slice";

import styles from "./AppFormSectionField.module.scss";

interface AppFormSectionFieldProps {
    sectionId: string;
    data: IAppFormField;
}

const AppFormSectionField: React.FC<AppFormSectionFieldProps> = ({
    sectionId,
    data,
}) => {
    const [selected, setSelected] = React.useState<
        "Mandatory" | "Optional" | "Off"
    >(
        data.required === undefined
            ? "Off"
            : data.required
            ? "Mandatory"
            : "Optional"
    );
    const dispatch = useAppDispatch();

    const handleSelectType = (option: "Mandatory" | "Optional" | "Off") => {
        setSelected(option);
        // const newAppForm = appForms.map(section => {
        //     if (section.id === sectionId) {
        //         return {
        //             ...section,
        //             fields: section.fields.map(field => {
        //                 if (field.label === data.label)
        //                     return {
        //                         ...field,
        //                         required:
        //                             option === "Off"
        //                                 ? undefined
        //                                 : option === "Mandatory"
        //                                 ? true
        //                                 : false,
        //                     };
        //                 return field;
        //             }),
        //         };
        //     }

        //     return section;
        // });
        dispatch(
            editAppFormField({
                sectionId: sectionId,
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
    };

    return (
        <div className={`py-6 flex justify-between items-center `}>
            <span className="">{data.label}</span>
            <div className="flex gap-2">
                {(["Name", "Email"].includes(data.label)
                    ? ["Mandatory"]
                    : ["education", "experience"].includes(data.id)
                    ? ["Optional", "Off"]
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
