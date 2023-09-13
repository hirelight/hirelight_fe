'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { MenuIcon } from '@/icons';

import logo from '/public/images/logo.png';

import Sidebar from '../Sidebar';

import styles from './HomeHeader.module.scss';

const HomeHeader = () => {
  const [showMenu, setShowMenu] = React.useState(false);

  const handleShowMenu = (show: boolean) => {
    if (showMenu) {
      setTimeout(() => setShowMenu(show), 300);
    } else {
      setShowMenu(show);
    }
  };

  return (
    <header className='max-w-screen-xl w-full mx-auto flex justify-between items-center py-6 px-4 md:px-8'>
      <div className='flex gap-2 items-center'>
        <Image
          alt='Hirelight Logo'
          src={logo}
          className='w-10 h-auto object-contain'
        />
        <h3 className='text-3xl font-semibold'>Hirelight</h3>
      </div>
      <nav className='hidden lg:block'>
        <ul className='flex gap-8 font-medium text-lg text-neutral-600'>
          <li className={`${styles.active}`}>
            <Link href={'#'}>Home</Link>
          </li>
          <li className='hover:text-blue_primary_800'>
            <Link href={'#'}>Pricing</Link>
          </li>
          <li className='hover:text-blue_primary_800'>
            <Link href={'#'}>About us</Link>
          </li>
          <li className='hover:text-blue_primary_800'>
            <Link href={'#'}>Career Center</Link>
          </li>
        </ul>
      </nav>
      <div className='hidden lg:flex gap-4'>
        <button
          type='button'
          className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-base font-medium text-gray-900 rounded-full group bg-gradient-to-br from-cyan-600 to-blue-700 group-hover:from-cyan-600 group-hover:to-blue-700 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'
        >
          <span className='relative px-6 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0'>
            Sign in
          </span>
        </button>
        <button
          type='button'
          className='text-white bg-gradient-to-r from-cyan-600 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-full text-base px-6 py-2.5 text-center mr-2 mb-2'
        >
          Sign up
        </button>
      </div>

      <div className='block lg:hidden'>
        <button
          aria-label='open menu'
          type='button'
          data-drawer-target='drawer-navigation'
          data-drawer-show='drawer-navigation'
          aria-controls='drawer-navigation'
          className='text-neutral-400 p-2 border border-neutral-400 rounded-full hover:text-neutral-600 hover:border-neutral-600 hover:bg-slate-100'
          onClick={handleShowMenu.bind(null, true)}
        >
          <MenuIcon />
        </button>

        {showMenu && (
          <Sidebar closeMenu={handleShowMenu.bind(false)} showMenu={showMenu} />
        )}
      </div>
    </header>
  );
};

export default HomeHeader;
