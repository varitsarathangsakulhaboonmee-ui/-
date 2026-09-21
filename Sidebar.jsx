import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Flame, CupSoda, ShoppingCart, RotateCcw } from 'lucide-react';
import Logo from '@/components/Logo';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import { cn } from '@/lib/utils';

export default function Sidebar({ onReset }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { lang } = useLanguage();

  const navItems = [
    { id: 'all', label: t('navAll', lang), icon: Home, path: '/menu' },
    { id: 'larb', label: t('navLarb', lang), icon: Flame, path: '/menu?cat=larb' },
    { id: 'drinks', label: t('navDrinks', lang), icon: CupSoda, path: '/drinks' },
    { id: 'cart', label: t('navCart', lang), icon: ShoppingCart, path: '/cart' },
  ];

  const isActive = (item) => {
    if (item.id === 'cart') return location.pathname === '/cart';
    if (item.id === 'drinks') return location.pathname === '/drinks';
    if (item.id === 'all') return location.pathname === '/menu' && !location.search;
    if (item.id === 'larb') return location.pathname === '/menu' && location.search.includes('cat=larb');
    return false;
  };

  return (
    <>
      {/* Desktop / tablet sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-kamtan-dark text-white p-5 fixed inset-y-0 left-0 z-30">
        <div className="py-6 px-2">
          <Logo size="h-14 w-14" />
        </div>
        <nav className="flex flex-col gap-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={cn(
                  'w-full px-4 h-14 rounded-2xl text-base font-semibold flex items-center gap-3 transition-all active:scale-95',
                  active
                    ? 'bg-kamtan-red text-white shadow'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.id === 'cart' && cartCount > 0 && (
                  <span className="ml-auto bg-kamtan-gold text-kamtan-dark text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="mt-auto">
          <button
            onClick={onReset}
            className="w-full px-4 h-14 rounded-2xl text-base font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all active:scale-95 flex items-center gap-3"
          >
            <RotateCcw className="w-5 h-5" /> {t('reset', lang)}
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-30 bg-kamtan-dark text-white px-4 py-2.5 flex items-center justify-between shadow-md">
        <Logo size="h-9 w-9" />
        <div className="flex items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item);
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={cn(
                  'relative shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl transition-all active:scale-95',
                  active ? 'bg-kamtan-red text-white' : 'text-white/70'
                )}
                aria-label={item.label}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
                {item.id === 'cart' && cartCount > 0 && (
                  <span className="bg-kamtan-gold text-kamtan-dark text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            );
          })}
          <button
            onClick={onReset}
            aria-label={t('reset', lang)}
            className="shrink-0 w-10 h-10 rounded-xl text-white/70 hover:bg-white/10 flex items-center justify-center active:scale-95"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </header>
    </>
  );
}