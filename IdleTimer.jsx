import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/store/cartStore';
import { useLanguage } from '@/store/languageStore';
import { t } from '@/data/uiStrings';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

const IDLE_MS = 2 * 60 * 1000; // 2 minutes
const COUNTDOWN_SEC = 15;

export default function IdleTimer() {
  const { resetAll } = useCart();
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [countdown, setCountdown] = useState(COUNTDOWN_SEC);
  const idleRef = useRef(null);
  const countRef = useRef(null);

  const restart = useCallback(() => {
    setShow(false);
    setCountdown(COUNTDOWN_SEC);
    clearInterval(countRef.current);
    clearTimeout(idleRef.current);
    idleRef.current = setTimeout(() => setShow(true), IDLE_MS);
  }, []);

  useEffect(() => {
    const events = ['mousedown', 'touchstart', 'keydown', 'scroll'];
    const handler = () => restart();
    events.forEach((e) => window.addEventListener(e, handler, { passive: true }));
    idleRef.current = setTimeout(() => setShow(true), IDLE_MS);
    return () => {
      events.forEach((e) => window.removeEventListener(e, handler));
      clearTimeout(idleRef.current);
      clearInterval(countRef.current);
    };
  }, [restart]);

  useEffect(() => {
    if (!show) return;
    setCountdown(COUNTDOWN_SEC);
    countRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countRef.current);
          resetAll();
          navigate('/welcome');
          return 0;
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(countRef.current);
  }, [show, resetAll, navigate]);

  return (
    <Modal open={show} dismissable={false} className="text-center">
      <h2 className="text-2xl font-bold text-kamtan-dark">{t('idleTitle', lang)}</h2>
      <p className="text-kamtan-gray mt-2">
        {t('idleDesc', lang).replace('{s}', countdown)}
      </p>
      <div className="mt-6">
        <Button variant="primary" size="xl" className="w-full" onClick={restart}>
          {t('continueOrder', lang)}
        </Button>
      </div>
    </Modal>
  );
}