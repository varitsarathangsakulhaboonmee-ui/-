import React from 'react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/store/languageStore';

export default function PaymentMethod({ method, selected, onSelect }) {
  const { lang } = useLanguage();
  const Icon = method.icon;
  const label = method[lang] || method.th;
  const secondary = lang === 'th' ? method.en : lang === 'en' ? method.ja : method.th;
  return (
    <button
      onClick={onSelect}
      className={cn(
        'h-32 rounded-3xl p-6 border-2 flex flex-col items-start justify-center transition-all active:scale-[0.98] text-left',
        selected ? 'border-kamtan-red bg-kamtan-cream shadow-md' : 'border-black/10 bg-white'
      )}
    >
      <Icon
        className={cn('w-10 h-10', selected ? 'text-kamtan-red' : 'text-kamtan-dark')}
        strokeWidth={1.75}
      />
      <span className="text-xl font-bold text-kamtan-dark mt-3">{label}</span>
      <span className="text-kamtan-gray">{secondary}</span>
    </button>
  );
}