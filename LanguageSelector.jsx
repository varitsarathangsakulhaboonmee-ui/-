import React from 'react';
import { useLanguage } from '@/store/languageStore';
import { cn } from '@/lib/utils';

const langs = [
  { id: 'en', label: 'English' },
  { id: 'ja', label: '日本語' },
  { id: 'th', label: 'ไทย' },
];

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();
  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-white border border-black/10 shadow-sm">
      {langs.map((l) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          className={cn(
            'px-4 h-10 rounded-full text-sm font-semibold transition active:scale-95',
            lang === l.id ? 'bg-kamtan-red text-white' : 'text-kamtan-gray hover:text-kamtan-dark'
          )}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}