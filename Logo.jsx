import React from 'react';
import { Image } from '@/components/ui/image';
import { cn } from '@/lib/utils';

const LOGO_URL =
  'https://media.base44.com/images/public/6aa6ccecd87a40f04856ee95/d9b921f4f_1789491971002.jpg';

export default function Logo({ size = 'h-12 w-12', className }) {
  return (
    <div
      className={cn('relative rounded-full overflow-hidden shrink-0', size, className)}
    >
      <Image src={LOGO_URL} alt="Kam Tan" className="w-full h-full object-cover" />
    </div>
  );
}