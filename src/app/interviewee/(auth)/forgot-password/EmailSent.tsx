import Image from 'next/image';
import React, { useEffect } from 'react';

import checkEmail from '/public/images/check_email.png';

const EmailSent = ({ onSwipe, stage }: any) => {
  return (
    <div className='w-full flex-shrink-0 flex flex-col items-center -mt-4'>
      <p className='text-sm text-gray-500'>
        Đường dẫn xác nhận đã được gửi đến example@gmail.com
      </p>
      <p className='text-sm text-gray-500'>
        Bạn vui lòng kiểm tra mail để xác nhận tài khoản
      </p>
      <Image
        alt='Check Email'
        src={checkEmail}
        className='w-60 h-auto object-contain my-2'
      />
      <p className='text-sm text-gray-500'>Link is available in 150 seconds</p>
      <button type='button' onClick={() => onSwipe()}>
        Next
      </button>
    </div>
  );
};

export default EmailSent;
