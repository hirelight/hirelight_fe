'use client';

import React, { FormEvent } from 'react';
import styles from './forgot-password.module.scss';
import Link from 'next/link';

const ForgotPasswordForm = ({ onSwipe }: any) => {
  const handleForgotPassword = (e: FormEvent) => {
    e.preventDefault();
    onSwipe();
  };

  return (
    <form className='w-full flex-shrink-0 ' onSubmit={handleForgotPassword}>
      <div className=' mb-6 relative after:content-["Email"] after:bg-white after:text-sm after:text-gray-600 after:px-1 after:absolute after:top-0 after:left-4 after:-translate-y-1/2'>
        <input
          type='email'
          id='email'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 '
          placeholder='john.doe@company.com'
          required
        />
      </div>
      <button
        type='submit'
        className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-5 py-2.5 mb-4 text-center dark:bg-blue-600 dark:hover:bg-blue-700'
      >
        Submit
      </button>
      <p className='text-sm text-gray-500'>
        Don&apos;t have an account?{' '}
        <Link href='signup' className='text-blue-500 hover:text-blue-700'>
          Register now
        </Link>
      </p>
    </form>
  );
};

export default ForgotPasswordForm;
