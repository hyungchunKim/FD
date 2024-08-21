"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';
import FileIcon from '@/assets/icons/File.svg';
import OffIcon from '@/assets/icons/off.svg';
import Vector6Icon from '@/assets/icons/Vector 6.svg';

const chipVariants = cva(
  'inline-flex items-center justify-between text-sm transition-colors focus:outline-none',
  {
    variants: {
      variant: {
        input: 'bg-background-purple-light text-text-gray-dark rounded-lg',
        assist: 'bg-white border border-line-default rounded-full',
        filter: 'bg-white border border-line-default rounded-lg',
        suggestion: 'rounded-full',
      },
      size: {
        default: 'h-[35px] w-[221px]',
        small: 'h-[35px] w-[148px]',
        assist: 'h-[30px] min-w-[60px] text-xs px-3',
        filter1: 'h-[44px] px-4',
        filter2: 'h-[44px] w-[100px]',
        suggestion: 'h-[19px] min-w-[37px] text-xs px-2',
      },
      state: {
        default: '',
        hover: 'bg-midnightblue-100',
        active: 'bg-midnightblue-200',
        focused: 'bg-midnightblue-300 shadow-[0px_2px_12px_rgba(0,_0,_0,_0.25)]',
        disabled: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'input',
      size: 'default',
      state: 'default',
    },
  }
);

interface ChipProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof chipVariants> {
  text: string;
  showLeftIcon?: boolean;
  showRightIcon?: boolean;
  showRightVector?: boolean;
  onClose?: () => void;
  percentage?: number;
  color?: string;
}

const Chip: React.FC<ChipProps> = ({
  className,
  variant,
  size,
  state,
  text,
  showLeftIcon,
  showRightIcon,
  showRightVector,
  onClose,
  percentage,
  color,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        chipVariants({ variant, size, state }),
        color,
        className,
        'flex items-center justify-between px-3'
      )}
      {...props}
    >
      <div className="flex items-center min-w-0 space-x-2">
        {showLeftIcon && (
          <FileIcon className="w-6 h-6 flex-shrink-0" style={{ width: '24px', height: '24px' }} />
        )}
        <span className="truncate">{text}</span>
      </div>
      <div className="flex items-center space-x-2 flex-shrink-0">
        {percentage !== undefined && (
          <span className="font-medium text-xs">{percentage}%</span>
        )}
        {showRightIcon && (
          <button onClick={onClose} className="focus:outline-none flex-shrink-0">
            <OffIcon
              className="flex-shrink-0"
              style={{ width: '7.5px', height: '7.5px' }}
              viewBox="0 0 12 12"
            />
          </button>
        )}
        {showRightVector && (
          <Vector6Icon
            className="flex-shrink-0"
            style={{ width: '24px', height: '24px', marginLeft: '4px', transform: 'translateY(7px)' }}
          />
        )}
      </div>
    </div>
  );
};

export default Chip;