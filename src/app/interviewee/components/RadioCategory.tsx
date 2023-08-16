import React from 'react';

interface IRadioCategory {
  title?: string;
  type: 'radio' | 'checkbox';
  options: string[];
  onChange?: any;
}

const RadioCategory = ({ title, type, options, onChange }: IRadioCategory) => {
  return (
    <div className='relative group mb-6'>
      {title && (
        <h3 className='text-base mb-2 lg:mb-4 peer cursor-pointer'>{title}</h3>
      )}
      <ul className='flex flex-col gap-4 opacity-0 group-hover:opacity-100 absolute top-full left-0 bg-white shadow-lg rounded-lg p-4 border border-slate-200 lg:relative lg:border-none lg:bg-transparent lg:opacity-100 lg:shadow-none lg:p-0 '>
        {options.map((option: string) => {
          switch (type) {
            case 'radio':
              return (
                <li className='flex items-center' key={option}>
                  <input
                    id={option}
                    type='radio'
                    value=''
                    name='default-radio'
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor={option}
                    className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap'
                  >
                    {option}
                  </label>
                </li>
              );
            case 'checkbox':
              return (
                <li className='flex items-center' key={option}>
                  <input
                    id={option}
                    type='checkbox'
                    value=''
                    className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  />
                  <label
                    htmlFor={option}
                    className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap'
                  >
                    {option}
                  </label>
                </li>
              );
          }
        })}
      </ul>
    </div>
  );
};

export default RadioCategory;
