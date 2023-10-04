import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

import { CustomFileInput, CustomInput, CustomTextArea } from "@/components";
import { EAppFormOption, IAppFormField } from "@/interfaces";
import { useAppSelector } from "@/redux/reduxHooks";

import styles from "./AppFormMobileSection.module.scss";

const AppFormMobileSection = () => {
    const appForm = useAppSelector(state => state.appForm.datas);

    const inputFieldOnType = (field: IAppFormField) => {
        switch (field.inputType) {
            case "text-area":
                return (
                    <div key={field.label} className=" mb-6">
                        <CustomTextArea
                            title={field.label}
                            type={field.inputType}
                            required={
                                field.selectedOption ===
                                EAppFormOption.MANDATORY
                            }
                        />
                    </div>
                );
            case "file":
                return (
                    <div key={field.label} className=" mb-6">
                        <CustomFileInput
                            title={field.label}
                            type={field.inputType}
                            required={
                                field.selectedOption ===
                                EAppFormOption.MANDATORY
                            }
                        />
                    </div>
                );
            default:
                return (
                    <div key={field.label} className=" mb-6">
                        <CustomInput
                            title={field.label}
                            type={field.inputType}
                            required={
                                field.selectedOption ===
                                EAppFormOption.MANDATORY
                            }
                        />
                    </div>
                );
        }
    };

    return (
        <div className="px-4">
            <h4 className="text-sm text-neutral-700 py-8">
                <span className="text-red-500 mr-1">*</span>
                Required fields
            </h4>
            {appForm.map(section => {
                return (
                    <section key={section.title}>
                        <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
                            <h2 className="text-xl">{section.title}</h2>
                            <div className="flex gap-1 items-center text-neutral-500 text-sm">
                                <TrashIcon className="w-4 h-4" />
                                Clear
                            </div>
                        </div>
                        {section.fields
                            .filter(
                                field =>
                                    field.selectedOption !== EAppFormOption.OFF
                            )
                            .map((field, index) => {
                                if (field.label.toLowerCase() === "name") {
                                    return (
                                        <React.Fragment key={field.label}>
                                            {inputFieldOnType({
                                                ...field,
                                                label: "First name",
                                            })}
                                            {inputFieldOnType({
                                                ...field,
                                                label: "Last name",
                                            })}
                                        </React.Fragment>
                                    );
                                }

                                return inputFieldOnType(field);
                            })}
                    </section>
                );
            })}
            <button
                type="button"
                className="w-full text-white bg-blue_primary_700 hover:bg-blue_primary_800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 dark:bg-blue_primary_600 dark:hover:bg-blue_primary_700 focus:outline-none dark:focus:ring-blue_prbg-blue_primary_800"
            >
                Submit application
            </button>
        </div>
    );
};

export default AppFormMobileSection;
