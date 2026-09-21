import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import { Hand } from 'lucide-react';

const BG_URL =
  'https://media.base44.com/images/public/6aa6ccecd87a40f04856ee95/c90817b23__20260916_110737_0000.png';

export default function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-kamtan-darkred select-none">
      {/* Full design background, contained so every element is visible */}
      <Image src={BG_URL} alt="Kam Tan Welcome" quality={100} className="absolute inset-0 w-full h-full object-contain" />

      {/* Touch to Start button */}
      <button
        onClick={() => navigate('/dining')}
        className="absolute left-1/2 -translate-x-1/2 top-[80%] flex items-center justify-center gap-3 h-16 px-12 rounded-full bg-kamtan-gold text-kamtan-dark shadow-[0_6px_20px_rgba(0,0,0,0.45)] active:scale-95 transition z-10"
      >
        <Hand className="w-7 h-7 shrink-0" strokeWidth={2.2} />
        <div className="text-left leading-tight whitespace-nowrap">
          <span className="block text-xl font-extrabold tracking-wide">TOUCH TO START</span>
          <span className="block text-sm font-semibold text-kamtan-dark/80">กดเพื่อเริ่มต้น</span>
        </div>
      </button>
    </div>
  );
}