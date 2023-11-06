"use client";

import React, { FormEvent, useEffect, useRef, useState } from "react";
import { m } from "framer-motion";

import { Button, CustomInput, Selection } from "@/components";
import { IAppFormTemplateProfileSection } from "@/interfaces/app-form-template.interface";
import { useAppDispatch, useAppSelector } from "@/redux/reduxHooks";
import { addProfileSection } from "@/redux/slices/app-form-template.slice";

import { useAppFormTemplate } from "../..";

type AddProfleSectionProps = {
    onAdd: (newSection: IAppFormTemplateProfileSection) => void;
    onCancel: () => void;
    data?: any;
};

const AddProfleSection: React.FC<AddProfleSectionProps> = ({
    onAdd,
    onCancel,
    data,
}) => {
    const { appFormTemplate } = useAppFormTemplate();
    const sectionLabels = appFormTemplate.content.profile.map(
        section => section.label
    );

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState<IAppFormTemplateProfileSection>({
        custom: true,
        id: "",
        label: "",
        fields: [],
    });

    const handleAddProfleSection = (e: FormEvent) => {
        e.preventDefault();
        if (sectionLabels.includes(formState.label))
            return alert("Section title already existed!");

        onAdd(formState);
    };

    useEffect(() => {
        if (wrapperRef) wrapperRef.current?.scrollIntoView();
    }, []);

    return (
        <m.div
            ref={wrapperRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
        >
            <div className="py-4 mx-4">
                <form
                    onSubmit={handleAddProfleSection}
                    className="p-6 border border-gray-300 rounded"
                >
                    <div className="grid grid-cols-2 gap-2 mb-4">
                        <CustomInput
                            title="Section title"
                            placeholder="Hello World"
                            value={formState.label}
                            onChange={e =>
                                setFormState({
                                    ...formState,
                                    label: e.target.value,
                                    id: e.target.value
                                        .toLowerCase()
                                        .replace(" ", "_"),
                                })
                            }
                            required
                        />
                    </div>

                    <hr className="col-span-2 h-[1px] border-t border-gray-300 my-4" />
                    <div>
                        <Button type="submit" className="mr-4">
                            Add custom fields
                        </Button>
                        <button
                            type="button"
                            className="text-neutral-500 font-semibold text-sm hover:text-neutral-600 hover:underline"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </m.div>
    );
};

export default AddProfleSection;
