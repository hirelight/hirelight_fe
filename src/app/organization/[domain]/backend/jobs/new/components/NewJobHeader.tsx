import React from 'react';
import styles from './NewJobHeader.module.scss';

interface INewJobHeader {
  onChangeStage?: any;
  title?: string;
}

const NewJobHeader = ({ onChangeStage, title }: INewJobHeader) => {
  return (
    <div className='bg-white rounded-md drop-shadow-md  mt-8 mb-6'>
      <div className='max-w-screen-xl h-[200px] mx-auto py-5 px-6 flex-shrink-0'>
        <div className='w-full flex items-center justify-between mb-4'>
          <h4 className='text-2xl'>{title ? title : 'New Job'}</h4>
          <div>
            <button
              type='button'
              className='text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700'
            >
              Save draft
            </button>
            <button
              type='button'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Save & continue
            </button>
          </div>
        </div>
        <div className='grid grid-cols-5 gap-2'>
          <div className='flex items-start justify-between after:content-[""] after:h-4/5 after:w-[1px] after:bg-gray-400 after:ml-2 after:self-center'>
            <button
              onClick={onChangeStage.bind(null, 'job-detail')}
              className={`${styles.section__wrapper}`}
            >
              <h3 className={styles.section__title}>Job details</h3>
              <p className={`${styles.section__description}`}>
                Tells applicants about this role, including job title, location
                and requirements.
              </p>
            </button>
          </div>
          <div className='flex items-start justify-between after:content-[""] after:h-4/5 after:w-[1px] after:bg-gray-400 after:ml-2 after:self-center'>
            <button
              className={`${styles.section__wrapper}`}
              onClick={onChangeStage.bind(null, 'application-form')}
            >
              <h3 className={styles.section__title}>Application Form</h3>
              <p className={`${styles.section__description}`}>
                Design the application form for this role.
              </p>
            </button>
          </div>
          <div className='flex items-start justify-between after:content-[""] after:h-4/5 after:w-[1px] after:bg-gray-400 after:ml-2 after:self-center'>
            <button
              className={`${styles.section__wrapper}`}
              onClick={onChangeStage.bind(null, 'find-candidates')}
            >
              <h3 className={styles.section__title}>Find Candidates</h3>
              <p className={`${styles.section__description}`}>
                Post on job boards, engage recruiters, request referrals.
              </p>
            </button>
          </div>
          <div className='flex items-start justify-between after:content-[""] after:h-4/5 after:w-[1px] after:bg-gray-400 after:ml-2 after:self-center'>
            <button
              className={`${styles.section__wrapper}`}
              onClick={onChangeStage.bind(null, 'team-members')}
            >
              <h3 className={styles.section__title}>Team Members</h3>
              <p className={`${styles.section__description}`}>
                Invite or add co-workers to collaborate on this job.
              </p>
            </button>
          </div>
          <div className=''>
            <button
              className={`${styles.section__wrapper}`}
              onClick={onChangeStage.bind(null, 'workflow')}
            >
              <h3 className={styles.section__title}>Workflow</h3>
              <p className={`${styles.section__description}`}>
                Create a kit or assessment test for a structured interview
                process.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewJobHeader;
