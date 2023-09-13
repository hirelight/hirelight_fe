import React from 'react';
import AppFormConfiguration from './AppFormConfiguration/AppFormConfiguration';
import AppFormMobileView from './AppFormMobileView/AppFormMobileView';
import { ButtonOutline } from '@/components';

const AppForm = () => {
  return (
    <form className='drop-shadow-lg relative'>
      <div className='flex relative'>
        <AppFormConfiguration />
        <AppFormMobileView />
      </div>
      <div className='w-full bg-white px-3 py-6 border-t border-gray-300 rounded-bl-lg rounded-br-lg relative z-[2]'>
        <ButtonOutline>Save draft</ButtonOutline>
      </div>
    </form>
  );
};

export default AppForm;
