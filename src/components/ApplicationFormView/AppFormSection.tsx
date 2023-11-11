import React, { FormEvent, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import { CustomFileInput, CustomInput, CustomTextArea } from "@/components";
import { IAppFormField, IAppFormSection } from "@/interfaces";
import interceptor from "@/services/interceptor";

type AppFormSectionProps = {
    jobPostId: number;
    datas: IAppFormSection[];
    onApply?: () => void;
};

const AppFormSection: React.FC<AppFormSectionProps> = ({
    jobPostId,
    datas,
    onApply,
}) => {
    const inputFieldOnType = (field: IAppFormField) => {
        switch (field.type) {
            case "text-area":
                return (
                    <div key={field.id} className="mb-6">
                        <CustomTextArea
                            id={field.id}
                            title={field.label}
                            name={field.id}
                            type={field.type}
                            required={field.required}
                        />
                    </div>
                );
            case "file":
                return (
                    <div key={field.id} className=" mb-6">
                        <CustomFileInput
                            {...field}
                            title={field.label}
                            type={"file"}
                            name={field.id}
                            required={field.required}
                        />
                    </div>
                );
            default:
                return (
                    <div key={field.id} className=" mb-6">
                        <CustomInput
                            {...field}
                            title={field.label}
                            type={field.type}
                            name={field.id}
                            required={field.required}
                        />
                    </div>
                );
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const elements: any = e.currentTarget;
        const fieldMap = new Map<string, IAppFormField>();
        datas
            .map(item => item.fields)
            .flat(1)
            .forEach(field => {
                if (!fieldMap.has(field.id)) fieldMap.set(field.id, field);
            });

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            // console.log(element.id, element.value);
            if (fieldMap.has(element.id)) {
                fieldMap.get(element.id)!!.value = element.value;
            }
        }

        // for (const [key, value] of Array.from(fieldMap.entries())) {
        //     console.log(`Key: ${key}, Value:`, value);
        // }

        const name = fieldMap.get("name")!!.value!! as string;
        try {
            const dto = {
                firstName: name.split(" ")[0],
                lastName: name.split(" ").slice(1).join(" "),
                jobPostId: jobPostId,
                content: JSON.stringify(
                    datas.map(sec => ({
                        ...sec,
                        fields: sec.fields.map(f => ({
                            ...f,
                            value: fieldMap.get(f.id)?.value,
                        })),
                    }))
                ),
            };
            // console.log(dto);
            // console.log(JSON.parse(dto.content));
            const res = await interceptor.post("/applicant-profiles", dto);
            toast.success(res.data.message);
        } catch (error) {
            console.error(error);
        }
        (e.currentTarget as HTMLFormElement).reset();
        if (onApply) onApply();
    };

    return (
        <form onSubmit={handleSubmit}>
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
                        {section.fields.map(field => inputFieldOnType(field))}
                    </section>
                );
            })}

            <div className="flex gap-6 mb-6">
                <button
                    id="apply-form-reset"
                    type="reset"
                    className="px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    Reset
                </button>

                <button
                    type="submit"
                    className="w-full text-white bg-blue_primary_700 hover:bg-blue_primary_800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue_primary_600 dark:hover:bg-blue_primary_700 focus:outline-none dark:focus:ring-blue_prbg-blue_primary_800"
                >
                    Submit application
                </button>
            </div>
        </form>
    );
};

export default AppFormSection;
