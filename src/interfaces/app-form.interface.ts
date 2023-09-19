import { HTMLInputTypeAttribute } from "react";

export interface ISetAppFormField {
    sectionTitle: string;
    label: string;
    option: EAppFormOption;
}

export enum EAppFormOption {
    MANDATORY = "Mandatory",
    OPTIONAL = "Optional",
    OFF = "Off",
}

export interface IAppFormField {
    label: string;
    selectedOption: EAppFormOption;
    options: EAppFormOption[];
    inputType: "text-area" | "add-file" | HTMLInputTypeAttribute;
}
