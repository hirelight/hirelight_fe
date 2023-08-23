'use client';

import React from 'react';
import JobDetail from './components/JobDetail';
import NewJobHeader from './components/NewJobHeader';

const NewJob = (props: any) => {
  const [stage, setStage] = React.useState('job-detail');
  const [title, setTitle] = React.useState('');

  const handleChangeStage = (stage: string) => {
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
      <NewJobHeader onChangeStage={handleChangeStage} title={title} />
      <div className='flex-1 flex bg-slate-100 '>
        <div className='flex-1 max-w-screen-xl mx-auto'>
          <div className='pt-6 pb-20'>
            {/* {stage === 'job-detail' && <JobDetail stage={stage} />} */}
            {handleGetFormStage(stage)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewJob;
