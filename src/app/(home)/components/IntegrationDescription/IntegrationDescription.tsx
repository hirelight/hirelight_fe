import React from 'react';

import styles from './IntegrationDescription.module.scss';

const IntegrationDescription = () => {
  return (
    <div className=' w-full flex flex-col items-center gap-5'>
      <h1 className='text-4xl md:text-5xl lg:text-6xl font-semibold text-center px-9'>
        Tích hợp với các{' '}
        <span className={styles.title__gradient}>ứng dụng phổ biến</span>
      </h1>
      <div className={styles.itegration__wrapper}>
        {/* <Image
          alt='Itegration'
          src={integration}
          className='w-full h-auto object-contain'
        /> */}
      </div>
    </div>
  );
};

export default IntegrationDescription;
