import React from 'react';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

export default function ResetConfirmModal({ open, onClose, onConfirm }) {
  const { lang } = useLanguage();
  return (
    <Modal open={open} onClose={onClose} className="text-center">
      <div className="w-16 h-16 rounded-full bg-kamtan-cream flex items-center justify-center mx-auto mb-4 text-3xl">
        ⚠️
      </div>
      <h2 className="text-2xl font-bold text-kamtan-dark">{t('resetTitle', lang)}</h2>
      <p className="text-kamtan-gray mt-2">{t('resetDesc', lang)}</p>
      <div className="flex gap-3 mt-6">
        <Button variant="light" size="lg" className="flex-1" onClick={onClose}>
          {t('cancel', lang)}
        </Button>
        <Button variant="primary" size="lg" className="flex-1" onClick={onConfirm}>
          {t('confirm', lang)}
        </Button>
      </div>
    </Modal>
  );
}