'use client';

import React from 'react';
import NewJobHeader from '../components/NewJobHeader';

const HiringPipelineDetailLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [title, setTitle] = React.useState('');

  return (
    <div className='flex-1 flex flex-col max-w-screen-xl mx-auto'>
      <NewJobHeader title={title} />
      <div className='flex-1 flex bg-slate-100 '>
        <div className='flex-1 max-w-screen-xl mx-auto pb-20'>{children}</div>
      </div>
    </div>
  );
};

export default HiringPipelineDetailLayout;
