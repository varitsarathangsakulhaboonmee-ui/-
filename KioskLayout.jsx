import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import CartBar from '@/components/CartBar';
import IdleTimer from '@/components/IdleTimer';
import ResetConfirmModal from '@/components/ResetConfirmModal';
import { useCart } from '@/store/cartStore';

export default function KioskLayout() {
  const [resetOpen, setResetOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { cartCount, resetAll } = useCart();

  const showCartBar = cartCount > 0 && location.pathname !== '/cart';

  const handleResetConfirm = () => {
    resetAll();
    setResetOpen(false);
    navigate('/welcome');
  };

  return (
    <div className="min-h-screen bg-kamtan-cream">
      <Sidebar onReset={() => setResetOpen(true)} />
      <main className="lg:pl-60 pt-16 lg:pt-0 min-h-screen">
        <Outlet />
      </main>
      {showCartBar && <CartBar />}
      <IdleTimer />
      <ResetConfirmModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleResetConfirm}
      />
    </div>
  );
}