import React from 'react';

import HeaderBar from './components/HeaderBar';

const IntervieweeAuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full h-screen flex flex-col md:overflow-hidden'>
      <HeaderBar />
      {children}
    </div>
  );
};

export default IntervieweeAuthLayout;
