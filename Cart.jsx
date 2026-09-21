import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import CartItem from '@/components/CartItem';
import Button from '@/components/Button';
import { formatYen } from '@/utils/currency';
import { Plus, ArrowRight } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { cart, subtotal } = useCart();
  const { lang } = useLanguage();

  return (
    <div className="px-5 lg:px-10 py-6 pb-32 max-w-3xl mx-auto">
      <header className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold text-kamtan-dark font-serifthai">
          {t('reviewTitle', lang)}
        </h1>
        <p className="text-kamtan-gray text-lg">{t('reviewSub', lang)}</p>
      </header>

      {cart.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-kamtan-gray">{t('emptyCart', lang)}</p>
          <Button variant="primary" size="lg" className="mt-6" onClick={() => navigate('/menu')}>
            {t('chooseMenu', lang)}
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((line) => (
              <CartItem key={line.lineId} line={line} />
            ))}
          </div>

          <div className="mt-8 bg-white rounded-3xl p-6 border border-black/5 shadow-sm">
            <div className="flex justify-between text-lg text-kamtan-gray">
              <span>{t('subtotal', lang)}</span>
              <span>{formatYen(subtotal)}</span>
            </div>
            <div className="border-t border-black/10 my-3" />
            <div className="flex justify-between text-2xl font-extrabold text-kamtan-dark">
              <span>{t('totalLabel', lang)}</span>
              <span className="text-kamtan-red">{formatYen(subtotal)}</span>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="light" size="lg" onClick={() => navigate('/menu')}>
              <Plus className="w-5 h-5" /> {t('addMore', lang)}
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={() => navigate('/payment')}
            >
              {t('checkout', lang)} <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}