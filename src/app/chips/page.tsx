"use client";

import React from 'react';
import Chip from '@/components/atoms/chips';

const ChipsPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen bg-background-gray-light p-10 space-y-12">
      <header className="bg-primary-500 text-white p-10 rounded-lg mb-10">
        <h1 className="text-5xl font-bold">Chips Component Display</h1>
        <p className="text-2xl opacity-60">Various states and configurations</p>
      </header>

      {/* Input Chips Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold">Input Chips</h2>
        <div className="flex flex-wrap gap-4">
          <Chip 
            text=".eslintrc.json" 
            variant="input" 
            size="default" 
            state="default" 
            showLeftIcon={false} 
            showRightIcon={false} 
          />
          <Chip 
            text=".eslintrc.json" 
            variant="input" 
            size="default" 
            state="default" 
            showLeftIcon={true} 
            showRightIcon={true} 
          />
          <Chip 
            text=".eslintrc.json" 
            variant="input" 
            size="default" 
            state="default" 
            showLeftIcon={true} 
            showRightIcon={true} 
            percentage={92} 
          />
          <Chip 
            text=".eslintrc.json" 
            variant="input" 
            size="small" 
            state="default" 
            showLeftIcon={true} 
            showRightIcon={false} 
          />
        </div>
      </div>

      {/* Assist Chips Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold">Assist Chips</h2>
        <div className="flex flex-wrap gap-4">
          <Chip 
            text="Label" 
            variant="assist" 
            size="assist" 
            state="default" 
            showLeftIcon={false} 
            showRightIcon={false} 
          />
          <Chip 
            text="Label" 
            variant="assist" 
            size="assist" 
            state="focused" 
            showLeftIcon={false} 
            showRightIcon={false} 
            color="bg-primary-50 text-primary-500"
          />
          <Chip 
            text="Label" 
            variant="assist" 
            size="assist" 
            state="default" 
            showLeftIcon={false} 
            showRightIcon={false} 
          />
        </div>
      </div>

      {/* Filter Chips Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold">Filter Chips</h2>
        <div className="flex flex-wrap gap-4">
          <Chip 
            text="Label" 
            variant="filter" 
            size="filter1" 
            state="default" 
            showLeftIcon={false} 
            showRightIcon={false} 
          />
          <Chip 
            text="Label" 
            variant="filter" 
            size="filter2" 
            state="default" 
            showLeftIcon={false} 
            showRightVector={true} 
          />
          <Chip 
            text="Label" 
            variant="filter" 
            size="filter1" 
            state="focused" 
            showLeftIcon={false} 
            showRightIcon={false} 
            color="bg-primary-50 text-primary-500"
          />
        </div>
      </div>

      {/* Suggestion Chips Section */}
      <div className="space-y-8">
        <h2 className="text-3xl font-semibold">Suggestion Chips</h2>
        <div className="flex flex-wrap gap-4">
          <Chip 
            text="Label" 
            variant="suggestion" 
            size="suggestion" 
            state="default" 
            color="bg-accent-blue text-white" 
          />
          <Chip 
            text="Label" 
            variant="suggestion" 
            size="suggestion" 
            state="default" 
            color="bg-accent-red text-white" 
          />
          <Chip 
            text="Label" 
            variant="suggestion" 
            size="suggestion" 
            state="default" 
            color="bg-primary-50 text-primary-500" 
          />
        </div>
      </div>
    </div>
  );
};

export default ChipsPage;
