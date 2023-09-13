import Image from 'next/image';
import React from 'react';

import background from '/public/images/interviewee_auth_bg.png';

import Sidebar from './components/Sidebar';

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='relative'>
      <div className='w-full max-h-[240px] overflow-hidden opacity-40 absolute top-0 left-0 right-0'>
        <Image
          alt='background'
          src={background}
          className='w-full h-auto object-cover'
        />
      </div>
      <main className='relative max-w-screen-xl mx-auto flex gap-8 py-20'>
        <Sidebar />
        <div className='flex-1'>{children}</div>
      </main>
    </div>
  );
};

export default ProfileLayout;
