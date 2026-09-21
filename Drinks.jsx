import React from 'react';
import { useNavigate } from 'react-router-dom';
import { menuItems, itemName } from '@/data/menu';
import ProductCard from '@/components/ProductCard';
import Button from '@/components/Button';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import { toast } from '@/components/ui/use-toast';
import { ArrowRight } from 'lucide-react';

export default function Drinks() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { lang } = useLanguage();
  const drinks = menuItems.filter((m) => m.category === 'drinks');

  const handleAdd = (item) => {
    addToCart(item, {
      toppings: [],
      spiceLevel: { id: 'none', nameTH: 'ไม่เผ็ด', price: 0 },
      quantity: 1,
    });
    toast({ title: t('added', lang).replace('{name}', itemName(item, lang)) });
  };

  return (
    <div className="px-5 lg:px-10 py-6 pb-28">
      <header className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-serifthai font-bold text-kamtan-dark">
          {t('drinksTitle', lang)}
        </h1>
        <p className="text-kamtan-gray text-lg">{t('drinksSub', lang)}</p>
      </header>

      <div className="flex flex-wrap -mx-2 lg:-mx-3">
        {drinks.map((item) => (
          <div key={item.id} className="w-1/2 lg:w-1/3 xl:w-1/4 px-2 lg:px-3 mb-4 lg:mb-6">
            <ProductCard item={item} onAdd={() => handleAdd(item)} />
          </div>
        ))}
      </div>

      <div className="flex gap-3 mt-8">
        <Button variant="light" size="lg" onClick={() => navigate('/menu')}>
          {t('back', lang)}
        </Button>
        <Button variant="dark" size="lg" className="flex-1" onClick={() => navigate('/cart')}>
          {t('viewCart', lang)} <ArrowRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}