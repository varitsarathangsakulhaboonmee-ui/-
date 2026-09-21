import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import Button from '@/components/Button';
import Modal from '@/components/Modal';
import PaymentMethod from '@/components/PaymentMethod';
import { formatYen } from '@/utils/currency';
import { ArrowLeft, QrCode, Banknote } from 'lucide-react';

const methods = [
  { id: 'qr', icon: QrCode, th: 'สแกน QR พร้อมเพย์', en: 'PromptPay QR', ja: 'プロンプトペイQR' },
  { id: 'counter', icon: Banknote, th: 'ชำระที่เคาน์เตอร์', en: 'Pay at Counter', ja: 'カウンターで支払い' },
];

function QrPlaceholder() {
  // Mock QR for prototype only — NOT a real payment QR.
  return (
    <svg viewBox="0 0 21 21" className="w-full h-full" aria-label="Mock QR Code">
      <rect width="21" height="21" fill="white" />
      {[
        [0, 0],
        [14, 0],
        [0, 14],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={7} height={7} fill="#171717" />
          <rect x={x + 1} y={y + 1} width={5} height={5} fill="white" />
          <rect x={x + 2} y={y + 2} width={3} height={3} fill="#171717" />
        </g>
      ))}
      {Array.from({ length: 200 }).map((_, i) => {
        const x = (i * 7) % 21;
        const y = (i * 5) % 21;
        if ((x < 7 && y < 7) || (x > 13 && y < 7) || (x < 7 && y > 13)) return null;
        return i % 2 === 0 ? (
          <rect key={i} x={x} y={y} width={1} height={1} fill="#171717" />
        ) : null;
      })}
    </svg>
  );
}

export default function Payment() {
  const navigate = useNavigate();
  const { subtotal, paymentMethod, setPaymentMethod, completeOrder } = useCart();
  const { lang } = useLanguage();
  const [qrOpen, setQrOpen] = useState(false);

  const handleSelect = (id) => {
    setPaymentMethod(id);
    if (id === 'qr') setQrOpen(true);
  };

  const handleConfirm = () => {
    completeOrder();
    navigate('/success');
  };

  return (
    <div className="min-h-screen bg-kamtan-cream flex flex-col">
      <header className="bg-kamtan-dark text-white px-6 lg:px-10 py-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/cart')}
          className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center active:scale-95"
          aria-label={t('back', lang)}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold font-serifthai">{t('paymentTitle', lang)}</h1>
          <p className="text-white/60">{t('paymentSub', lang)}</p>
        </div>
      </header>

      <div className="flex-1 px-6 lg:px-10 py-8 max-w-3xl mx-auto w-full">
        <div className="bg-white rounded-3xl p-6 border border-black/5 shadow-sm mb-6">
          <p className="text-kamtan-gray text-lg">{t('amountDue', lang)}</p>
          <p className="text-4xl font-extrabold text-kamtan-red mt-1">{formatYen(subtotal)}</p>
        </div>

        <h2 className="text-lg font-bold text-kamtan-dark mb-3">{t('chooseMethod', lang)}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {methods.map((m) => (
            <PaymentMethod
              key={m.id}
              method={m}
              selected={paymentMethod === m.id}
              onSelect={() => handleSelect(m.id)}
            />
          ))}
        </div>
      </div>

      <div className="sticky bottom-0 bg-white/90 backdrop-blur border-t border-black/5 p-5">
        <div className="flex gap-3 max-w-3xl mx-auto w-full">
          <Button variant="light" size="lg" onClick={() => navigate('/cart')}>
            {t('back', lang)}
          </Button>
          <Button
            variant="primary"
            size="xl"
            className="flex-1"
            disabled={!paymentMethod}
            onClick={handleConfirm}
          >
            {t('confirmPayment', lang)}
          </Button>
        </div>
      </div>

      <Modal open={qrOpen} onClose={() => setQrOpen(false)} className="text-center">
        <h2 className="text-xl font-bold text-kamtan-dark mb-1">{t('scanQrTitle', lang)}</h2>
        <p className="text-sm text-kamtan-gray mb-5">{t('scanQrDesc', lang)}</p>
        <div className="mx-auto w-56 h-56 border-2 border-black/10 rounded-2xl p-3 mb-5 bg-white overflow-hidden">
          <img
            src="https://media.base44.com/images/public/6aaa3a8181822c6f79bea553/8df794822_1789563474687.jpg"
            alt="PromptPay QR"
            className="w-full h-full object-contain"
          />
        </div>
        <p className="text-2xl font-extrabold text-kamtan-red mb-5">{formatYen(subtotal)}</p>
        <Button variant="primary" size="lg" className="w-full" onClick={() => setQrOpen(false)}>
          {t('paidConfirm', lang)}
        </Button>
      </Modal>
    </div>
  );
}