import React, { HTMLInputTypeAttribute } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";

import { useAppSelector } from "@/redux/reduxHooks";
import { CustomFileInput, CustomInput, CustomTextArea } from "@/components";
import { EAppFormOption, IAppFormField } from "@/interfaces";

import { mockDatas } from "./data";

type AppFormDesktopSectionProps = {
    datas: (typeof mockDatas)[0][];
};

interface Field extends React.HTMLProps<HTMLInputElement> {
    id: string;
    label: string;
    type: "multiple" | "text-area" | "add-file" | HTMLInputTypeAttribute;
    supportedFileTypes?: string[];
    supportedMimeTypes?: string[];
    maxFileSize?: number;
    singleOption?: boolean;
    options?: { name: string; value: string }[];
}

const AppFormDesktopSection: React.FC<AppFormDesktopSectionProps> = ({
    datas,
}) => {
    const inputFieldOnType = (field: Field) => {
        switch (field.type) {
            case "text-area":
                return (
                    <div key={field.label} className=" mb-6">
                        <CustomTextArea
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
            {datas.map(section => {
                return (
                    <section key={section.name}>
                        <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-8">
                            <h2 className="text-xl">{section.name}</h2>
                            <div className="flex gap-1 items-center text-neutral-500 text-sm">
                                <TrashIcon className="w-4 h-4" />
                                Clear
                            </div>
                        </div>
                        {section.fields.map((field: Field) => {
                            if (field.label.toLowerCase() === "name") {
                                return (
                                    <div
                                        key={field.id}
                                        className="grid gap-6 md:grid-cols-2"
                                    >
                                        {inputFieldOnType(field)}
                                        {inputFieldOnType(field)}
                                    </div>
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

export default AppFormDesktopSection;
