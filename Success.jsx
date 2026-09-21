import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import Logo from '@/components/Logo';
import Button from '@/components/Button';
import { CheckCircle2 } from 'lucide-react';

export default function Success() {
  const navigate = useNavigate();
  const { orderNumber, resetAll, completeOrder } = useCart();
  const { lang } = useLanguage();

  useEffect(() => {
    if (!orderNumber) completeOrder();
  }, [orderNumber, completeOrder]);

  const handleRestart = () => {
    resetAll();
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-kamtan-darkred to-kamtan-dark text-white flex flex-col items-center justify-center px-6 text-center relative">
      <div className="absolute top-8">
        <Logo size="h-16 w-16" />
      </div>

      <div className="w-24 h-24 rounded-full bg-kamtan-gold flex items-center justify-center mb-8">
        <CheckCircle2 className="w-14 h-14 text-kamtan-dark" strokeWidth={2} />
      </div>

      <h1 className="text-4xl lg:text-5xl font-bold font-serifthai">{t('successTitle', lang)}</h1>
      <p className="text-xl text-white/70 mt-2">{t('successSub', lang)}</p>
      <p className="text-lg text-white/60 mt-6">{t('thankYou', lang)}</p>

      <div className="mt-8 bg-white/10 rounded-2xl px-8 py-5">
        <p className="text-white/60 text-sm">{t('orderNo', lang)}</p>
        <p className="text-3xl font-extrabold tracking-wider text-kamtan-gold mt-1">
          {orderNumber || 'KT-0000'}
        </p>
      </div>

      <p className="text-lg text-white/80 mt-6">{t('preparing', lang)}</p>

      <Button variant="gold" size="xl" className="mt-10 px-12" onClick={handleRestart}>
        {t('startNew', lang)}
      </Button>
    </div>
  );
}