import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { generateOrderNumber } from '@/utils/orderNumber';

const CartContext = createContext(null);

export const useCart = () => useContext(CartContext);

const makeLineId = (foodId, toppings, spiceId, sizeId) => {
  const t = [...toppings].map((x) => x.id).sort().join(',');
  return `${foodId}|${t}|${spiceId}|${sizeId || ''}`;
};

export function CartProvider({ children }) {
  const [diningOption, setDiningOption] = useState(null);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [orderNumber, setOrderNumber] = useState(null);

  const addToCart = useCallback((food, customization = {}) => {
    const toppings = customization.toppings || [];
    const spice = customization.spiceLevel || { id: 'medium', nameTH: 'เผ็ดกลาง', price: 0 };
    const size = customization.size || null;
    const qty = customization.quantity || 1;
    const basePrice = size ? size.price : food.price;
    const unitPrice =
      basePrice + toppings.reduce((s, t) => s + t.price, 0) + (spice.price || 0);
    const lineId = makeLineId(food.id, toppings, spice.id, size?.id);

    setCart((prev) => {
      const idx = prev.findIndex((l) => l.lineId === lineId);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [
        ...prev,
        {
          lineId,
          foodId: food.id,
          nameTH: food.nameTH,
          nameEN: food.nameEN,
          image: food.image,
          basePrice,
          size,
          toppings,
          spiceLevel: spice,
          quantity: qty,
          unitPrice,
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((lineId, delta) => {
    setCart((prev) =>
      prev.map((l) =>
        l.lineId === lineId ? { ...l, quantity: Math.max(1, l.quantity + delta) } : l
      )
    );
  }, []);

  const removeLine = useCallback((lineId) => {
    setCart((prev) => prev.filter((l) => l.lineId !== lineId));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const resetAll = useCallback(() => {
    setDiningOption(null);
    setCart([]);
    setPaymentMethod(null);
    setOrderNumber(null);
  }, []);

  const completeOrder = useCallback(() => {
    const num = generateOrderNumber();
    setOrderNumber(num);
    return num;
  }, []);

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.quantity, 0), [cart]);
  const subtotal = useMemo(
    () => cart.reduce((s, l) => s + l.unitPrice * l.quantity, 0),
    [cart]
  );

  const value = {
    diningOption,
    setDiningOption,
    cart,
    addToCart,
    updateQuantity,
    removeLine,
    clearCart,
    paymentMethod,
    setPaymentMethod,
    orderNumber,
    completeOrder,
    cartCount,
    subtotal,
    resetAll,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}