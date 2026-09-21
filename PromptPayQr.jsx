import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { buildPromptPayPayload, PROMPTPAY_PHONE } from '@/utils/promptPay';

// THAI QR PAYMENT mark — square with a folded corner.
function ThaiQrMark({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <path d="M6 6h28l8 8v28H6z" fill="white" />
      <path d="M34 6v8h8" fill="#13375c" />
      <path d="M34 6l8 8h-8z" fill="white" stroke="#13375c" strokeWidth="1.5" />
      <path d="M14 20h14M14 26h14M14 32h14" stroke="#13375c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function PromptPayQr() {
  const payload = buildPromptPayPayload(PROMPTPAY_PHONE);

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden rounded-2xl bg-white shadow-lg">
      {/* Header */}
      <div className="px-5 py-4 flex items-center gap-3" style={{ backgroundColor: '#1A4670' }}>
        <ThaiQrMark size={36} />
        <div className="leading-none text-white">
          <p className="text-lg font-extrabold tracking-tight">THAI QR</p>
          <p className="text-lg font-extrabold tracking-tight">PAYMENT</p>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-6 flex flex-col items-center">
        {/* PromptPay logo box */}
        <div className="mb-5 px-6 py-2 border border-black/15 rounded-md text-center">
          <p className="text-[10px] text-black/70 font-sans">พร้อมเพย์</p>
          <p className="text-xl font-serif font-semibold text-black tracking-wide">PromptPay</p>
        </div>

        {/* QR code */}
        <div className="relative w-56 h-56 bg-white p-3 border border-black/10 rounded-lg">
          <QRCodeSVG
            value={payload}
            size={208}
            level="M"
            bgColor="#ffffff"
            fgColor="#000000"
            className="w-full h-full"
          />
        </div>

        {/* Account details */}
        <div className="mt-5 w-full text-center">
          <p className="text-base font-semibold mb-2" style={{ color: '#008F90' }}>
            สแกน QR เพื่อโอนเข้าบัญชี
          </p>
          <p className="text-sm text-black/80 mb-1">ชื่อ: นาย ณัฐปคัลภ์ สุเหง้า</p>
          <p className="text-sm text-black/80 mb-1">บัญชี: xxx-x-x0431-x</p>
          <p className="text-xs" style={{ color: '#A9A9A9' }}>เลขที่อ้างอิง: 004999211385405</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 px-6 py-3 flex items-center gap-2" style={{ borderColor: '#00A551' }}>
        <div className="flex items-center">
          <span className="text-2xl font-extrabold text-black leading-none">K</span>
          <span className="text-2xl font-extrabold leading-none" style={{ color: '#00A551' }}>+</span>
        </div>
        <p className="text-xs text-black/60 font-medium">
          Accepts all banks | รับเงินได้จากทุกธนาคาร
        </p>
      </div>
    </div>
  );
}