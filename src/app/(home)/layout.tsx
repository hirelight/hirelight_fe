import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='min-h-screen w-full'>{children}</div>;
};

export default HomeLayout;
