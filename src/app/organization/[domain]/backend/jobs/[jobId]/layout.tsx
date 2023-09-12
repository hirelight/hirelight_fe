import React from 'react';
import NewJobHeader from '../components/NewJobHeader';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Hirelight - Backend',
};

const HiringPipelineDetailLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className='flex-1 flex flex-col max-w-screen-xl mx-auto'>
      <NewJobHeader />
      <div className='flex-1 flex'>
        <div className='flex-1 max-w-screen-xl mx-auto pb-20'>{children}</div>
      </div>
    </div>
  );
};

export default HiringPipelineDetailLayout;