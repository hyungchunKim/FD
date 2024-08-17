import React from 'react';
import ProgressBar from '@/components/atoms/progressbar/ProgressBar';
import { TProgress } from '@/types/progressbar/progressbar';

const progress: TProgress = { progressPercent: 60, completedPercent: 70 };

const ProgressBarPage = () => {
  return (
    <>
      <ProgressBar progress={progress} />  
    </>
  );
};

export default ProgressBarPage;