import React from 'react';
import AppFormSection from './AppFormSection';
import { EAppFormOption, IAppFormFields } from '@/interfaces';
import {
  detailsFields,
  personalInfoFields,
  profileFields,
} from '@/utils/shared/initialDatas';

const AppFormConfiguration = () => {
  return (
    <div className='flex-1 flex-shrink-0 bg-white drop-shadow-lg pb-4 rounded-tr-md rounded-tl-md overflow-hidden'>
      <div>
        <AppFormSection
          title='Personal information'
          fields={personalInfoFields}
        />
        <AppFormSection title='Profile' fields={profileFields} />
        <AppFormSection title='Details' fields={detailsFields} />
      </div>
    </div>
  );
};

export default AppFormConfiguration;
