import React from 'react';

const HERO_IMG =
  'https://media.base44.com/images/public/6aaa3a8181822c6f79bea553/8cf9c3f7b_Promotimenu_20260917_185343_0000.png';

export default function HeroPromoBanner({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Promotion 2 Dine 1 Free"
      className="relative block w-full overflow-hidden rounded-3xl shadow-lg active:scale-[0.99] transition"
      style={{ paddingTop: '56.25%' }}
    >
      <img
        src={HERO_IMG}
        alt="Larb Kam Tan promotion — 2 Dine 1 Free ¥1100"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
    </button>
  );
}