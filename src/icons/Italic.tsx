import React from 'react';

import { IIcon } from './icon.interface';

const Italic = ({ id, className, onClick }: IIcon) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      height='1em'
      viewBox='0 0 384 512'
      className={className}
      id={id}
    >
      {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
      <path
        fill='currentColor'
        d='M128 64c0-17.7 14.3-32 32-32H352c17.7 0 32 14.3 32 32s-14.3 32-32 32H293.3L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H90.7L224 96H160c-17.7 0-32-14.3-32-32z'
      />
    </svg>
  );
};

export default Italic;
