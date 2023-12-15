"use client";

import React, { FormEvent, Fragment, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useParams } from "next/navigation";

import {
    Button,
    CustomFileInput,
    CustomInput,
    CustomTextArea,
    DatePicker,
    EducationSection,
    ExperienceSection,
    Selection,
} from "@/components";
import { IAppFormField, ICustomField } from "@/interfaces";
import { ApplicationFormJSON, IApplyJobDto } from "@/services";
import { decryptData } from "@/helpers/authHelpers";
import { SpinLoading } from "@/icons";
import { handleError } from "@/helpers";
import applicantProfileServices from "@/services/applicant-profile/applicant-profile.service";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

type AppFormSectionProps = {
    jobPostId: string;
    data: ApplicationFormJSON;
    onApply?: () => void;
};

const AppFormSection: React.FC<AppFormSectionProps> = ({
    jobPostId,
    data,
    onApply,
}) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "app-form");
    const token = decryptData("hirelight_access_token");
    const [loading, setLoading] = useState(false);

    const inputFieldOnType = (field: IAppFormField) => {
        switch (field.type) {
            case "text-area":
                return (
                    <div className=" mb-6">
                        <CustomTextArea
                            id={field.id}
                            title={field.label}
                            type={field.type}
                            required={field.required}
                        />
                    </div>
                );
            case "paragraph":
                return (
                    <div className=" mb-6">
                        <CustomTextArea
                            id={field.id}
                            title={field.label}
                            type={field.type}
                            required={field.required}
                        />
                    </div>
                );
            case "file": {
                if (field.id === "avatar") return null;

                return (
                    <div className=" mb-6">
                        <CustomFileInput
                            id={field.id}
                            title={field.label}
                            type={field.type}
                            required={field.required}
                        />
                    </div>
                );
            }
            case "boolean":
                return (
                    <div className=" mb-6">
                        <YesNoInput field={field as ICustomField} />
                    </div>
                );
            case "multiple_choice":
                return (
                    <div className="mb-6">
                        <MultipleChoiceInpuit field={field as ICustomField} />
                    </div>
                );
            case "date":
                return (
                    <div className="mb-6">
                        <DateInput field={field as ICustomField} />
                    </div>
                );
            case "dropdown":
                return (
                    <div className="mb-6">
                        <SelectionInput field={field as ICustomField} />
                    </div>
                );
            default: {
                return (
                    <div className=" mb-6">
                        <CustomInput
                            id={field.id}
                            title={field.label}
                            type={field.type}
                            required={field.required}
                            readOnly={field.id === "email" ? true : false}
                            value={
                                field.id === "email"
                                    ? token
                                        ? (jwtDecode(token) as any).emailAddress
                                        : ""
                                    : undefined
                            }
                        />
                    </div>
                );
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const elements: any = e.currentTarget;
        const fieldMap = new Map<string, IAppFormField>();
        data.form_structure
            .map(item => item.fields)
            .flat(1)
            .concat(data.questions)
            .forEach(field => {
                if (!fieldMap.has(field.id)) fieldMap.set(field.id, field);
            });

        const formData = new FormData(e.currentTarget as HTMLFormElement);

        for (let i = 0; i < elements.length; i++) {
            const element = elements[i];

            // console.log(element.id, element, element.innerText);

            const isExist = fieldMap.get(element.id);

            if (isExist) {
                const type = isExist.type;
                switch (type) {
                    case "file":
                        isExist.value = {
                            value: element.value,
                            name: elements[element.id + "_fileName"].value,
                        };
                        break;
                    case "boolean":
                        isExist.value = formData.getAll(element.id);
                        break;
                    case "multiple_choice":
                        const single = (isExist as ICustomField).single_answer;
                        if (single) isExist.value = formData.get(element.id);
                        else isExist.value = formData.getAll(element.id);
                        break;
                    case "group":
                        if (element.value)
                            isExist.value = JSON.parse(element.value);
                        break;
                    default:
                        isExist.value = element.value;
                }

                fieldMap.set(element.id, isExist);
            }
        }

        const nameField = fieldMap.get("name");
        setLoading(true);
        try {
            const dto: IApplyJobDto = {
                firstName: nameField ? nameField.value.split(" ")[0] : "",
                lastName: nameField
                    ? nameField.value.split(" ").slice(1).join(" ")
                    : "",
                jobPostId: jobPostId,
                content: JSON.stringify({
                    form_structure: data.form_structure.map(sec => ({
                        ...sec,
                        fields: sec.fields.map(f => ({
                            ...f,
                            value: fieldMap.get(f.id)?.value,
                        })),
                    })),
                    questions: data.questions.map(f => ({
                        ...f,
                        value: fieldMap.get(f.id)?.value,
                    })),
                } as ApplicationFormJSON),
            };

            const res = await applicantProfileServices.applyJob(dto);
            toast.success(res.message);
            const formEl = document.getElementById(
                "apply-job-form"
            ) as HTMLFormElement;
            if (formEl) formEl.reset();
            if (onApply) onApply();
        } catch (error: any) {
            handleError(error);
        }
        setLoading(false);
    };

    return (
        <form id="apply-job-form" onSubmit={handleSubmit}>
            <h4 className="text-sm text-neutral-700 py-4 md:py-8">
                <span className="text-red-500 mr-1">*</span>
                {t("required_fields")}
            </h4>
            <div className="space-y-8">
                {data.form_structure.map(section => {
                    return (
                        <section key={section.id}>
                            <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-8">
                                <h2 className="text-xl">{section.name}</h2>
                                <div className="flex gap-1 items-center text-neutral-500 text-sm">
                                    <TrashIcon className="w-4 h-4" />
                                    {t("common:clear")}
                                </div>
                            </div>
                            <div className="space-y-6">
                                {section.fields.map(field => {
                                    if (field.id === "education")
                                        return (
                                            <Fragment key={field.id}>
                                                <EducationSection
                                                    data={field}
                                                />
                                            </Fragment>
                                        );
                                    else if (field.id === "experience")
                                        return (
                                            <Fragment key={field.id}>
                                                <ExperienceSection
                                                    data={field}
                                                />
                                            </Fragment>
                                        );
                                    return (
                                        <Fragment key={field.id}>
                                            {inputFieldOnType(field)}
                                        </Fragment>
                                    );
                                })}
                            </div>
                        </section>
                    );
                })}
            </div>
            {data.questions.map(field => inputFieldOnType(field))}

            <div className="flex justify-end gap-6 mb-6">
                <button
                    id="apply-form-reset"
                    type="reset"
                    className="px-5 py-2.5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                    {t("common:reset")}
                </button>

                <Button type="submit" disabled={loading} isLoading={loading}>
                    {t("submit_application")}
                </Button>
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
            <DatePicker
                id={field.id}
                name={field.id}
                required={field.required}
                onChange={() => {}}
            />
        </>
    );
};

const SelectionInput = ({ field }: { field: ICustomField }) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "common");
    return (
        <Selection
            title={field.label}
            id={field.id}
            name={field.id}
            items={field.choices_attributes.map(item => ({
                label: item.name,
                value: item.name,
            }))}
            placeholder={t("select_an_option")}
            onChange={() => {}}
            required={field.required}
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
                            required={
                                field.single_answer ? field.required : undefined
                            }
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
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "common");

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
                        required={field.required}
                    />
                    <label
                        htmlFor={`${field.id}-yes`}
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        {t("yes")}
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
                        required={field.required}
                    />
                    <label
                        htmlFor={`${field.id}-no`}
                        className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                        {t("no")}
                    </label>
                </div>
            </fieldset>
        </>
    );
};
