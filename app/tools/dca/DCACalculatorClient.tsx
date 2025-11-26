"use client";

import dynamic from 'next/dynamic';

// Dynamically import DCACalculator with no SSR
const DCACalculator = dynamic(() => import('@/app/components/DCACalculator'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-yellow"></div>
        <p className="mt-4 text-gray-400">Loading calculator...</p>
      </div>
    </div>
  ),
});

export default DCACalculator;
