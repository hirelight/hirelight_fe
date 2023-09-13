import React from 'react';

import { IIcon } from './icon.interface';

const CloseIcon = ({ className, id }: IIcon) => {
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
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  );
};

export default CloseIcon;
