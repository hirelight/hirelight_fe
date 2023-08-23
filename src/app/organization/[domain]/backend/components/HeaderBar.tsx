'use client';

import Image from 'next/image';
import React from 'react';
import logo from '/public/images/logo.png';
import Link from 'next/link';
import { Bell } from '@/icons';

const HeaderBar = () => {
  return (
    <div className='bg-white shadow-md relative z-10'>
      <div className='max-w-screen-xl mx-auto px-4 flex items-center justify-between py-4'>
        <div className='flex gap-2 items-center'>
          <Image
            alt='Logo'
            src={logo}
            className='w-11 aspect-square object-contain'
          />
          <span className='text-xl font-semibold text-neutral-700'>
            Hirelight
          </span>
        </div>
        <nav>
          <ul className='hidden md:flex gap-6 text-lg'>
            <li>
              <Link
                href={''}
                className='text-blue_primary_800 hover:text-blue_primary_800 font-medium'
              >
                Jobs
              </Link>
            </li>
            <li>
              <Link
                href={'jobs'}
                className='text-blue_primary_600 hover:text-blue_primary_800 font-medium'
              >
                Candidates
              </Link>
            </li>
            <li>
              <Link
                href={'jobs'}
                className='text-blue_primary_600 hover:text-blue_primary_800 font-medium'
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href={'jobs'}
                className='text-blue_primary_600 hover:text-blue_primary_800 font-medium'
              >
                Schedule
              </Link>
            </li>
          </ul>
        </nav>
        <div className='flex gap-8 items-center'>
          <Bell className='text-blue_primary_800 w-8 h-8' />
          <Link
            href={'/settings'}
            className='rounded-full w-10 aspect-square border-2 border-blue_primary_800'
          ></Link>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
