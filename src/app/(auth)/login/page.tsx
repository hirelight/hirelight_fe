import React, { FormEvent } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';

import HeaderBar from './components/HeaderBar';
import styles from './login.module.scss';
import LoginForm from './components/LoginForm';

const Login = () => {
  return (
    <>
      <HeaderBar />
      <div className='flex-1 flex flex-col items-center pt-12'>
        <LoginForm />
        <div className='mt-8 text-sm text-center'>
          <p className='text-gray-500'>Don&apos;t have a Hirelight account?</p>
          <Link
            href={'/signup'}
            className='font-medium text-blue-700 hover:cursor-pointer hover:underline'
          >
            Sign up now for a 15-day free trial
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
