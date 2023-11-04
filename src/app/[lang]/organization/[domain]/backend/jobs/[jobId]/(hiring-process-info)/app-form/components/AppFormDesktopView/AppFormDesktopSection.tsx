import React from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { useAppSelector } from "@/redux/reduxHooks";
import { CustomFileInput, CustomInput, CustomTextArea } from "@/components";
import { IAppFormField, IAppFormSection } from "@/interfaces";

type AppFormDesktopSectionProps = {};

const AppFormDesktopSection: React.FC<AppFormDesktopSectionProps> = ({}) => {
    const appFormSections = useAppSelector(
        state => state.job.data.applicationForm
    );

    const inputFieldOnType = (field: IAppFormField) => {
        switch (field.type) {
            case "text-area":
                return (
                    <div key={field.label} className=" mb-6">
                        <CustomTextArea
                            key={field.label}
                            title={field.label}
                            type={field.type}
                            required={field.required}
                        />
                    </div>
                );
            case "file":
                return (
                    <div key={field.label} className=" mb-6">
                        <CustomFileInput
                            key={field.label}
                            title={field.label}
                            type={field.type}
                            required={field.required}
                        />
                    </div>
                );
            default:
                return (
                    <div key={field.label} className=" mb-6">
                        <CustomInput
                            key={field.label}
                            title={field.label}
                            type={field.type}
                            required={field.required}
                        />
                    </div>
                );
        }
    };

    return (
        <div>
            <h4 className="text-sm text-neutral-700 py-8">
                <span className="text-red-500 mr-1">*</span>
                Required fields
            </h4>
            {appFormSections.map(section => {
                return (
                    <section key={section.name}>
                        <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-8">
                            <h2 className="text-xl">{section.name}</h2>
                            <div className="flex gap-1 items-center text-neutral-500 text-sm">
                                <TrashIcon className="w-4 h-4" />
                                Clear
                            </div>
                        </div>
                        {section.fields
                            .filter(field => field.required !== undefined)
                            .map(field => {
                                if (field.label === "Name")
                                    return (
                                        <div
                                            key={field.label}
                                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                        >
                                            {inputFieldOnType({
                                                ...field,
                                                label: "First name",
                                                id: "firstname",
                                            })}
                                            {inputFieldOnType({
                                                ...field,
                                                label: "Last name",
                                                id: "firstname",
                                            })}
                                        </div>
                                    );
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

export default AppFormDesktopSection;
