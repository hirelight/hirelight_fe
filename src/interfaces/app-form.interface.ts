import {
    DetailedHTMLProps,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
} from "react";

export enum EAppFormOption {
    MANDATORY = "Mandatory",
    OPTIONAL = "Optional",
    OFF = "Off",
}

export interface IAppFormField
    extends DetailedHTMLProps<
        InputHTMLAttributes<HTMLInputElement>,
        HTMLInputElement
    > {
    id: string;
    label: string;
    helper?: string;
    fields?: {
        id?: string;
        label: string;
        required: boolean;
        maxLength?: number;
        max?: number;
        type: HTMLInputTypeAttribute;
    }[];
    type:
        | "multiple_choice"
        | "dropdown"
        | "boolean"
        | "group"
        | "multiple"
        | "text-area"
        | "paragraph"
        | HTMLInputTypeAttribute;
    supportedFileTypes?: string[];
    supportedMimeTypes?: string[];
    maxFileSize?: number;
    singleOption?: boolean;
    options?: { name: string; value: string }[];
    value?: any | string | number;
    custom: boolean;
}

export interface IAppFormSection {
    id: string;
    custom?: boolean;
    name: string;
    fields: IAppFormField[];
}

export interface ISetAppFormField {
    sectionName: string;
    field: IAppFormField;
}

export interface IAddAppFormField {
    sectionName: string;
    field: any;
}

export interface IEditAppFormField {
    sectionId: string;
    field: IAppFormField;
}

export interface IDelteCustomField {
    sectionName: string;
    fieldId: string;
}

export enum AppFormDefaultSection {
    PERSONAL_INFORMATION = "personal_information",
    PROFILE = "profile",
    DETAILS = "details",
}

export const AppFormInputTypes: {
    label: string;
    type:
        | "multiple_choice"
        | "dropdown"
        | "boolean"
        | "group"
        | "multiple"
        | "text-area"
        | HTMLInputTypeAttribute;
}[] = [
    {
        label: "Paragraph",
        type: "text-area",
    },
    {
        label: "Short answer",
        type: "text",
    },
    {
        label: "Yes/No",
        type: "boolean",
    },
    {
        label: "Dropdown",
        type: "dropdown",
    },
    {
        label: "Multiple choice",
        type: "multiple_choice",
    },
    {
        label: "Date",
        type: "date",
    },
    {
        label: "Number",
        type: "number",
    },
    {
        label: "File upload",
        type: "file",
    },
];

export interface ICustomField extends IAppFormField {
    enabled: boolean;
    rejecting: boolean;
    answers_count: number | null;
    position: number;
    single_answer: boolean;
    choices_attributes: {
        id: string;
        name: string;
        position: number;
        enabled: boolean;
    }[];
}
