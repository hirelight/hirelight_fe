import React from 'react';

const NewJobLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className='w-full flex-1 flex relative '>{children}</div>;
};

export default NewJobLayout;
