import { TProgress } from '@/types/progressbar/progressbar';
import React from 'react';

interface ProgressBarProps {
  progress: TProgress;
}

const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="w-[1392px] h-3 bg-line-light rounded-xl">
      <div
        style={{ width: `${progress.progressPercent}%` }}
        className="h-full bg-accent-green rounded-xl"
      ></div>
    </div>
  );
};

export default ProgressBar;