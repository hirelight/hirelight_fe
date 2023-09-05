'use client';

import React from 'react';
import JobDetail from '../components/JobDetail';
import NewJobHeader from '../components/NewJobHeader';

export enum CreateJobStage {
  JOB_DETAIL = 'job-detail',
  APPLICATION_FORM = 'application-form',
  ADD_MEMBERS = 'add-members',
  WORKFLOW = 'workflow',
}

const NewJob = (props: any) => {
  const [stage, setStage] = React.useState<CreateJobStage>(
    CreateJobStage.JOB_DETAIL
  );
  const [title, setTitle] = React.useState('');

  const handleChangeStage = (stage: CreateJobStage) => {
    setStage(stage);
  };

  const handleGetFormStage = (stage: string) => {
    switch (stage) {
      case 'job-detail':
        return (
          <JobDetail
            stage={stage}
            onTitleChange={(text: string) => setTitle(text)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className='flex-1 flex flex-col max-w-screen-xl mx-auto'>
      <NewJobHeader
        onChangeStage={handleChangeStage}
        title={title}
        currentStage={stage}
      />
      <div className='flex-1 flex bg-slate-100 '>
        <div className='flex-1 max-w-screen-xl mx-auto pb-20'>
          {handleGetFormStage(stage)}
        </div>
      </div>
    </div>
  );
};

export default NewJob;
