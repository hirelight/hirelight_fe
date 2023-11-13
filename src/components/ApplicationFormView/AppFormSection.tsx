import React, { FormEvent, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";

import {
    CustomFileInput,
    CustomInput,
    CustomTextArea,
    DatePicker,
    Selection,
} from "@/components";
import { IAppFormField, IAppFormSection, ICustomField } from "@/interfaces";
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
                    <div key={field.label} className=" mb-6">
                        <CustomTextArea
                            id={field.id}
                            key={field.label}
                            title={field.label}
                            type={field.type}
                            required={field.required}
                        />
                    </div>
                );
            case "paragraph":
                return (
                    <div key={field.label} className=" mb-6">
                        <CustomTextArea
                            id={field.id}
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
                            id={field.id}
                            title={field.label}
                            type={field.type}
                            required={field.required}
                        />
                    </div>
                );
            case "boolean":
                return (
                    <div key={field.label} className=" mb-6">
                        <YesNoInput field={field as ICustomField} />
                    </div>
                );
            case "multiple_choice":
                return (
                    <div key={field.id} className="mb-6">
                        <MultipleChoiceInpuit field={field as ICustomField} />
                    </div>
                );
            case "date":
                return (
                    <div key={field.id} className="mb-6">
                        <DateInput field={field as ICustomField} />
                    </div>
                );
            case "dropdown":
                return (
                    <div key={field.id} className="mb-6">
                        <SelectionInput field={field as ICustomField} />
                    </div>
                );
            default:
                return (
                    <div key={field.label} className=" mb-6">
                        <CustomInput
                            key={field.label}
                            id={field.id}
                            title={field.label}
                            type={field.type}
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

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            // console.log(
            //     element.id,
            //     element.value,
            //     formData.get(element.id),
            //     formData.getAll(element.id)
            // );
            if (fieldMap.has(element.id)) {
                const type = fieldMap.get(element.id)!!.type;

                switch (type) {
                    case "file":
                        fieldMap.get(element.id)!!.value = {
                            value: element.value,
                            name: elements[element.id + "_fileName"].value,
                        };
                        break;
                    case "boolean":
                        fieldMap.get(element.id)!!.value = formData.get(
                            element.id
                        );
                        break;
                    case "multiple_choice":
                        const single = (
                            fieldMap.get(element.id)!! as ICustomField
                        ).single_answer;
                        if (single)
                            fieldMap.get(element.id)!!.value = formData.get(
                                element.id
                            );
                        else
                            fieldMap.get(element.id)!!.value = formData.getAll(
                                element.id
                            );
                        break;
                    default:
                        fieldMap.get(element.id)!!.value = element.value;
                }
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
        if ((e.currentTarget as HTMLFormElement).reset)
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

const DateInput = ({ field }: { field: ICustomField }) => {
    return (
        <>
            <label
                htmlFor={field.id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {field.required && <span className="text-red-500 mr-1">*</span>}
                {field.label}
            </label>
            <DatePicker id={field.id} name={field.id} onChange={() => {}} />
        </>
    );
};

const SelectionInput = ({ field }: { field: ICustomField }) => {
    return (
        <Selection
            title={field.label}
            id={field.id}
            items={field.choices_attributes.map(item => ({
                label: item.name,
                value: item.name,
            }))}
            placeholder="Selection an option..."
            onChange={() => {}}
        />
    );
};

const MultipleChoiceInpuit = ({ field }: { field: ICustomField }) => {
    return (
        <>
            <label
                htmlFor={field.id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {field.required && <span className="text-red-500 mr-1">*</span>}
                {field.label}
            </label>
            <fieldset
                role={field.single_answer ? "radiogroup" : "group"}
                data-ui={field.id}
                id={field.id}
                className="space-y-2"
            >
                {field.choices_attributes.map(choice => (
                    <div key={choice.id} className="flex items-center">
                        <input
                            id={choice.id}
                            type={field.single_answer ? "radio" : "checkbox"}
                            value={choice.name}
                            name={field.id}
                            tabIndex={-1}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor={choice.id}
                            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                            {choice.name}
                        </label>
                    </div>
                ))}
            </fieldset>
        </>
    );
};

const YesNoInput = ({ field }: { field: ICustomField }) => {
    return (
        <>
            <label
                htmlFor={field.id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {field.required && <span className="text-red-500 mr-1">*</span>}
                {field.label}
            </label>
            <fieldset
                role="radiogroup"
                id={field.id}
                data-ui={field.id}
                className="flex"
            >
                <div className="flex items-center px-4 border border-gray-300 dark:border-gray-700 rounded-tl rounded-bl">
                    <input
                        id={`${field.id}-yes`}
                        type="radio"
                        value="true"
                        tabIndex={-1}
                        name={field.id}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor={`${field.id}-yes`}
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        Yes
                    </label>
                </div>
                <div className="flex items-center px-4 border border-gray-300 dark:border-gray-700 rounded-tr rounded-br">
                    <input
                        id={`${field.id}-no`}
                        type="radio"
                        value="false"
                        tabIndex={-1}
                        name={field.id}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                        htmlFor={`${field.id}-no`}
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        No
                    </label>
                </div>
            </fieldset>
        </>
    );
};
