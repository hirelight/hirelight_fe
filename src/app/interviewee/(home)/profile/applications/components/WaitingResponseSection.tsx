import React from 'react';
import ApplicationCard from './ApplicationCard';

const WaitingResponseSection = () => {
  return (
    <ul className='space-y-4'>
      {new Array(8).fill('').map((item, index) => (
        <li key={index}>
          <ApplicationCard
            companyName='Hirelight Company'
            jobTitle='Software Engineer'
            location='District 9, Ho Chi Minh city'
            type='Full time'
            salary='negotiate'
          />
        </li>
      ))}
    </ul>
  );
};

export default WaitingResponseSection;
