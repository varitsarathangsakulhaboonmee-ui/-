import React, { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import { menuItems, categories, itemName, catName, sizes } from '@/data/menu';
import ProductCard from '@/components/ProductCard';
import CategoryChip from '@/components/CategoryChip';
import HeroPromoBanner from '@/components/HeroPromoBanner';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import { toast } from '@/components/ui/use-toast';

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCat = searchParams.get('cat') || 'all';
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { lang } = useLanguage();

  const filtered = useMemo(() => {
    let items =
      activeCat === 'all' ? menuItems : menuItems.filter((m) => m.category === activeCat);
    // Separate each size of hasSizes items into its own card
    const expanded = [];
    items.forEach((m) => {
      if (m.hasSizes) {
        sizes.forEach((s) => {
          expanded.push({
            ...m,
            id: `${m.id}-${s.id}`,
            _baseId: m.id,
            _size: s,
            price: s.price,
            hasSizes: false,
            nameTH: `${m.nameTH} ${s.id}`,
            nameEN: `${m.nameEN} ${s.id}`,
            nameJA: `${m.nameJA} ${s.id}`,
          });
        });
      } else {
        expanded.push(m);
      }
    });
    items = expanded;
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter((m) =>
        m.nameTH.includes(q) ||
        m.nameEN.toLowerCase().includes(q) ||
        (m.nameJA || '').includes(q)
      );
    }
    return items;
  }, [activeCat, query]);

  const handleAdd = (item) => {
    if (item.customizable) {
      const baseId = item._baseId || item.id;
      const sizeParam = item._size ? `?size=${item._size.id}` : '';
      navigate(`/customize/${baseId}${sizeParam}`);
    } else {
      addToCart(item, {
        toppings: [],
        spiceLevel: { id: 'medium', nameTH: 'เผ็ดกลาง', price: 0 },
        quantity: 1,
      });
      toast({ title: t('added', lang).replace('{name}', itemName(item, lang)) });
    }
  };

  return (
    <div className="px-5 lg:px-10 py-6 pb-28">
      <header className="mb-6">
        <h1 className="text-3xl lg:text-4xl font-serifthai font-bold text-kamtan-dark">
          {t('menuTitle', lang)}
        </h1>
        <p className="text-kamtan-gray text-lg">{t('menuSub', lang)}</p>
      </header>

      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-kamtan-gray" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t('searchPlaceholder', lang)}
          className="w-full h-14 pl-12 pr-4 rounded-2xl bg-white border border-black/10 text-lg text-kamtan-dark placeholder:text-kamtan-gray focus:outline-none focus:border-kamtan-red"
        />
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 mb-6 -mx-1 px-1">
        {categories.map((c) => (
          <CategoryChip
            key={c.id}
            active={activeCat === c.id}
            onClick={() => setSearchParams(c.id === 'all' ? {} : { cat: c.id })}
          >
            {catName(c, lang)}
          </CategoryChip>
        ))}
      </div>

      {activeCat !== 'drinks' && (
        <div className="mb-8">
          <HeroPromoBanner onClick={() => navigate('/customize/promotion-larb')} />
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="text-center py-20 text-kamtan-gray">
          <p className="text-xl">{t('noResult', lang)}</p>
        </div>
      ) : (
        <div className="flex flex-wrap -mx-2 lg:-mx-3">
          {filtered.map((item) => (
            <div key={item.id} className="w-1/2 lg:w-1/3 xl:w-1/4 px-2 lg:px-3 mb-4 lg:mb-6">
              <ProductCard item={item} onAdd={() => handleAdd(item)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}