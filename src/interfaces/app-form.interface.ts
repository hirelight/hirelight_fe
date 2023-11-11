import { HTMLInputTypeAttribute } from "react";

export enum EAppFormOption {
    MANDATORY = "Mandatory",
    OPTIONAL = "Optional",
    OFF = "Off",
}

export interface IAppFormField extends React.HTMLProps<HTMLInputElement> {
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
        | "group"
        | "multiple"
        | "text-area"
        | "add-file"
        | HTMLInputTypeAttribute;
    supportedFileTypes?: string[];
    supportedMimeTypes?: string[];
    maxFileSize?: number;
    singleOption?: boolean;
    options?: { name: string; value: string }[];
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

export enum AppFormDefaultSection {
    PERSONAL_INFORMATION = "personal_information",
    PROFILE = "profile",
    DETAILS = "details",
}
