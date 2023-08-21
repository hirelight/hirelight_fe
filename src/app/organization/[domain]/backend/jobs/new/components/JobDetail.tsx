'use client';

import React from 'react';
import styles from './JobDetail.module.scss';

const JobDetail = ({ stage }: { stage: string }) => {
  return (
    <form>
      <div className='bg-white w-full drop-shadow-md rounded-md overflow-hidden'>
        {/* ***********************Job Title Section*********************************** */}
        <h2 className={`${styles.form__section__title}`}>Job title</h2>
        <section className={`${styles.form__section__wrapper}`}>
          <div className='mb-6'>
            <label
              htmlFor='job-title'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              <span className='text-red-500 mr-1'>*</span>
              Job title
            </label>
            <input
              type='text'
              id='job-title'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Example: Fullstack Developer'
            />
          </div>
        </section>

        {/* ***********************Location Section*********************************** */}
        <h2 className={`${styles.form__section__title}`}>Location</h2>
        <section className={`${styles.form__section__wrapper}`}>
          <div className='mb-6'>
            <label
              htmlFor='job-location'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              <span className='text-red-500 mr-1'>*</span>
              Job location
            </label>
            <div className='flex gap-8 items-center'>
              <input
                type='text'
                id='job-location'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Example: District 7, Ho Chi Minh'
              />
              <span className='flex-shrink-0'>Fully remote</span>
            </div>
          </div>
        </section>

        {/* ***********************Description Section*********************************** */}
        <h2 className={`${styles.form__section__title}`}>Description</h2>
        <section className={`${styles.form__section__wrapper}`}>
          <div className='mb-6'>
            <label
              htmlFor='job-location'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              <span className='text-red-500 mr-1'>*</span>
              About this role
            </label>
            <div className='border border-slate-600 rounded-lg min-h-[600px] p-6 relative overflow-hidden'>
              <div className='mb-6 min-h-[220px]'>
                <label
                  htmlFor='job-location'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Description
                </label>
                <p className='text-sm text-gray-600'>
                  Enter the job description here; include key areas of
                  responsibility and what the candidate might do on a typical
                  day.
                </p>
              </div>
              <div className='mb-6 min-h-[220px]'>
                <label
                  htmlFor='job-location'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Requirments
                </label>
                <p className='text-sm text-gray-600'>
                  Enter the job description here; include key areas of
                  responsibility and what the candidate might do on a typical
                  day.
                </p>
              </div>
              <div className='mb-6 min-h-[220px]'>
                <label
                  htmlFor='job-location'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Benefits
                </label>
                <p className='text-sm text-gray-600'>
                  Enter the job description here; include key areas of
                  responsibility and what the candidate might do on a typical
                  day.
                </p>
              </div>

              <div className='absolute bottom-0 right-0 left-0 p-1 bg-gray-200'>
                <span className='text-xs text-gray-500'>
                  Minimum 700 characters. 0 characters used.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ***********************Company industry and Job function Section*********************************** */}
        <h2 className={`${styles.form__section__title}`}>
          Company industry and Job function
        </h2>
        <section className={`${styles.form__section__wrapper}`}>
          <button
            id='dropdown-button'
            data-dropdown-toggle='dropdown'
            className='flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 dark:border-gray-700 dark:text-white rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800'
            type='button'
          >
            All categories{' '}
            <svg
              className='w-2.5 h-2.5 ml-2.5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 10 6'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m1 1 4 4 4-4'
              />
            </svg>
          </button>
          <div
            id='dropdown'
            className='z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700'
          >
            <ul
              className='py-2 text-sm text-gray-700 dark:text-gray-200'
              aria-labelledby='dropdown-button'
            >
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Shopping
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Images
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  News
                </a>
              </li>
              <li>
                <a
                  href='#'
                  className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                >
                  Finance
                </a>
              </li>
            </ul>
          </div>
        </section>
        <div className='p-5 border-t border-t-slate-300'>
          <button
            type='submit'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mr-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Save & continue
          </button>
          <button
            type='button'
            className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
          >
            Save draft
          </button>
        </div>
      </div>
    </form>
  );
};

export default JobDetail;
