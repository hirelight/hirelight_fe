import { EAppFormOption, IAppFormFields } from '@/interfaces';
import { IAppFormState } from '@/redux/slices/app-form.slice';

export const personalInfoFields: IAppFormFields[] = [
  {
    label: 'Name',
    options: [EAppFormOption.MANDATORY],
    inputType: 'text',
  },
  {
    label: 'Email',
    options: [EAppFormOption.MANDATORY],
    inputType: 'text',
  },
  {
    label: 'Headline',
    options: [
      EAppFormOption.MANDATORY,
      EAppFormOption.OPTIONAL,
      EAppFormOption.OFF,
    ],
    inputType: 'text',
  },
  {
    label: 'Phone',
    options: [
      EAppFormOption.MANDATORY,
      EAppFormOption.OPTIONAL,
      EAppFormOption.OFF,
    ],
    inputType: 'tel',
  },
  {
    label: 'Address',
    options: [
      EAppFormOption.MANDATORY,
      EAppFormOption.OPTIONAL,
      EAppFormOption.OFF,
    ],
    inputType: 'text',
  },
  {
    label: 'Photo',
    options: [
      EAppFormOption.MANDATORY,
      EAppFormOption.OPTIONAL,
      EAppFormOption.OFF,
    ],
    inputType: 'file',
  },
];

export const profileFields: IAppFormFields[] = [
  {
    label: 'Education',
    options: [EAppFormOption.OPTIONAL, EAppFormOption.OFF],
    inputType: 'add-file',
  },
  {
    label: 'Experience',
    options: [EAppFormOption.OPTIONAL, EAppFormOption.OFF],
    inputType: 'add-file',
  },
  {
    label: 'Summary',
    options: [
      EAppFormOption.MANDATORY,
      EAppFormOption.OPTIONAL,
      EAppFormOption.OFF,
    ],
    inputType: 'text-area',
  },
  {
    label: 'Resume',
    options: [
      EAppFormOption.MANDATORY,
      EAppFormOption.OPTIONAL,
      EAppFormOption.OFF,
    ],
    inputType: 'file',
  },
];

export const detailsFields: IAppFormFields[] = [
  {
    label: 'Cover letter',
    options: [
      EAppFormOption.MANDATORY,
      EAppFormOption.OPTIONAL,
      EAppFormOption.OFF,
    ],
    inputType: 'text-area',
  },
];

export const appFormSections: IAppFormState = {
  datas: [
    {
      title: 'Personal information',
      fields: personalInfoFields.map((item) => ({
        label: item.label,
        selectedOption: item.options[Math.floor(item.options.length / 2)],
        inputType: item.inputType,
      })),
    },
    {
      title: 'Profile',
      fields: profileFields.map((item) => ({
        label: item.label,
        selectedOption: item.options[Math.floor(item.options.length / 2)],
        inputType: item.inputType,
      })),
    },
    {
      title: 'Details',
      fields: detailsFields.map((item) => ({
        label: item.label,
        selectedOption: item.options[Math.floor(item.options.length / 2)],
        inputType: item.inputType,
      })),
    },
  ],
};
