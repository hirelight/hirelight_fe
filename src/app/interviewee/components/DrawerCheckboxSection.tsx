'use client';

import React, { useState } from 'react';

interface IDrawerCheckboxSection {
  title: string;
  options: string[];
  handleCheckChange?: any;
  underline?: boolean;
  handleUnChecked?: any;
}

const DrawerCheckboxSection = ({
  title,
  options,
  handleCheckChange,
  handleUnChecked,
  underline = true,
}: IDrawerCheckboxSection) => {
  const [values, setValues] = React.useState<string[]>([]);

  return (
    <section>
      <h3 className='text-lg font-medium mb-4 '>{title}</h3>
      <div className='grid grid-cols-2'>
        {options.map((option: string, index: number) => (
          <div className='flex items-center mb-4' key={option}>
            <input
              id={`${title}-${option}`}
              type='checkbox'
              value={option}
              name={title}
              className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              checked={values.includes(option)}
              onChange={(e) => {
                if (e.target.checked) {
                  setValues([...values, e.target.value]);
                  handleCheckChange([...values, e.target.value]);
                } else {
                  setValues(values.filter((item) => item !== e.target.value));
                  handleCheckChange(
                    values.filter((item) => item !== e.target.value)
                  );
                }
              }}
            />
            <label
              htmlFor={`${title}-${option}`}
              className='ml-2 text-base font-light text-gray-900 dark:text-gray-300'
            >
              {option}
            </label>
          </div>
        ))}
      </div>
      {underline && <hr className='w-full h-[1px] bg-slate-200 mb-6' />}
    </section>
  );
};

export default DrawerCheckboxSection;
