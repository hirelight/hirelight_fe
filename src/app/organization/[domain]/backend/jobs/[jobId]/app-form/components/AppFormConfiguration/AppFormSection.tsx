'use client';

import React from 'react';
import styles from './AppFormSection.module.scss';
import AppFormSectionField from './AppFormSectionField';
import { EAppFormOption, IAppFormFields } from '@/interfaces';

interface IAppFormSection {
  title: string;
  fields: IAppFormFields[];
}

const AppFormSection = ({ title, fields }: IAppFormSection) => {
  return (
    <section>
      <div className='px-4 py-4 mb-4 flex items-center bg-slate-400 bg-opacity-20 text-lg font-medium'>
        <h2>{title}</h2>
      </div>
      <ul className='px-4 text-neutral-700 font-medium text-sm'>
        {fields.map((field) => (
          <li
            key={field.label}
            className='border-b last-of-type:border-none border-gray-300'
          >
            <AppFormSectionField
              sectionTitle={title}
              label={field.label}
              options={field.options}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AppFormSection;
