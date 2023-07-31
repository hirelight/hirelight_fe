import React from 'react';
import { headers } from 'next/headers';

const Domain = () => {
  const headersList = headers();
  const domain = headersList.get('x-forwarded-host') || '';
  const protocol = headersList.get('x-forwarded-proto') || '';
  const pathname = headersList.get('x-invoke-path') || '';

  return <div>{domain.split('.')[0]}</div>;
};

export default Domain;
