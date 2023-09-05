'use client';

import { ChevronDown, SearchIcon } from '@/icons';
import React from 'react';

interface ISelection {
  title: string;
  placeholder?: string;
  datas: string[];
  required: boolean;
}

const Selection = ({
  title,
  placeholder = 'Select...',
  datas,
  required = false,
}: ISelection) => {
  const [show, setShow] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [selected, setSelected] = React.useState('');

  const expandSelection = () => {};

  return (
    <>
      <label
        htmlFor={title}
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
      >
        {required && <span className='text-red-500 mr-1'>*</span>}
        Company industry
      </label>
      <div className='relative min-w-[300px] '>
        <label className='flex items-center justify-between mb-2 text-sm font-medium text-gray-900 dark:text-white p-2 cursor-pointer border border-b-0 border-gray-300 rounded-md' onClick={() => setShow(!show)}>
          {selected ? selected : placeholder ? placeholder : title}
          <div>
            <ChevronDown className='w-4 h-4' strokeWidth={2} />
          </div>
        </label>
        {show && (
          <div className='absolute top-full left-0 right-0 -mt-1 bg-white border border-t-0 border-gray-300 rounded-bl-md rounded-br-md'>
            {/* *******************Search section***************************** */}
            <div className='relative mt-4 mb-2 px-2 rounded-md shadow-sm'>
              <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4'>
                <SearchIcon className='w-4 h-4' />
              </div>
              <input
                type='text'
                name='price'
                id='price'
                className='block w-full rounded-md border-0 py-2.5 pl-8 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue_primary_700 sm:text-sm sm:leading-6'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <ul className='max-h-52 overflow-y-auto overflow-x-hidden'>
              {['Select...', ...datas]
                .filter((item) => item.includes(search))
                .map((item: any, index: number) => (
                  <li
                    key={index}
                    className='py-2 px-4 text-sm text-neutral-700 cursor-pointer hover:bg-slate-200'
                    onClick={() => setSelected(item)}
                  >
                    <span>{item}</span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Selection;
