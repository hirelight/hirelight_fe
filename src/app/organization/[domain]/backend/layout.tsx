import React, { ReactNode } from 'react';
import HeaderBar from './components/HeaderBar';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Backend',
};

const BackendLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='w-full min-h-screen'>
      <HeaderBar />
      {children}
    </div>
  );
};

export default BackendLayout;
