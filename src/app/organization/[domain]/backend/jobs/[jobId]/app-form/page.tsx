import { Button, ButtonOutline } from '@/components';
import React from 'react';
import styles from './app-form.module.scss';
import AppForm from './components/AppForm';

const JobApplicationForm = () => {
  return (
    <main>
      <div className='w-full px-4 xl:px-0 flex justify-between items-center mb-4'>
        <h3 className='text-sm uppercase font-bold text-neutral-700'>
          Customize your application form
        </h3>
        <ButtonOutline className='ml-auto'>View destop mode</ButtonOutline>
      </div>
      <AppForm />
    </main>
  );
};

export default JobApplicationForm;
