import React from 'react';
import HeaderBar from './components/HeaderBar';

const IntervieweeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full min-h-screen'>
      <HeaderBar />
      {children}
    </div>
  );
};

export default IntervieweeLayout;