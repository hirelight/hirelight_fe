import React from 'react';

import { IIcon } from './icon.interface';

const ChevronDown = ({ id, className, strokeWidth }: IIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={strokeWidth ?? 1.5}
      stroke='currentColor'
      width={24}
      height={24}
      className={className}
      id={id}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M19.5 8.25l-7.5 7.5-7.5-7.5'
      />
    </svg>
  );
};

export default ChevronDown;
