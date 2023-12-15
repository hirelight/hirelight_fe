"use client";

import React, { useState } from "react";
import moment from "moment";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { produce } from "immer";
import { useParams } from "next/navigation";

import { Plus } from "@/icons";
import { IAppFormField } from "@/interfaces";

import { Button, CustomInput, CustomTextArea, DatePicker } from "..";

type ExperienceSectionProps = {
    data: IAppFormField;
    datas?: ExperienceType[];
};

const ExperienceSection: React.FC<ExperienceSectionProps> = ({
    data,
    datas = [],
}) => {
    const [showForm, setShowForm] = useState(false);
    const [experiences, setExperiences] = useState<ExperienceType[]>(datas);

    const onSave = (newData: ExperienceType) => {
        setExperiences(experiences.concat([newData]));
        setShowForm(false);
    };

    const onDelete = (pos: number) => {
        setExperiences(prev => prev.filter((_, index) => index !== pos));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium text-sm">
                    Experience
                    <span className="text-gray-400 font-normal ml-2">
                        (Optional)
                    </span>
                </span>
                <button
                    type="button"
                    className="bg-white text-blue_primary_800 border-2 border-blue_primary_600 hover:text-white hover:border-blue_primary_800 hover:bg-blue_primary_800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-3 py-2 text-center inline-flex items-center disabled:opacity-80 disabled:cursor-not-allowed"
                    disabled={showForm}
                    onClick={() => setShowForm(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add
                </button>
            </div>

            {showForm && (
                <FormInput onSave={onSave} close={() => setShowForm(false)} />
            )}

            <ul className="space-y-2">
                {experiences.map((education, index) => (
                    <ExperienceCard
                        key={index}
                        data={education}
                        onDelete={() => onDelete(index)}
                        onEdit={(updateData: ExperienceType) => {
                            setExperiences(prev =>
                                produce(prev, draft => {
                                    draft[index] = updateData;
                                })
                            );
                        }}
                    />
                ))}
            </ul>

            <textarea
                id={data.id}
                name={data.id}
                value={JSON.stringify(experiences)}
                readOnly
                className="sr-only"
            />
        </div>
    );
};

export default ExperienceSection;

export type ExperienceType = {
    title: string;
    company?: string;
    industry?: string;
    summary?: string;
    startDate?: Date | string;
    endDate?: Date | string;
    currentlyWork?: boolean;
};

const FormInput = ({
    data = { title: "" },
    onSave,
    close,
}: {
    data?: ExperienceType;
    onSave: (newData: ExperienceType) => void;
    close: () => void;
}) => {
    const [formErr, setFormErr] = useState({
        title: "",
        startDate: "",
        endDate: "",
    });
    const [formState, setFormState] = useState<ExperienceType>(data);

    const handleFormChange = (key: string, value: any) => {
        setFormState({
            ...formState,
            [key]: value,
        });
        setFormErr({
            ...formErr,
            [key]: "",
        });
    };

    const handleAddEducation = () => {
        if (!formState.title)
            return setFormErr({ ...formErr, title: "Field is required!" });
        if (moment(formState.endDate).isBefore(formState.startDate, "date"))
            return setFormErr({
                ...formErr,
                startDate: "Start date must lower than end date!",
            });
        onSave({
            ...formState,
            startDate: formState.startDate
                ? moment.parseZone(formState.startDate).utc().format()
                : formState.startDate,
            endDate: formState.endDate
                ? moment.parseZone(formState.endDate).utc().format()
                : formState.endDate,
        });
    };

    return (
        <div className="bg-slate-200 rounded-md">
            <div className="px-6 py-4 space-y-4">
                <CustomInput
                    title="Title"
                    value={formState.title}
                    onChange={e => handleFormChange("title", e.target.value)}
                    required
                    errorText={formErr.title}
                />
                <CustomInput
                    title="Company"
                    value={formState.company}
                    onChange={e => handleFormChange("company", e.target.value)}
                />
                <CustomInput
                    title="Industry"
                    value={formState.industry}
                    onChange={e => handleFormChange("industry", e.target.value)}
                />

                <CustomTextArea
                    title="Summary"
                    value={formState.summary}
                    onChange={e => handleFormChange("summary", e.target.value)}
                    rows={5}
                />
                <div className="grid grid-cols-2 gap-4">
                    <DatePicker
                        title="Start date"
                        value={formState.startDate}
                        onChange={date => handleFormChange("startDate", date)}
                        errorText={formErr.startDate}
                    />

                    <DatePicker
                        title="End date"
                        value={formState.endDate}
                        onChange={date => handleFormChange("endDate", date)}
                        maxDate={new Date()}
                        disabled={formState.currentlyWork}
                    />
                </div>

                <div className="flex items-center mb-4">
                    <input
                        id="currently-work"
                        type="checkbox"
                        defaultChecked={formState.currentlyWork}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        onClick={e =>
                            handleFormChange(
                                "currentlyWork",
                                e.currentTarget.checked
                            )
                        }
                    />
                    <label
                        htmlFor="currently-work"
                        className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer"
                    >
                        I currently work here
                    </label>
                </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-400">
                <Button onClick={handleAddEducation}>Save</Button>
                <button
                    type="button"
                    className="text-gray-500 text-sm font-semibold ml-2 hover:underline hover:text-gray-600"
                    onClick={close}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
};

const ExperienceCard = ({
    data,
    onDelete,
    onEdit,
}: {
    data: ExperienceType;
    onDelete: () => void;
    onEdit: (updateData: ExperienceType) => void;
}) => {
    const { title, company, industry, summary, endDate, startDate } = data;
    const [showEdit, setShowEdit] = useState(false);
    const { lang } = useParams();

    if (showEdit)
        return (
            <li>
                <FormInput
                    data={data}
                    onSave={updateData => {
                        onEdit(updateData);
                        setShowEdit(false);
                    }}
                    close={() => setShowEdit(false)}
                />
            </li>
        );

    return (
        <li className="px-6 py-4 bg-gray-200/70">
            <div className="pr-24 relative text-sm space-y-2" data-ui="group">
                <dl className="flex">
                    <dt className="text-neutral-700 font-semibold basis-36 flex-shrink-0 text-right">
                        Title
                    </dt>
                    <dd className="ml-12">{title}</dd>
                </dl>
                {company && (
                    <dl className="flex">
                        <dt className="text-neutral-700 font-semibold basis-36 flex-shrink-0 text-right">
                            Company
                        </dt>
                        <dd className="ml-12">{company}</dd>
                    </dl>
                )}
                {industry && (
                    <dl className="flex">
                        <dt className="text-neutral-700 font-semibold basis-36 flex-shrink-0 text-right">
                            Industry
                        </dt>
                        <dd className="ml-12">{industry}</dd>
                    </dl>
                )}
                {summary && (
                    <dl className="flex">
                        <dt className="text-neutral-700 font-semibold basis-36 flex-shrink-0 text-right">
                            Summary
                        </dt>
                        <dd className="ml-12 italic">{summary}</dd>
                    </dl>
                )}
                {(startDate || endDate) && (
                    <dl className="flex">
                        <dt className="text-neutral-700 font-semibold basis-36 flex-shrink-0 text-right">
                            Period
                        </dt>
                        <dd className="ml-12">
                            {moment(startDate).locale(lang).format("LL  -  ") ??
                                ""}
                            {moment(endDate).locale(lang).format("LL") ?? ""}
                        </dd>
                    </dl>
                )}

                <div className="absolute top-0 right-0 flex gap-4">
                    <button
                        type="button"
                        className="text-neutral-500 hover:text-neutral-700"
                        onClick={() => setShowEdit(true)}
                    >
                        <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                        type="button"
                        className="text-neutral-500 hover:text-neutral-700"
                        onClick={onDelete}
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </li>
    );
};
