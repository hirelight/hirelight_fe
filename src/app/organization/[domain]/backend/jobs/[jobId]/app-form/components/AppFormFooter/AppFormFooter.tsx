'use client';

import React from 'react';

import { ButtonOutline } from '@/components';
import { useAppDispatch } from '@/redux/reduxHooks';
import { clearAppForm } from '@/redux/slices/app-form.slice';

const AppFormFooter = () => {
  const dispatch = useAppDispatch();

  const handleDeleteJob = () => {
    dispatch(clearAppForm);
  };

  return (
    <div className='w-full bg-white flex items-center justify-between px-3 py-6 border-t border-gray-300 rounded-bl-lg rounded-br-lg relative z-[2]'>
      <ButtonOutline>Save draft</ButtonOutline>
      <button
        type='button'
        className='text-xs font-medium text-red-800'
        onClick={handleDeleteJob}
      >
        Delete job
      </button>
    </div>
  );
};

export default AppFormFooter;
