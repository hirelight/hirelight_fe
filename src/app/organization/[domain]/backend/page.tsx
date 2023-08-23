'use client';

import React from 'react';
import Image from 'next/image';
import banner from '/public/images/interviewee_auth_bg.png';
import { Plus } from '@/icons';
import styles from './page.module.scss';
import JobCard from './components/JobCard';
import { useOutsideClick } from '@/hooks/useClickOutside';

const Backend = () => {
  const [curStage, setCurStage] = React.useState('In Progress');
  const stageBtnWrapperRef = useOutsideClick<HTMLUListElement>(() => {
    if (stageBtnWrapperRef.current) {
      if (
        !stageBtnWrapperRef.current.classList.contains('invisible') &&
        !stageBtnWrapperRef.current.classList.contains('opacity-0') &&
        window.innerWidth <= 480
      ) {
        stageBtnWrapperRef.current.classList.toggle('invisible');
        stageBtnWrapperRef.current.classList.toggle('opacity-0');
      }
    }
  });

  const handleShowBtnList = (stage?: string) => {
    if (stageBtnWrapperRef.current && window.innerWidth <= 480) {
      stageBtnWrapperRef.current.classList.toggle('invisible');
      stageBtnWrapperRef.current.classList.toggle('opacity-0');
    }
    if (stage) setCurStage(stage);
  };

  return (
    <main className='relative'>
      <div className='w-full max-h-[160px] overflow-hidden opacity-60'>
        <Image
          alt='banner background'
          src={banner}
          className='h-auto w-full object-cover'
        />
      </div>
      <div className='max-w-screen-xl mx-auto px-4'>
        <div className='w-full flex items-center bg-white border border-slate-200 shadow-md rounded-lg py-6 px-8 -translate-y-1/2'>
          <div className='relative'>
            <button
              type='button'
              className='block sm:hidden text-blue_primary_800 font-medium'
              onClick={handleShowBtnList.bind(null, undefined)}
            >
              {curStage}
            </button>
            <ul
              ref={stageBtnWrapperRef}
              className='flex flex-col absolute top-full left-0 -translate-x-4  bg-white border border-slate-200 rounded-md mt-2 shadow-md invisible opacity-0 transition-all sm:border-none sm:mt-0 sm:shadow-none sm:bg-transparent sm:relative sm:translate-x-0 sm:visible sm:opacity-100 sm:inset-0 sm:flex-row sm:gap-6 sm:items-center md:gap-12'
            >
              <li className='py-2 px-4 sm:py-0 sm:px-0'>
                <button
                  type='button'
                  className={`${styles.stageButton} ${
                    curStage === 'In Progress' ? styles.active : ''
                  }`}
                  onClick={handleShowBtnList.bind(null, 'In Progress')}
                >
                  In Progress
                </button>
              </li>
              <li className='py-2 px-4 sm:py-0 sm:px-0'>
                <button
                  type='button'
                  className={`${styles.stageButton} ${
                    curStage === 'Draft' ? styles.active : ''
                  }`}
                  onClick={handleShowBtnList.bind(null, 'Draft')}
                >
                  Draft
                  <span className={styles.stageButtonBadge}>2</span>
                </button>
              </li>
              <li className='py-2 px-4 sm:py-0 sm:px-0'>
                <button
                  type='button'
                  className={`${styles.stageButton} ${
                    curStage === 'Published' ? styles.active : ''
                  }`}
                  onClick={handleShowBtnList.bind(null, 'Published')}
                >
                  Published
                  <span className={styles.stageButtonBadge}>4</span>
                </button>
              </li>
            </ul>
          </div>
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2 md:p-0 md:px-5 md:py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ml-auto flex items-center gap-1'
          >
            <Plus className='w-6 h-6' />
            <span className='hidden md:inline-block'>Create a new job</span>
          </button>
        </div>
        <div>
          <JobCard
            title='Frontend Dev'
            isPublished={true}
            location='District 9, Ho Chi Minh city, Ho Chi Minh'
          />
        </div>
      </div>
    </main>
  );
};

export default Backend;
