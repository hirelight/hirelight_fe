import React from 'react';
import JobDetail from '../../components/JobDetail';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Edit job detail',
};

const JobDetailEdit = (props: any) => {
  return <JobDetail />;
};

export default JobDetailEdit;
