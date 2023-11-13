import { IAppFormField, IAppFormSection } from ".";

export interface IAppFormTemplateProfileSection {
    custom: boolean;
    id: string;
    label: string;
    fields: IAppFormTemplateField[];
    hidden?: boolean;
}

export interface IAppFormTemplateSection {
    id?: string;
    custom: boolean;
    name: string;
    fields: (IAppFormField & { custom: boolean })[];
}

export interface IAppFormTemplate {
    profile: IAppFormTemplateProfileSection[];
    app_form: IAppFormTemplateSection[];
}
export interface IAppFormTemplateField extends IAppFormField {
    appFormSectionId?: string;
}

export interface IAddNewField {
    profileSectionId: string;
    appFormSectionId: string;
    newField: IAppFormTemplateField;
}

export interface IDeleteField {
    profileSectionId: string;
    appFormSectionId: string;
    fieldId: string;
}

export interface IEditField {
    profileSectionId: string;
    appFormSectionId: string;
    updatedField: IAppFormTemplateField;
}
