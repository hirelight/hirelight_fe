'use client';

import React from 'react';
import Link from 'next/link';

import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Handle Login');
  };

  return (
    <form onSubmit={handleLogin}>
      <div className='min-w-[360px] min-h-[400px] flex flex-col gap-4 bg-white border border-gray-300 rounded-md p-6 text-center'>
        <h1 className='text-2xl mb-5 text-slate-700'>Sign in to Hirelight</h1>
        <button type='button' className={styles.button__signin__with}>
          Sign in with Google
        </button>
        <button type='button' className={styles.button__signin__with}>
          Sign in with Microsoft
        </button>
        <button type='button' className={styles.button__signin__with}>
          Sign in with LinkedIn
        </button>
        <div className='flex items-center justify-between gap-2'>
          <hr className='flex-1 h-[1.5px] bg-gray-300' />
          <span className='text-gray-500 font-medium'>OR</span>
          <hr className='flex-1 h-[1.5px] bg-gray-300' />
        </div>
        <div className='mb-2 text-left'>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Email address
          </label>
          <input
            type='email'
            id='email'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='john.doe@company.com'
            required
          />
        </div>
        <div className='mb-2 text-left'>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            required
          />
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Sign in
        </button>

        <Link href={'/signup'}>
          <p className='text-xs text-gray-500 mt-4 mb-2 underline'>
            Forgot your password?
          </p>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
