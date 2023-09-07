import React from 'react';
import JobDetail from '../components/JobDetail';
import NewJobHeader from '../components/NewJobHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create new hiring pipeline',
};

const NewJob = (props: any) => {
  return (
    <div className='flex-1 flex flex-col max-w-screen-xl mx-auto'>
      <NewJobHeader />
      <div className='flex-1 flex bg-slate-100 '>
        <div className='flex-1 max-w-screen-xl mx-auto pb-20'>
          <JobDetail />
        </div>
      </div>
    </div>
  );
};

export default NewJob;
