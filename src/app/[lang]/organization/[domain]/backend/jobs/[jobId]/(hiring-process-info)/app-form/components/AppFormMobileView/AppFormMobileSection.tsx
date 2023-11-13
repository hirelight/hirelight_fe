import { TrashIcon } from "@heroicons/react/24/solid";
import React from "react";

import {
    CustomFileInput,
    CustomInput,
    CustomTextArea,
    DatePicker,
    Selection,
} from "@/components";
import { useAppSelector } from "@/redux/reduxHooks";
import { IAppFormField, IAppFormSection, ICustomField } from "@/interfaces";
import LoadingIndicator from "@/components/LoadingIndicator";

type AppFormMobileSectionProps = {};

const AppFormMobileSection: React.FC<AppFormMobileSectionProps> = ({}) => {
    const appForms = useAppSelector(state => state.job.data.applicationForm);

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
            case "paragraph":
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
                            title={field.label}
                            type={field.type}
                            required={field.required}
                        />
                    </div>
                );
        }
    };

    if (appForms.length === 0)
        return (
            <div className="px-4 pt-12 flex justify-center">
                <LoadingIndicator />
            </div>
        );

    return (
        <div className="px-4">
            <h4 className="text-sm text-neutral-700 py-8">
                <span className="text-red-500 mr-1">*</span>
                Required fields
            </h4>
            {appForms.map(section => {
                return (
                    <section key={section.name}>
                        <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
                            <h2 className="text-xl">{section.name}</h2>
                            <div className="flex gap-1 items-center text-neutral-500 text-sm">
                                <TrashIcon className="w-4 h-4" />
                                Clear
                            </div>
                        </div>
                        {section.fields
                            .filter(field => field.required !== undefined)
                            .map((field, index) => {
                                if (field.label === "Name")
                                    return (
                                        <React.Fragment key={field.label}>
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
                                        </React.Fragment>
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

export default AppFormMobileSection;

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
            <DatePicker id={field.id} onChange={() => {}} />
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
                role="radiogroup"
                data-ui={field.id}
                className="space-y-2"
            >
                {field.choices_attributes.map(choice => (
                    <div key={choice.id} className="flex items-center">
                        <input
                            id={choice.id}
                            type={field.single_answer ? "radio" : "checkbox"}
                            value={choice.name}
                            name={field.single_answer ? field.id : undefined}
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
            <fieldset role="radiogroup" data-ui={field.id} className="flex">
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
