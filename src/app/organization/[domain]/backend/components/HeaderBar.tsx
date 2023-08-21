'use client';

import Image from 'next/image';
import React from 'react';

const HeaderBar = () => {
  return (
    <nav className='fixed top-0 right-0 left-0 z-[1000]'>
      <div className='bg-slate-400 border-gray-200 dark:bg-gray-900'>
        <div className='max-w-screen-xl h-16 flex flex-wrap items-center justify-between mx-auto py-2 px-6'>
          <div className='flex items-center'>
            <a href='https://flowbite.com/' className='flex items-center mr-4'>
              <Image
                src='https://flowbite.com/docs/images/logo.svg'
                className='h-8 mr-3'
                alt='Flowbite Logo'
                width={32}
                height={32}
              />
              <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>
                Hirelight
              </span>
            </a>
            <button
              data-collapse-toggle='navbar-default'
              type='button'
              className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
              aria-controls='navbar-default'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              <svg
                className='w-5 h-5'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 17 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 1h15M1 7h15M1 13h15'
                />
              </svg>
            </button>
            <div
              className='hidden w-full md:block md:w-auto'
              id='navbar-default'
            >
              <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-4 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
                <li>
                  <a
                    href='#'
                    className='block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-whtie md:bg-gray-500 md:px-4 dark:text-white md:dark:text-blue-500'
                    aria-current='page'
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 pr-2 pl-3 text-gray-600 rounded hover:bg-gray-300 md:border-0 md:hover:text-white md:px-4 md:hover:bg-gray-500 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-300'
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 pr-2 pl-3 text-gray-600 rounded hover:bg-gray-300 md:border-0 md:hover:text-white md:px-4 md:hover:bg-gray-500 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-300'
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 pr-2 pl-3 text-gray-600 rounded hover:bg-gray-300 md:border-0 md:hover:text-white md:px-4 md:hover:bg-gray-500 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-300'
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href='#'
                    className='block py-2 pr-2 pl-3 text-gray-600 rounded hover:bg-gray-300 md:border-0 md:hover:text-white md:px-4 md:hover:bg-gray-500 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent transition-all duration-300'
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='w-full md:w-auto flex items-center gap-4'>
            <div className='hidden  lg:block'>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <svg
                    className='w-4 h-4 text-gray-500 dark:text-gray-400'
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
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-slate-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='Search for candidates'
                  required
                />
                {/* <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button> */}
              </div>
            </div>
            <div className='text-gray-600 hover:text-white hover:cursor-pointer transition-all p-2 rounded-md hover:bg-gray-600'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-mail-filled'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path
                  d='M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z'
                  strokeWidth='0'
                  fill='currentColor'
                ></path>
                <path
                  d='M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z'
                  strokeWidth='0'
                  fill='currentColor'
                ></path>
              </svg>
            </div>
            <div className='text-gray-600 hover:text-white hover:cursor-pointer transition-all p-2 rounded-md hover:bg-gray-600'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-category'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M4 4h6v6h-6z'></path>
                <path d='M14 4h6v6h-6z'></path>
                <path d='M4 14h6v6h-6z'></path>
                <path d='M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
              </svg>
            </div>
            <div className='text-gray-600 hover:text-white hover:cursor-pointer transition-all p-2 rounded-md hover:bg-gray-600'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='icon icon-tabler icon-tabler-user-circle'
                width='20'
                height='20'
                viewBox='0 0 24 24'
                strokeWidth='2'
                stroke='currentColor'
                fill='none'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
                <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0'></path>
                <path d='M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0'></path>
                <path d='M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855'></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HeaderBar;
