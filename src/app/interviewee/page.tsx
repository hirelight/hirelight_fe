import Image from 'next/image';
import React from 'react';
import background from '/public/images/interviewee_auth_bg.png';
import { MapPin, SearchIcon } from '@/icons';
import RadioCategory from './components/RadioCategory';

const JobsCenter = () => {
  return (
    <div className='w-full'>
      <div className='w-full py-20 relative shadow-md'>
        <div className='absolute inset-0 opacity-20 overflow-hidden'>
          <Image
            alt='Background'
            src={background}
            className='w-full h-auto object-cover'
          />
        </div>
        <div className='max-w-screen-xl mx-auto px-4 md:px-10 relative'>
          <section className='mb-10'>
            <h1 className='text-5xl font-semibold mb-6'>
              Find properly jobs for you
            </h1>
            <span className='text-gray-500'>
              Sorem ipsum dolor sit amet, consectetur adipiscing elit.
            </span>
          </section>
          <div className='relative w-full flex'>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <SearchIcon />
              </div>
              <input
                type='search'
                id='jobs-query'
                className='block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 rounded-tl-full rounded-bl-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Jobs you are searching for'
                required
              />
            </div>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <MapPin />
              </div>
              <input
                type='search'
                id='jobs-location'
                className='block w-full p-4 pl-12 text-sm text-gray-900 border border-gray-300 bg-gray-50 rounded-tr-full rounded-br-full focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Location'
                required
              />
            </div>

            <button
              type='submit'
              className='absolute top-0 right-0 p-2.5 px-4 text-sm font-medium h-full text-white bg-blue-700 rounded-tr-full rounded-br-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 z-20 flex gap-3 items-center'
            >
              <svg
                className='w-4 h-4'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                />
              </svg>
              <span>Search</span>
            </button>
          </div>
        </div>
      </div>
      <main className='max-w-screen-xl mx-auto px-4 md:px-10 flex gap-6'>
        <aside className='max-w-xs px-8 py-6'>
          <RadioCategory
            title='Ngày đăng'
            type='radio'
            options={['Toàn bộ', 'Trong 24 giờ qua', 'Trong 3 ngày qua']}
          />
        </aside>
        <div className='flex-1 px-8 py-6'></div>
      </main>
    </div>
  );
};

export default JobsCenter;
