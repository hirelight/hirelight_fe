'use client';

import React from 'react';
import NewJobHeader from '../components/NewJobHeader';

export enum CreateJobStage {
  JOB_DETAIL = 'job-detail',
  APPLICATION_FORM = 'application-form',
  ADD_MEMBERS = 'add-members',
  WORKFLOW = 'workflow',
}

const HiringPipelineDetailLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [stage, setStage] = React.useState<CreateJobStage>(
    CreateJobStage.JOB_DETAIL
  );
  const [title, setTitle] = React.useState('');

  const handleChangeStage = (stage: CreateJobStage) => {
    setStage(stage);
  };
  return (
    <div className='flex-1 flex flex-col max-w-screen-xl mx-auto'>
      <NewJobHeader
        onChangeStage={handleChangeStage}
        title={title}
        currentStage={stage}
      />
      <div className='flex-1 flex bg-slate-100 '>
        <div className='flex-1 max-w-screen-xl mx-auto pb-20'>{children}</div>
      </div>
    </div>
  );
};

export default HiringPipelineDetailLayout;
