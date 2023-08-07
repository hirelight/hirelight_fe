import React from 'react';
import integration from '/public/images/integration.png';
import integration2 from '/public/images/integration2.png';
import integration3 from '/public/images/integration3.png';
import integration4 from '/public/images/integration4.png';
import integration5 from '/public/images/integration5.png';

import styles from './IntegrationDescription.module.scss';
import Image from 'next/image';

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
