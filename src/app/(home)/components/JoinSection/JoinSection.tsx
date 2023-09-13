import React from 'react';

import styles from './JoinSection.module.scss';

import Image from 'next/image';

import joinPoster from '/public/images/join_poster.jpg';

const JoinSection = () => {
  return (
    <div className='max-w-screen-xl mx-auto w-full flex flex-col gap-20 px-6'>
      <section>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold text-center px-9 mb-12'>
          Tham gia vào <span className={styles.title__gradient}>cộng đồng</span>
        </h1>
        <div className='w-full border border-gray-500 rounded-3xl py-10 px-12 lg:px-16 flex flex-col gap-9 md:gap-0 md:flex-row md:justify-between items-center'>
          <div className='flex items-center gap-2 lg:gap-4'>
            <Image
              src={'/images/github.png'}
              alt='Github'
              width={82}
              height={82}
              className='w-24 md:w-16 aspect-square lg:w-auto'
            />
            <div className='flex flex-col gap-2'>
              <h1 className='text-neutral-700 text-2xl md:text-xl lg:text-3xl font-semibold'>
                Github
              </h1>
              <p className='text-neutral-500 text-sm lg:text-base'>
                Open Source & Commit Code
              </p>
            </div>
          </div>
          <div className='flex items-center gap-2 lg:gap-4'>
            <Image
              src={'/images/twitter.png'}
              alt='Twitter'
              width={82}
              height={82}
              className='w-24 md:w-16 aspect-square lg:w-auto'
            />
            <div className='flex flex-col gap-2'>
              <h1 className='text-neutral-700 text-2xl md:text-xl lg:text-3xl font-semibold'>
                Tweeter
              </h1>
              <p className='text-neutral-500 text-sm lg:text-base'>
                Latest News & Update
              </p>
            </div>
          </div>

          <div className='flex items-center gap-2 lg:gap-4'>
            <Image
              src={'/images/telegram.png'}
              alt='Telegram'
              width={82}
              height={82}
              className='w-24 md:w-16 aspect-square lg:w-auto'
            />
            <div className='flex flex-col gap-2'>
              <h1 className='text-neutral-700 text-2xl md:text-xl lg:text-3xl font-semibold'>
                Telegram
              </h1>
              <p className='text-neutral-500 text-sm lg:text-base'>
                Channel For Community
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='flex flex-col items-center'>
        <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold text-center px-9 mb-8'>
          Sẵn sàng để{' '}
          <span className={styles.title__gradient}>trải nghiệm</span>
        </h1>
        <p className='text-sm md:text-base text-gray-500 '>
          Đăng ký ngay để trải nghiệm miễn phí trong 14 ngày đầu tiên
        </p>
        <div className='flex flex-col md:flex-row gap-4 md:gap-8 text-sm md:text-base text-gray-500 my-14 '>
          <p>Đăng ký tài khoản với Google</p>
          <p>Đăng ký tài khoản với LinkedIn</p>
        </div>
        <Image
          alt='Poster'
          src={joinPoster}
          className='max-w-[660px] w-full aspect-video object-cover rounded-tr-2xl  rounded-tl-[200px] rounded-bl-2xl rounded-br-[200px] border-2 border-blue-500'
        />
      </section>
    </div>
  );
};

export default JoinSection;
