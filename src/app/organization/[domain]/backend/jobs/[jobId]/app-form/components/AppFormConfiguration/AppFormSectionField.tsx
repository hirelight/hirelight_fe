'use client';

import React from 'react';
import styles from './AppFormSectionField.module.scss';

interface IAppFormSectionField {
  label: string;
  options: string[];
}

const AppFormSectionField = ({ label, options }: IAppFormSectionField) => {
  const [selected, setSelected] = React.useState(
    options[Math.floor(options.length / 2)]
  );
  return (
    <div className={`pt-3 pb-4 flex justify-between items-center `}>
      <span className=''>{label}</span>
      <div className='flex gap-2'>
        {options.map((option) => (
          <button
            key={option}
            type='button'
            className={`${styles.option__wrapper} ${
              selected === option ? styles.active : ''
            }`}
            onClick={() => setSelected(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AppFormSectionField;
