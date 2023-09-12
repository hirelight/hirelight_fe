import React from 'react';
import AppFormSection from './AppFormSection';

const personalInfoFields = [
  {
    label: 'Name',
    options: ['Mandatory'],
  },
  {
    label: 'Email',
    options: ['Mandatory'],
  },
  {
    label: 'Headline',
    options: ['Mandatory', 'Optional', 'Off'],
  },
  {
    label: 'Phone',
    options: ['Mandatory', 'Optional', 'Off'],
  },
  {
    label: 'Address',
    options: ['Mandatory', 'Optional', 'Off'],
  },
  {
    label: 'Photo',
    options: ['Mandatory', 'Optional', 'Off'],
  },
];

const profileFields = [
  {
    label: 'Education',
    options: ['Optional', 'Off'],
  },
  {
    label: 'Experience',
    options: ['Optional', 'Off'],
  },
  {
    label: 'Summary',
    options: ['Mandatory', 'Optional', 'Off'],
  },
  {
    label: 'Resume',
    options: ['Mandatory', 'Optional', 'Off'],
  },
];

const detailsFields = [
  {
    label: 'Cover letter',
    options: ['Mandatory', 'Optional', 'Off'],
  },
];

const AppFormConfiguration = () => {
  return (
    <div className='flex-1 flex-shrink-0 bg-white drop-shadow-lg pb-4 rounded-tr-md rounded-tl-md overflow-hidden'>
      <div>
        <AppFormSection
          title='Personal information'
          fields={personalInfoFields}
        />
        <AppFormSection title='Profile' fields={profileFields} />
        <AppFormSection title='Details' fields={detailsFields} />
      </div>
    </div>
  );
};

export default AppFormConfiguration;
