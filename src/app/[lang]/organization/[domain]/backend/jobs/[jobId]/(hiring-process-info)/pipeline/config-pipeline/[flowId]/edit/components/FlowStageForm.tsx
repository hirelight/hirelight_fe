"use client";

import React, { FormEvent, useState } from "react";
import { useParams } from "next/navigation";

import { Button, CustomInput, Selection } from "@/components";
import {
    AssessmentTypeKey,
    AssessmentTypes,
} from "@/interfaces/assessment.interface";
import { IAssessmentFlow } from "@/services/assessment-flows/assessment-flows.interface";
import { useI18NextTranslation } from "@/utils/i18n/client";
import { I18Locale } from "@/interfaces/i18.interface";

const defaultStage: AssessmentTypeKey[] = [
    "SOURCED_ASSESSMENT",
    "HIRED_ASSESSMENT",
];

const initialData: IAssessmentFlow = {
    name: "",
    assessmentType: "CV_SCREENING_ASSESSMENT",
};

type FlowStageFormProps = {
    onSave: (newStage: IAssessmentFlow) => void;
    onCancel: () => void;
    data?: IAssessmentFlow;
};

const FlowStageForm: React.FC<FlowStageFormProps> = ({
    onSave,
    onCancel,
    data = initialData,
}) => {
    const { lang } = useParams();
    const { t } = useI18NextTranslation(lang as I18Locale, "flow");

    const [formState, setFormState] = useState<IAssessmentFlow>(data);

    const handleCreateStage = (e: FormEvent) => {
        e.preventDefault();
        onSave(formState);
    };

    return (
        <form
            onSubmit={handleCreateStage}
            className="border border-gray-300 bg-slate-100 rounded-md"
        >
            <h4 className="p-4 border-b border-gray-300">
                {formState.name ? formState.name : t("add_a_stage_name")}
            </h4>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <CustomInput
                    title={t("assessment_name")}
                    value={formState.name}
                    onChange={e =>
                        setFormState(prev => ({
                            ...prev,
                            name: e.target.value,
                        }))
                    }
                    required
                />
                <Selection
                    title={t("assessment_type")}
                    items={Object.keys(AssessmentTypes)
                        .filter(
                            key =>
                                !defaultStage.includes(key as AssessmentTypeKey)
                        )
                        .map(key => ({
                            value: key,
                            label: AssessmentTypes[key as AssessmentTypeKey],
                        }))}
                    value={data ? AssessmentTypes[data.assessmentType] : ""}
                    onChange={value =>
                        setFormState(prev => ({
                            ...prev,
                            assessmentType: value as AssessmentTypeKey,
                        }))
                    }
                    required
                />
            </div>
            <div className="p-4 border-t border-gray-300">
                <Button type="submit">{t("common:done")}</Button>
                <button
                    type="button"
                    className="font-semibold text-neutral-500 hover:underline hover:text-neutral-700 ml-4"
                    onClick={onCancel}
                >
                    {t("common:cancel")}
                </button>
            </div>
        </form>
    );
};

export default FlowStageForm;
