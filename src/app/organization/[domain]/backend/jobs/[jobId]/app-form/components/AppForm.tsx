import React from 'react';
import AppFormConfiguration from './AppFormConfiguration/AppFormConfiguration';
import AppFormMobileView from './AppFormMobileView/AppFormMobileView';

const AppForm = () => {
  return (
    <form className='drop-shadow-lg'>
      <div className='flex relative'>
        <AppFormConfiguration />
        <AppFormMobileView />
      </div>
      <div className='w-full bg-white px-3 py-4 border-t border-gray-300 rounded-bl-lg rounded-br-lg'></div>
    </form>
  );
};

export default AppForm;
