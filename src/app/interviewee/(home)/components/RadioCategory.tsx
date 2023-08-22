'use client';
import { useOutsideClick } from '@/hooks/useClickOutside';
import { ChevronDown } from '@/icons';
import React from 'react';

interface IRadioCategory {
  title?: string;
  type: 'radio' | 'checkbox';
  options: string[];
  onChange?: any;
}

const RadioCategory = ({ title, type, options, onChange }: IRadioCategory) => {
  const [isShow, setIsShow] = React.useState(false);
  const wrapperRef = useOutsideClick<HTMLUListElement>(() => setIsShow(false));

  return (
    <div className='relative group lg:mb-6'>
      {title && (
        <button
          className='flex items-center gap-1 text-base peer cursor-pointer border border-slate-300 px-4 py-1 rounded-full whitespace-nowrap lg:block lg:mb-4 lg:px-0 lg:py-0 lg:cursor-default lg:border-none'
          onClick={() => setIsShow(!isShow)}
        >
          {title}
          <span className='inline-block lg:hidden'>
            <ChevronDown className='w-4 h-4' />
          </span>
        </button>
      )}
      <ul
        ref={wrapperRef}
        className='flex flex-col gap-4 invisible opacity-0 absolute top-[130%] left-1/2 -translate-x-1/2 z-20 bg-white shadow-lg rounded-lg p-4 border border-slate-200 lg:relative lg:border-none lg:bg-transparent lg:opacity-100 lg:shadow-none lg:p-0 lg:visible transition-all'
        style={
          isShow
            ? {
                opacity: 1,
                visibility: 'visible',
                top: '100%',
              }
            : {}
        }
      >
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
                    className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap cursor-pointer'
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
                    className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap cursor-pointer'
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
