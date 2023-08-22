import React from 'react';
import { IIcon } from './icon.interface';

const Plus = ({ id, className }: IIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke='currentColor'
      id={id}
      className={className}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 4.5v15m7.5-7.5h-15'
      />
    </svg>
  );
};

export default Plus;
