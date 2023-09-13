import React from 'react';
import AppFormConfiguration from './AppFormConfiguration/AppFormConfiguration';
import AppFormMobileView from './AppFormMobileView/AppFormMobileView';
import { ButtonOutline } from '@/components';
import AppFormFooter from './AppFormFooter/AppFormFooter';

const AppForm = () => {
  return (
    <form className='drop-shadow-lg relative'>
      <div className='flex relative'>
        <AppFormConfiguration />
        <AppFormMobileView />
      </div>
      <AppFormFooter />
    </form>
  );
};

export default AppForm;
