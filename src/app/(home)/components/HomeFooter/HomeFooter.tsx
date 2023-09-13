import Image from 'next/image';
import React from 'react';

import logo from '/public/images/logo.png';

import Link from 'next/link';

const HomeFooter = () => {
  return (
    <footer className='bg-blue_primary_600 pt-8 md:pt-10  pb-12 md:pb-14 px-6'>
      <div className='max-w-screen-xl w-full mx-auto'>
        <div className='flex justify-center md:justify-between'>
          <div className='flex gap-2 items-center'>
            <Image
              alt='Hirelight Logo'
              src={logo}
              className='w-10 md:w-14 h-auto object-contain'
            />
            <h3 className='text-2xl md:text-4xl text-white font-semibold'>
              Hirelight
            </h3>
          </div>
          <nav className='hidden md:block'>
            <ul className='flex gap-12 font-medium text-xl text-white'>
              <li className={``}>
                <Link href={'#'}>Home</Link>
              </li>
              <li className='hover:text-slate-200'>
                <Link href={'#'}>Pages</Link>
              </li>
              <li className='hover:text-slate-200'>
                <Link href={'#'}>Contact</Link>
              </li>
            </ul>
          </nav>
        </div>
        <hr className='w-full h-[1px] bg-slate-300 my-6 mb-12' />
        <div>
          <p className='text-slate-100 text-sm text-center'>
            2023 copyrights by Hirelight . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
