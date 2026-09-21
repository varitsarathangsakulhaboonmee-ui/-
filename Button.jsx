import React from 'react';
import { cn } from '@/lib/utils';

const sizes = {
  md: 'h-12 px-6 text-base',
  lg: 'h-14 px-8 text-lg',
  xl: 'h-16 px-10 text-xl',
};

const variants = {
  primary: 'bg-kamtan-red text-white hover:bg-kamtan-darkred shadow-sm',
  gold: 'bg-kamtan-gold text-kamtan-dark hover:brightness-95 shadow-sm',
  dark: 'bg-kamtan-dark text-white hover:bg-black',
  outline: 'border-2 border-kamtan-red text-kamtan-red bg-white hover:bg-kamtan-cream',
  ghost: 'bg-transparent text-kamtan-dark hover:bg-kamtan-cream',
  light: 'bg-kamtan-cream text-kamtan-dark hover:bg-white border border-black/5',
};

export default function Button({
  variant = 'primary',
  size = 'lg',
  className,
  children,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all active:scale-[0.98] disabled:opacity-40 disabled:pointer-events-none select-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}