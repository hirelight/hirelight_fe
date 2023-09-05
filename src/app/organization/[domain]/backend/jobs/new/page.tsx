'use client';

import React from 'react';
import JobDetail from '../components/JobDetail';
import NewJobHeader from '../components/NewJobHeader';

const NewJob = (props: any) => {
  const [title, setTitle] = React.useState('');

  return (
    <div className='flex-1 flex flex-col max-w-screen-xl mx-auto'>
      <NewJobHeader title={title} />
      <div className='flex-1 flex bg-slate-100 '>
        <div className='flex-1 max-w-screen-xl mx-auto pb-20'>
          <JobDetail onTitleChange={(text: string) => setTitle(text)} />
        </div>
      </div>
    </div>
  );
};

export default NewJob;
