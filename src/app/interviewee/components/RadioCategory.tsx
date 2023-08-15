import React from 'react';

interface IRadioCategory {
  title: string;
  type: 'radio' | 'checkbox';
  options: string[];
  onChange?: any;
}

const RadioCategory = ({ title, type, options, onChange }: IRadioCategory) => {
  return (
    <div>
      <h3 className='text-lg mb-6'>{title}</h3>
      {options.map((option: string) => {
        switch (type) {
          case 'radio':
            return (
              <div className='flex items-center mb-4' key={option}>
                <input
                  id={option}
                  type='radio'
                  value=''
                  name='default-radio'
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor={option}
                  className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  {option}
                </label>
              </div>
            );
          case 'checkbox':
            return (
              <div className='flex items-center mb-4' key={option}>
                <input
                  id={option}
                  type='checkbox'
                  value=''
                  className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                />
                <label
                  htmlFor={option}
                  className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
                >
                  {option}
                </label>
              </div>
            );
        }
      })}
    </div>
  );
};

export default RadioCategory;
