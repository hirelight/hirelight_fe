'use client';

import React from 'react';
import JobDetail from '../../components/JobDetail';
import NewJobHeader from '../../components/NewJobHeader';

enum HiringPipelineStage {
  JOB_DETAIL = 'job-detail',
  APPLICATION_FORM = 'application-form',
  ADD_MEMBERS = 'add-members',
  WORKFLOW = 'workflow',
}

const JobDetailEdit = (props: any) => {
  const [stage, setStage] = React.useState<HiringPipelineStage>(
    HiringPipelineStage.JOB_DETAIL
  );
  const [title, setTitle] = React.useState('');

  return (
    <JobDetail stage={stage} onTitleChange={(text: string) => setTitle(text)} />
  );
};

export default JobDetailEdit;
