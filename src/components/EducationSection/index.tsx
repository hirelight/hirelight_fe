"use client";

import React, { useState } from "react";
import moment from "moment";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { produce } from "immer";
import { useParams } from "next/navigation";

import { Plus } from "@/icons";
import { IAppFormField } from "@/interfaces";

import { Button, CustomInput, DatePicker } from "..";

type EducationSectionProps = {
    data: IAppFormField;
};

const EducationSection: React.FC<EducationSectionProps> = ({ data }) => {
    const [showForm, setShowForm] = useState(false);
    const [educations, setEducations] = useState<EducationFormState[]>([]);

    const onSave = (newData: EducationFormState) => {
        setEducations(educations.concat([newData]));
        setShowForm(false);
    };

    const onDelete = (pos: number) => {
        setEducations(prev => prev.filter((_, index) => index !== pos));
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <span className="text-gray-900 font-medium text-sm">
                    Education
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
                {educations.map((education, index) => (
                    <EducationCard
                        key={index}
                        data={education}
                        onDelete={() => onDelete(index)}
                        onEdit={(updateData: EducationFormState) => {
                            setEducations(prev =>
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
                value={JSON.stringify(educations)}
                readOnly
                className="sr-only"
            />
        </div>
    );
};

export default EducationSection;

export type EducationFormState = {
    school: string;
    fieldOfStudy?: string;
    degree?: string;
    startDate?: string | Date;
    endDate?: string | Date;
};

const FormInput = ({
    data = { school: "" },
    onSave,
    close,
}: {
    data?: EducationFormState;
    onSave: (newData: EducationFormState) => void;
    close: () => void;
}) => {
    const [formErr, setFormErr] = useState({
        school: "",
        startDate: "",
        endDate: "",
    });
    const [formState, setFormState] = useState<EducationFormState>(data);

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
        if (!formState.school)
            return setFormErr({ ...formErr, school: "Field is required!" });
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
                    title="School"
                    value={formState.school}
                    onChange={e => handleFormChange("school", e.target.value)}
                    required
                    errorText={formErr.school}
                />
                <CustomInput
                    title="Field of study"
                    value={formState.fieldOfStudy}
                    onChange={e =>
                        handleFormChange("fieldOfStudy", e.target.value)
                    }
                />
                <CustomInput
                    title="Degree"
                    value={formState.degree}
                    onChange={e => handleFormChange("degree", e.target.value)}
                />
                <div className="grid grid-cols-2 gap-4">
                    <DatePicker
                        title="Start date"
                        value={formState.startDate}
                        onChange={date => handleFormChange("startDate", date)}
                    />

                    <DatePicker
                        title="End date"
                        value={formState.endDate}
                        onChange={date => handleFormChange("endDate", date)}
                    />
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

const EducationCard = ({
    data,
    onDelete,
    onEdit,
}: {
    data: EducationFormState;
    onDelete: () => void;
    onEdit: (updateData: EducationFormState) => void;
}) => {
    const { school, degree, endDate, fieldOfStudy, startDate } = data;
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
                        School
                    </dt>
                    <dd className="ml-12">{school}</dd>
                </dl>
                {fieldOfStudy && (
                    <dl className="flex">
                        <dt className="text-neutral-700 font-semibold basis-36 flex-shrink-0 text-right">
                            Field of study
                        </dt>
                        <dd className="ml-12">{fieldOfStudy}</dd>
                    </dl>
                )}
                {degree && (
                    <dl className="flex">
                        <dt className="text-neutral-700 font-semibold basis-36 flex-shrink-0 text-right">
                            Degree
                        </dt>
                        <dd className="ml-12">{degree}</dd>
                    </dl>
                )}
                {(startDate || endDate) && (
                    <dl className="flex">
                        <dt className="text-neutral-700 font-semibold basis-36 flex-shrink-0 text-right">
                            Period
                        </dt>
                        <dd className="ml-12">
                            {moment
                                .utc(startDate)
                                .locale(lang)
                                .format("LL  -  ") ?? ""}
                            {moment.utc(endDate).locale(lang).format("LL") ??
                                ""}
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
