import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import Logo from '@/components/Logo';
import LanguageSelector from '@/components/LanguageSelector';
import { Image } from '@/components/ui/image';
import { UtensilsCrossed, ShoppingBag, ChevronRight } from 'lucide-react';

const t = {
  heading: {
    th: 'เลือกประเภทการรับประทาน',
    en: 'Select your dining option',
    ja: 'お食事スタイルをお選びください',
  },
  eatIn: { th: 'ทานที่ร้าน', en: 'Eat In', ja: '店内でお食事' },
  takeaway: { th: 'สั่งกลับบ้าน', en: 'Takeaway', ja: 'テイクアウト' },
};

export default function DiningOption() {
  const navigate = useNavigate();
  const { setDiningOption } = useCart();
  const { lang } = useLanguage();
  const secondary = lang === 'en' ? 'th' : 'en';

  const select = (opt) => {
    setDiningOption(opt.id);
    navigate('/menu');
  };

  const options = [
    { id: 'eat-in', icon: UtensilsCrossed, key: 'eatIn', bg: 'https://media.base44.com/images/public/6aaa3a8181822c6f79bea553/07cdc08d0_orca-image-2061800343jpeg.jpeg' },
    { id: 'takeaway', icon: ShoppingBag, key: 'takeaway', bg: 'https://media.base44.com/images/public/6aaa3a8181822c6f79bea553/07cdc08d0_orca-image-2061800343jpeg.jpeg' },
  ];

  return (
    <div className="relative min-h-screen bg-kamtan-cream flex flex-col items-center overflow-hidden">
      <div className="relative z-10 w-full max-w-md px-6 py-10 flex-1 flex flex-col">
        <div className="flex justify-center">
          <Logo size="h-28 w-28" />
        </div>

        <div className="mt-8 text-center">
          <h1 className="text-2xl font-bold text-kamtan-dark font-serifthai">{t.heading[lang]}</h1>
        </div>

        <div className="mt-8 space-y-4">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.id}
                onClick={() => select(opt)}
                className="relative w-full h-36 rounded-2xl overflow-hidden text-left shadow-md active:scale-[0.98] transition flex items-center px-5"
              >
                <Image src={opt.bg} alt="" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
                <div className="relative flex items-center gap-4 w-full">
                  <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shrink-0 shadow">
                    <Icon className="w-7 h-7 text-kamtan-dark" strokeWidth={1.75} />
                  </div>
                  <div className="flex-1">
                    <p className="text-xl font-bold text-white">{t[opt.key][lang]}</p>
                    <p className="text-sm text-white/70">{t[opt.key][secondary]}</p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-white/80" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-auto pt-8 flex justify-center">
          <LanguageSelector />
        </div>
      </div>
    </div>
  );
}