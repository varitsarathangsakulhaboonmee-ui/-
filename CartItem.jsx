import React from 'react';
import { Image } from '@/components/ui/image';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import { getItemById, itemName, toppingName, spiceName, sizeName } from '@/data/menu';
import { formatYen } from '@/utils/currency';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartItem({ line }) {
  const { updateQuantity, removeLine } = useCart();
  const { lang } = useLanguage();
  const item = getItemById(line.foodId);
  const name = item ? itemName(item, lang) : line.nameTH;
  const customizationText = [
    line.size ? sizeName(line.size, lang) : null,
    ...line.toppings.map((tp) => toppingName(tp, lang)),
    item?.customizable && line.spiceLevel ? spiceName(line.spiceLevel, lang) : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <div className="bg-white rounded-3xl p-4 border border-black/5 shadow-sm flex gap-4">
      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-kamtan-cream shrink-0">
        <Image src={line.image} alt={line.nameEN} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-kamtan-dark leading-tight font-serifthai">{name}</h3>
        {customizationText && (
          <p className="text-sm text-kamtan-gray mt-0.5">{customizationText}</p>
        )}
        <div className="flex items-center justify-between mt-3">
          <div className="inline-flex items-center gap-2 bg-kamtan-cream rounded-xl p-1">
            <button
              onClick={() => updateQuantity(line.lineId, -1)}
              className="w-9 h-9 rounded-lg bg-white flex items-center justify-center active:scale-95"
              aria-label={t('decrease', lang)}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-kamtan-dark">{line.quantity}</span>
            <button
              onClick={() => updateQuantity(line.lineId, 1)}
              className="w-9 h-9 rounded-lg bg-kamtan-red text-white flex items-center justify-center active:scale-95"
              aria-label={t('increase', lang)}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xl font-extrabold text-kamtan-red">
              {formatYen(line.unitPrice * line.quantity)}
            </span>
            <button
              onClick={() => removeLine(line.lineId)}
              className="w-9 h-9 rounded-lg text-kamtan-gray hover:bg-red-50 hover:text-kamtan-red flex items-center justify-center active:scale-95"
              aria-label={t('removeItem', lang)}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}