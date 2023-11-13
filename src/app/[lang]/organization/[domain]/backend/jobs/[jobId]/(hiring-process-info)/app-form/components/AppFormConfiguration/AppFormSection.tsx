"use client";

import React from "react";

import { IAppFormField, IAppFormSection, ICustomField } from "@/interfaces";

import styles from "./AppFormSection.module.scss";
import AppFormSectionField from "./AppFormSectionField";
import CustomFieldOnType from "./CustomFieldOnType";

interface AppFormSectionProps {
    data: IAppFormSection;
}

const AppFormSection: React.FC<AppFormSectionProps> = ({
    data: { name, fields },
}) => {
    return (
        <section>
            <div className="px-4 xl:px-6 py-4 mb-4 flex items-center bg-slate-300 bg-opacity-20 text-lg font-medium">
                <h2>{name}</h2>
            </div>
            <ul className="px-4 xl:px-6 text-neutral-700 font-medium text-sm">
                {fields.map(field => (
                    <li
                        key={field.label}
                        className="border-b last-of-type:border-none border-gray-300"
                    >
                        {field.custom ? (
                            <CustomFieldOnType field={field as ICustomField} />
                        ) : (
                            <AppFormSectionField
                                sectionName={name}
                                data={field}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default AppFormSection;
