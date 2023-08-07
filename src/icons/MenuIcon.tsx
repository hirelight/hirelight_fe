import React from 'react';
import { IIcon } from './icon.interface';

const MenuIcon = ({ className, id, onClick }: IIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={'w-6 h-6' + ` ${className}`}
      id={id}
      onClick={onClick}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5'
      />
    </svg>
  );
};

export default MenuIcon;
