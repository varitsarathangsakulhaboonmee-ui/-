import React, { useState, useMemo } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Button from '@/components/Button';
import {
  getItemById,
  toppings,
  spiceLevels,
  sizes,
  itemName,
  toppingName,
  spiceName,
  sizeName,
} from '@/data/menu';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import { formatYen } from '@/utils/currency';
import { toast } from '@/components/ui/use-toast';
import { ArrowLeft, Check, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Customize() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const food = getItemById(id);
  const { addToCart } = useCart();
  const { lang } = useLanguage();
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [spice, setSpice] = useState('medium');
  const [qty, setQty] = useState(1);
  const [sizeId, setSizeId] = useState(food?.hasSizes ? (searchParams.get('size') || 'M') : null);
  const sizeObj = food?.hasSizes ? sizes.find((s) => s.id === sizeId) : null;

  const unitPrice = useMemo(() => {
    if (!food) return 0;
    const base = sizeObj ? sizeObj.price : food.price;
    return base + selectedToppings.reduce((s, tp) => s + tp.price, 0);
  }, [food, selectedToppings, sizeObj]);

  if (!food) {
    return (
      <div className="min-h-screen flex items-center justify-center text-kamtan-gray text-lg">
        {t('notFound', lang)}
      </div>
    );
  }

  const toggleTopping = (tp) => {
    setSelectedToppings((prev) =>
      prev.find((x) => x.id === tp.id) ? prev.filter((x) => x.id !== tp.id) : [...prev, tp]
    );
  };

  const total = unitPrice * qty;

  const handleAdd = () => {
    const spiceObj = spiceLevels.find((s) => s.id === spice);
    addToCart(food, { toppings: selectedToppings, spiceLevel: spiceObj, quantity: qty, size: sizeObj });
    toast({ title: t('added', lang).replace('{name}', itemName(food, lang)) });
    navigate('/menu');
  };

  const secondary = lang === 'th' ? food.nameEN : lang === 'en' ? food.nameJA : food.nameTH;

  return (
    <div className="min-h-screen bg-kamtan-cream flex flex-col lg:flex-row">
      <div className="lg:w-1/2 relative bg-kamtan-dark">
        <div className="h-64 lg:h-screen relative">
          <Image
            src={food.image}
            alt={food.nameEN}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-kamtan-dark/80 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-kamtan-dark/40" />
          <button
            onClick={() => navigate(-1)}
            className="absolute top-5 left-5 h-12 px-5 rounded-2xl bg-white/90 text-kamtan-dark font-semibold flex items-center gap-2 active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" /> {t('back', lang)}
          </button>
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-3xl lg:text-4xl font-bold font-serifthai">{itemName(food, lang)}</h1>
            <p className="text-white/70 text-lg">{secondary}</p>
          </div>
        </div>
      </div>

      <div className="lg:w-1/2 flex flex-col p-6 lg:p-10 overflow-y-auto">
        <div>
          <h2 className="text-2xl lg:text-3xl font-bold text-kamtan-dark">
            {t('customizeTitle', lang)}
          </h2>
          <p className="text-kamtan-gray text-lg">{t('customizeSub', lang)}</p>
        </div>

        {food.hasSizes && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-kamtan-dark mb-3">{t('size', lang)}</h3>
            <div className="flex flex-wrap -mx-1.5">
              {sizes.map((s) => {
                const active = sizeId === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => setSizeId(s.id)}
                    className={cn(
                      'w-1/4 px-1.5 mb-3 h-16 rounded-2xl border-2 flex flex-col items-center justify-center font-semibold transition-all active:scale-95',
                      active
                        ? 'border-kamtan-red bg-kamtan-red text-white'
                        : 'border-black/10 bg-white text-kamtan-dark'
                    )}
                  >
                    <span className="text-lg font-extrabold leading-none">{s.id}</span>
                    <span className={cn('text-xs mt-1', active ? 'text-white/80' : 'text-kamtan-gray')}>
                      {formatYen(s.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-lg font-bold text-kamtan-dark mb-3">{t('toppings', lang)}</h3>
          <div className="space-y-3">
            {toppings.map((tp) => {
              const checked = !!selectedToppings.find((x) => x.id === tp.id);
              return (
                <button
                  key={tp.id}
                  onClick={() => toggleTopping(tp)}
                  className={cn(
                    'w-full h-16 px-5 rounded-2xl flex items-center justify-between border-2 transition-all active:scale-[0.99]',
                    checked ? 'border-kamtan-red bg-kamtan-cream' : 'border-black/10 bg-white'
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        'w-6 h-6 rounded-md border-2 flex items-center justify-center',
                        checked ? 'bg-kamtan-red border-kamtan-red' : 'border-black/20'
                      )}
                    >
                      {checked && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                    </span>
                    <span className="text-lg font-semibold text-kamtan-dark">
                      {toppingName(tp, lang)}
                    </span>
                  </span>
                  <span className="text-kamtan-red font-bold">+{formatYen(tp.price)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-kamtan-dark mb-3">{t('spiceLevel', lang)}</h3>
          <div className="flex flex-wrap -mx-1.5">
            {spiceLevels.map((s) => {
              const active = spice === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSpice(s.id)}
                  className={cn(
                    'w-1/2 px-1.5 mb-3 h-14 rounded-2xl border-2 flex items-center justify-center gap-2 font-semibold transition-all active:scale-95',
                    active
                      ? 'border-kamtan-red bg-kamtan-red text-white'
                      : 'border-black/10 bg-white text-kamtan-dark'
                  )}
                >
                  <span
                    className={cn(
                      'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                      active ? 'border-white' : 'border-black/20'
                    )}
                  >
                    {active && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </span>
                  {spiceName(s, lang)}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-kamtan-dark mb-3">{t('quantity', lang)}</h3>
          <div className="inline-flex items-center gap-4 bg-white rounded-2xl border-2 border-black/10 p-2">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-12 h-12 rounded-xl bg-kamtan-cream flex items-center justify-center active:scale-95"
              aria-label={t('decrease', lang)}
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="text-2xl font-bold w-10 text-center text-kamtan-dark">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-12 h-12 rounded-xl bg-kamtan-red text-white flex items-center justify-center active:scale-95"
              aria-label={t('increase', lang)}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-auto pt-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-kamtan-gray text-lg">{t('total', lang)}</span>
            <span className="text-3xl font-extrabold text-kamtan-red">{formatYen(total)}</span>
          </div>
          <Button variant="primary" size="xl" className="w-full" onClick={handleAdd}>
            {t('addToCart', lang)} · {formatYen(total)}
          </Button>
        </div>
      </div>
    </div>
  );
}