import React from 'react';
import { Image } from '@/components/ui/image';
import { Plus } from 'lucide-react';
import { formatYen } from '@/utils/currency';
import { useLanguage } from '@/store/languageStore';
import { itemName, itemDesc } from '@/data/menu';
import { cn } from '@/lib/utils';

export default function ProductCard({ item, onAdd }) {
  const { lang } = useLanguage();
  const name = itemName(item, lang);
  const secondary =
    lang === 'th' ? item.nameEN : lang === 'en' ? item.nameJA : item.nameTH;

  return (
    <div className="rounded-3xl overflow-hidden border border-kamtan-gold/25 shadow-lg flex flex-col bg-gradient-to-br from-kamtan-darkred to-kamtan-red">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.nameEN}
          fittingType={item.imageFit === 'contain' ? 'fit' : 'fill'}
          className={cn('w-full h-full', item.imageFit === 'contain' ? 'object-contain' : 'object-cover')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-kamtan-darkred/70 via-transparent to-transparent" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-serifthai font-bold text-white leading-tight">
          {name}
        </h3>
        <p className="text-sm text-kamtan-gold font-semibold tracking-wide">{secondary}</p>
        <p className="text-sm text-white/70 mt-1.5 leading-snug line-clamp-2 flex-1">
          {itemDesc(item, lang)}
        </p>
        {item.hasSizes && (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs font-semibold text-white/60 tracking-widest">SIZE</span>
            <div className="flex gap-1.5">
              {['S', 'M', 'L', 'XL'].map((s) => (
                <span
                  key={s}
                  className="w-7 h-7 rounded-lg border border-white/30 flex items-center justify-center text-xs font-bold text-white"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
          <span className="text-xl font-serifthai font-extrabold text-white">
            {formatYen(item.price)}
          </span>
          <button
            onClick={onAdd}
            aria-label={`+ ${name}`}
            className="w-12 h-12 rounded-2xl bg-kamtan-gold text-kamtan-dark flex items-center justify-center hover:brightness-95 active:scale-95 transition-all shadow-sm"
          >
            <Plus className="w-6 h-6" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}