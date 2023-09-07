import React from 'react';
import HeaderBar from './components/HeaderBar';

import { Metadata } from 'next';

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full min-h-screen relative bg-slate-100'>
      <HeaderBar />
      {children}
    </div>
  );
};

export default OrganizationLayout;
