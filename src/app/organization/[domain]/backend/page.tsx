import React from 'react';
import styles from './backend.module.scss';

const Backend = () => {
  return (
    <div className='flex-1 flex flex-col'>
      <div className='w-full bg-white drop-shadow-md'>
        <div className='max-w-screen-xl mx-auto py-3 px-6 flex justify-between'>
          <h1 className='font-medium text-2xl'>FPT University</h1>
          <button
            type='button'
            className='focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-green-700 dark:hover:bg-green-700 dark:focus:ring-green-800'
          >
            Create a new job
          </button>
        </div>
      </div>
      <div className='flex-1 bg-slate-100'></div>
    </div>
  );
};

export default Backend;
