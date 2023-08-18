'use client';

import React from 'react';

const FilterDrawer = () => {
  const [show, setShow] = React.useState(false);

  const handleToggleFilterDrawer = () => {
    setShow(!show);
  };

  return (
    <div className='lg:hidden'>
      <div className='text-center'>
        <button
          className='text-base lg:mb-4 border border-slate-300 px-4 py-1 rounded-full whitespace-nowrap'
          type='button'
          data-drawer-target='filter-drawer'
          data-drawer-show='filter-drawer'
          aria-controls='filter-drawer'
          onClick={handleToggleFilterDrawer}
        >
          All filter
        </button>
      </div>

      {/* <div
        ref={drawerRef}
        className='fixed inset-0 w-0 invisible backdrop-brightness-90 z-[1000]'
        style={
          show
            ? {
                visibility: 'visible',
                width: '100%',
              }
            : {
                transitionProperty: 'all',
                transitionDelay: '200ms',
                transitionDuration: '0',
              }
        }
      > */}
      <div
        id='filter-drawer'
        className='fixed bottom-0 right-0 z-40 max-h-[85vh] max-w-xl w-full overflow-y-auto transition-transform translate-x-full bg-white dark:bg-gray-800 border border-slate-200 shadow-lg'
        tabIndex={-1}
        aria-labelledby='drawer-label'
        style={
          show
            ? {
                transform: 'translateX(0)',
              }
            : undefined
        }
      >
        <div className='flex justify-between items-center border-b border-slate-200 p-4'>
          <h3
            id='drawer-label'
            className='inline-flex items-center text-xl font-semibold text-gray-500 dark:text-gray-400'
          >
            <svg
              className='w-4 h-4 mr-2.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 20 20'
            >
              <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z' />
            </svg>
            Filter only by
          </h3>
          <button
            type='button'
            data-drawer-hide='drawer-example'
            aria-controls='drawer-example'
            className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white'
            onClick={handleToggleFilterDrawer}
          >
            <svg
              className='w-3 h-3'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 14 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
              />
            </svg>
            <span className='sr-only'>Close menu</span>
          </button>
        </div>
        <div className='p-4'>
          <h3 className='text-lg font-medium mb-4 '>Sort by</h3>
          <div className='grid grid-cols-2'>
            <div className='flex items-center mb-4'>
              <input
                id='default-radio-1'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='default-radio-1'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Default radio
              </label>
            </div>
            <div className='flex items-center mb-4'>
              <input
                id='default-radio-1'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='default-radio-1'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Default radio
              </label>
            </div>
            <div className='flex items-center mb-4'>
              <input
                id='default-radio-1'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='default-radio-1'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Default radio
              </label>
            </div>
            <div className='flex items-center mb-4'>
              <input
                id='default-radio-1'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
              />
              <label
                htmlFor='default-radio-1'
                className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
              >
                Default radio
              </label>
            </div>
          </div>
        </div>
        <div className='border-t border-slate-200 p-4'>
          <div className='grid grid-cols-2 gap-4'>
            <a
              href='#'
              className='px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 roundedLg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
            >
              Reset
            </a>
            <a
              href='#'
              className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 roundedLg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Show results{' '}
              <svg
                className='w-3.5 h-3.5 ml-2'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default FilterDrawer;
