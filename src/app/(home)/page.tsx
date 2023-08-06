'use client';

import { Alert } from 'flowbite-react';
import styles from './page.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import lading1 from '/public/images/landing_1.jpg';
import lading2 from '/public/images/landing_2.jpg';
import lading3 from '/public/images/landing_3.jpg';

export default function Home() {
  return (
    <div className='w-full'>
      <div className='max-w-screen-xl  mx-auto md:px-6'>
        <div className='w-full flex justify-between items-center py-6 mb-6'>
          <div className='flex gap-2 items-center'>
            <Image
              alt='Hirelight Logo'
              src={'/images/logo.png'}
              width={40}
              height={40}
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
                <Link href={'#'}>Resources</Link>
              </li>
            </ul>
          </nav>
          <div className='hidden lg:flex gap-4'>
            <button className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-cyan-600 to-blue-700 group-hover:from-cyan-600 group-hover:to-blue-700 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'>
              <span className='relative px-6 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0'>
                Sign in
              </span>
            </button>
            <button
              type='button'
              className='text-white bg-gradient-to-r from-cyan-600 to-blue-700 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-full text-sm px-6 py-2.5 text-center mr-2 mb-2'
            >
              Sign up
            </button>
          </div>
        </div>
        <div className='w-full flex justify-between'>
          <section className='flex-1 self-stretch flex flex-col justify-between'>
            <div>
              <p className='text-blue_primary_600 mb-8'>Ipsum dolor sit</p>
              <h1 className='text-5xl lg:text-6xl font-semibold text-neutral-800 mb-4'>
                Worem{' '}
                <span className={styles.title__gradient}>ipsum dolor sit</span>{' '}
                amet consectetur
              </h1>
              <p className='text-neutral-600 text-sm'>
                Gorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
              <p className='text-neutral-600 text-sm'>
                {' '}
                Nunc vulputate libero et velit.
              </p>
              <button
                type='button'
                className='text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 mt-6'
              >
                GET STARTED
              </button>
            </div>
            <div className=''>
              <button>Hello</button>
            </div>
          </section>
          <section className='flex-1 flex flex-col gap-3'>
            <Image
              alt='Lading Image example 1'
              src={lading1}
              className='max-w-full max-h-80 overflow-hidden object-cover rounded-3xl shadow-md'
            />
            <div className='w-full max-h-60 gap-2 flex'>
              <Image
                alt='Lading Image example 2'
                src={lading2}
                className='h-full w-full overflow-hidden object-cover rounded-3xl shadow-md'
              />
              <Image
                alt='Lading Image example 3'
                src={lading3}
                className='h-full w-full overflow-hidden object-cover rounded-3xl shadow-md'
              />
            </div>
          </section>
        </div>
      </div>
      <div className='max-w-screen-xl h-screen mx-auto'></div>
    </div>
  );
}
