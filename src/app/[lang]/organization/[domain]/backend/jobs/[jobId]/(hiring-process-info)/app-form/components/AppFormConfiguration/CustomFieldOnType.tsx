import React, { useState } from "react";
import {
    Bars3BottomLeftIcon,
    Bars3CenterLeftIcon,
    ListBulletIcon,
    PencilIcon,
} from "@heroicons/react/24/solid";
import {
    CalculatorIcon,
    CalendarDaysIcon,
    DocumentArrowUpIcon,
    ClipboardDocumentCheckIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

import { ICustomField } from "@/interfaces";
import { CheckToSlot } from "@/icons";
import { Portal } from "@/components";
import { useAppDispatch } from "@/redux/reduxHooks";
import { deleteCustomField } from "@/redux/slices/job.slice";

import AddQuestionModal from "./AddQuestionModal";

type CustomFieldOnTypeProps = {
    field: ICustomField;
};

const CustomFieldOnType: React.FC<CustomFieldOnTypeProps> = ({ field }) => {
    const [showEdit, setShowEdit] = useState(false);
    const dispatch = useAppDispatch();

    const getIconOnType = (type: typeof field.type) => {
        switch (type) {
            case "boolean":
                return <CheckToSlot />;
            case "text-area":
                return <Bars3BottomLeftIcon />;
            case "text":
                return <Bars3CenterLeftIcon />;
            case "dropdown":
                return <ListBulletIcon />;
            case "multiple_choice":
                return <ClipboardDocumentCheckIcon />;
            case "file":
                return <DocumentArrowUpIcon />;
            case "date":
                return <CalendarDaysIcon />;
            default:
                return <CalculatorIcon />;
        }
    };

    return (
        <div className={`py-6`}>
            <Portal>
                {showEdit && (
                    <AddQuestionModal
                        data={field}
                        closeModal={() => setShowEdit(false)}
                    />
                )}
            </Portal>
            <div className="flex gap-2 items-center">
                <div className="text-neutral-700 w-6 h-6">
                    {getIconOnType(field.type)}
                </div>
                <span className="flex-1">{field.label}</span>
                <button
                    type="button"
                    className="w-5 h-5 text-red-500 mr-2"
                    onClick={() =>
                        dispatch(
                            deleteCustomField({
                                sectionName: "Details",
                                fieldId: field.id,
                            })
                        )
                    }
                >
                    <TrashIcon />
                </button>
                <button
                    type="button"
                    className="w-5 h-5"
                    onClick={() => setShowEdit(true)}
                >
                    <PencilIcon />
                </button>
            </div>

            {(field.type === "dropdown" ||
                field.type === "multiple_choice") && (
                <ul className="list-disc ml-12 mt-2">
                    {field.choices_attributes.map(choice => (
                        <li key={choice.id}>{choice.name}</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomFieldOnType;
