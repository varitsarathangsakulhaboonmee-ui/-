import React from 'react';
import { cn } from '@/lib/utils';

export default function Modal({ open, onClose, children, className, dismissable = true }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={dismissable ? onClose : undefined}
    >
      <div
        className={cn('bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 mx-auto', className)}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}