import { Calendar, Clock, DollarCurrency, MapPin } from '@/icons';
import Image from 'next/image';
import React from 'react';
import logo from '/public/images/logo.png';

interface IJobCard {
  companyName: string;
  jobTitle: string | null;
  location?: string;
  type: string;
  salary: string;
  description: string;
  createdDate?: Date;
  updatedDate?: Date;
}

const JobCard = ({
  companyName,
  jobTitle,
  location,
  type,
  salary,
  description,
  createdDate,
  updatedDate,
}: IJobCard) => {
  return (
    <div className='flex gap-4 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 hover:cursor-pointer dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 '>
      <div className='hidden md:block rounded-full w-20 h-20 border border-slate-200 overflow-hidden'>
        <Image
          alt='Company Logo'
          src={logo}
          width={80}
          height={80}
          className='w-full h-auto object-contain'
        />
      </div>

      <div className='flex-1'>
        <h4 className='text-neutral-700 font-medium text-sm sm:text-base'>
          {companyName}
        </h4>
        <h3 className='text-neutral-700 text-lg sm:text-2xl font-semibold mt-1 mb-2'>
          {jobTitle}
        </h3>

        <div className='flex flex-col md:flex-row flex-wrap gap-3 md:gap-6 text-neutral-500 mb-4'>
          <div className='flex items-center'>
            <MapPin className='w-4 h-4 inline-block mr-1' />
            <span className='text-xs sm:text-sm whitespace-nowrap'>
              {location}
            </span>
          </div>
          <div className='flex items-center'>
            <Clock className='w-4 h-4 inline-block mr-1' />
            <span className='text-xs sm:text-sm whitespace-nowrap'>{type}</span>
          </div>
          <div className='flex items-center'>
            <DollarCurrency className='w-4 h-4 inline-block mr-1' />
            <span className='text-xs sm:text-sm whitespace-nowrap'>
              {salary}
            </span>
          </div>
          <div className='hidden xl:flex items-center'>
            <Calendar className='w-4 h-4 inline-block mr-1' />
            <span className='text-xs sm:text-sm whitespace-nowrap'>
              29 minutes ago
            </span>
          </div>
        </div>
        <p className='text-neutral-600 text-sm hidden sm:block'>
          {description}
        </p>
      </div>
    </div>
  );
};

export default JobCard;
