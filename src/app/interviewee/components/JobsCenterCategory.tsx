import React from 'react';
import RadioCategory from './RadioCategory';

const JobsCenterCategory = () => {
  return (
    <aside className='w-full lg:max-w-xs h-fit flex gap-6 lg:gap-0 lg:block px-8 py-6 bg-white rounded-lg shadow-lg border border-slate-200'>
      <h3 className='hidden lg:block text-neutral-700 font-semibold text-xl mb-6'>
        Categories
      </h3>
      <h4 className='text-neutral-700 font-medium text-lg mb-1 hidden lg:block'>
        Salary
      </h4>

      <div
        className='hidden lg:inline-flex rounded-md shadow-sm mb-4'
        role='group'
      >
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-tl-full rounded-bl-full hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700'
        >
          Hours
        </button>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700'
        >
          Months
        </button>
        <button
          type='button'
          className='px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-tr-full rounded-br-full hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700'
        >
          Anually
        </button>
      </div>

      <RadioCategory
        title='Salary'
        type='radio'
        options={['> 1000 000', '> 3 000 000', '> 5 000 000', '> 10 000 000']}
      />
      <RadioCategory
        title='Date posted'
        type='radio'
        options={['All', '24 hours ago', '3 days ago', '7 days ago']}
      />
      <RadioCategory
        title='Experience level'
        type='checkbox'
        options={[
          'Internship',
          'Entry level',
          'Associate',
          'Mid-Senior level',
          'Director',
          'Executive',
        ]}
      />
      <RadioCategory
        title='Job type'
        type='checkbox'
        options={['Full-time', 'Contract', 'Part-time']}
      />
      <RadioCategory
        title='On-site/remote'
        type='checkbox'
        options={['Remote', 'On-site', 'Hybrid']}
      />
    </aside>
  );
};

export default JobsCenterCategory;
