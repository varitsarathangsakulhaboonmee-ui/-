import React from 'react';
import { cn } from '@/lib/utils';

export default function CategoryChip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'h-11 px-6 rounded-full text-base font-semibold whitespace-nowrap transition-all active:scale-95',
        active
          ? 'bg-kamtan-red text-white shadow'
          : 'bg-white text-kamtan-dark border border-black/10 hover:bg-kamtan-cream'
      )}
    >
      {children}
    </button>
  );
}