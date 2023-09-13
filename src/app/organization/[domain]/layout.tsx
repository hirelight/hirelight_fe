import React from 'react';

import HeaderBar from './components/HeaderBar';

const OrganizationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full min-h-screen relative bg-slate-200'>
      <HeaderBar />
      {children}
    </div>
  );
};

export default OrganizationLayout;
