import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import { formatYen } from '@/utils/currency';

export default function CartBar() {
  const { cartCount, subtotal } = useCart();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 lg:left-60 right-0 z-40 px-4 pb-4 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto bg-kamtan-dark text-white rounded-2xl shadow-2xl flex items-center justify-between p-3 pl-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="w-7 h-7 text-kamtan-gold" />
            <span className="absolute -top-2 -right-2 bg-kamtan-red text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <div className="leading-tight">
            <p className="text-sm text-white/60">{cartCount} {t('items', lang)}</p>
            <p className="text-xl font-extrabold">{formatYen(subtotal)}</p>
          </div>
        </div>
        <button
          onClick={() => navigate('/cart')}
          className="h-14 px-6 rounded-xl bg-kamtan-red hover:bg-kamtan-darkred active:scale-95 transition-all flex items-center gap-2 text-lg font-bold"
        >
          {t('viewCart', lang)} <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}