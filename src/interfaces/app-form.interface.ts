import { HTMLInputTypeAttribute } from 'react';

export interface ISetAppFormField {
  sectionTitle: string;
  label: string;
  option: EAppFormOption;
}

export enum EAppFormOption {
  MANDATORY = 'Mandatory',
  OPTIONAL = 'Optional',
  OFF = 'Off',
}

export interface IAppFormFields {
  label: string;
  options: EAppFormOption[];
  inputType: HTMLInputTypeAttribute;
}

export interface IAppFormField {
  label: string;
  selectedOption: EAppFormOption;
  inputType: 'text-area' | 'add-file' | HTMLInputTypeAttribute;
}
